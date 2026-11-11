// Build the existing Foundation templates with supported, portable tools.
import { readFile, writeFile, readdir, mkdir, rm, cp, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import path from 'node:path';
import { createServer } from 'node:http';
import Handlebars from 'handlebars';
import yaml from 'js-yaml';
import { marked } from 'marked';
import hljs from 'highlight.js';
import * as sass from 'sass';
import { build, transform } from 'esbuild';
import { transformAsync } from '@babel/core';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

const production = process.argv.includes('--production');
const config = yaml.load(await readFile('config.yml', 'utf8'));
const dist = path.resolve(config.PATHS.dist);
if (dist === process.cwd() || !dist.startsWith(process.cwd() + path.sep)) throw new Error('Build output must be a folder inside the project.');

async function files(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await files(file));
    else result.push(file);
  }
  return result;
}
async function copyIfPresent(from, to) {
  try { await stat(from); } catch (e) { if (e.code === 'ENOENT') return; throw e; }
  await cp(from, to, { recursive: true });
}
async function renderPages() {
  const h = Handlebars.create();
  for (const file of await files('src/partials')) {
    if (!/\.html$/.test(file)) continue;
    h.registerPartial(path.basename(file, '.html'), await readFile(file, 'utf8'));
  }
  for (const file of await files('src/pages')) {
    if (!/\.(html|hbs|handlebars)$/.test(file)) continue;
    let source = await readFile(file, 'utf8');
    const front = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    const data = front ? yaml.load(front[1]) ?? {} : {};
    if (front) source = source.slice(front[0].length);
    const relative = path.relative('src/pages', file).replace(/\.(hbs|handlebars)$/, '.html');
    const root = '../'.repeat(relative.split(path.sep).length - 1);
    const context = { ...data, root, page: path.basename(file, path.extname(file)), layout: data.layout ?? 'default' };
    h.registerPartial('body', source);
    const layout = await readFile(`src/layouts/${context.layout}.html`, 'utf8');
    const output = path.join(dist, relative);
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, h.compile(layout)(context));
  }
}
async function styles() {
  const result = await sass.compileAsync('src/assets/scss/app.scss', { loadPaths: config.PATHS.sass });
  const prefixed = await postcss([autoprefixer({ overrideBrowserslist: config.COMPATIBILITY })]).process(result.css, { from: undefined });
  const css = production ? (await transform(prefixed.css, { loader: 'css', minify: true })).code : prefixed.css;
  await mkdir(path.join(dist, 'assets/css'), { recursive: true });
  await writeFile(path.join(dist, 'assets/css/app.css'), css);
}
async function javascript() {
  for (const entry of config.PATHS.entries) {
    const bundled = await build({ entryPoints: [entry], bundle: true, write: false, format: 'iife', target: 'es2015', plugins: [{
      name: 'shared-jquery', setup(b) {
        b.onResolve({ filter: /^jquery$/ }, () => ({ path: 'jquery', namespace: 'global' }));
        b.onLoad({ filter: /.*/, namespace: 'global' }, () => ({ contents: 'module.exports = window.jQuery;', loader: 'js' }));
      }
    }] });
    const compiled = await transformAsync(bundled.outputFiles[0].text, { babelrc: false, configFile: false, presets: [['@babel/preset-env', { targets: config.COMPATIBILITY, modules: false }]] });
    const js = production ? (await transform(compiled.code, { target: 'es5', minify: true })).code : compiled.code;
    await mkdir(path.join(dist, 'assets/js'), { recursive: true });
    await writeFile(path.join(dist, 'assets/js', path.basename(entry)), js);
  }
}
async function assets() {
  for (const entry of await readdir('src/assets', { withFileTypes: true })) {
    if (['js', 'scss'].includes(entry.name)) continue;
    await copyIfPresent(path.join('src/assets', entry.name), path.join(dist, 'assets', entry.name));
  }
  await copyIfPresent('node_modules/font-awesome/fonts', path.join(dist, 'assets/fonts'));
  await mkdir(path.join(dist, 'assets/vendor'), { recursive: true });
  await cp('node_modules/jquery/dist/jquery.min.js', path.join(dist, 'assets/vendor/jquery.min.js'));
  await cp('node_modules/highcharts/highcharts.js', path.join(dist, 'assets/vendor/highcharts.js'));
  await mkdir(path.join(dist, 'assets/css'), { recursive: true });
  await cp('node_modules/highlight.js/styles/github.css', path.join(dist, 'assets/css/highlight.css'));
}
async function styleGuide() {
  const renderer = new marked.Renderer();
  renderer.code = ({ text, lang = 'html' }) => {
    const language = lang.replace(/_example$/, '');
    const code = hljs.getLanguage(language) ? hljs.highlight(text, { language }).value : Handlebars.escapeExpression(text);
    return `<div class="ss-code"><pre><code class="${Handlebars.escapeExpression(language)}">${code}</code></pre></div>` + (lang.endsWith('_example') ? `<div class="ss-code-live">${text}</div>` : '');
  };
  const sections = (await readFile('src/styleguide/index.md', 'utf8')).replace(/\r\n/g, '\n').split('\n\n\n\n');
  const pages = sections.map((source, i) => {
    const body = marked.parse(source, { renderer });
    const title = body.match(/<h1[^>]*>(.*?)<\/h1>/)?.[1] ?? `Page ${i + 1}`;
    return { title, anchor: title.toLowerCase().replace(/[^\w]+/g, '-'), body: new Handlebars.SafeString(body) };
  });
  const template = await readFile('src/styleguide/template.html', 'utf8');
  await writeFile(path.join(dist, 'styleguide.html'), Handlebars.compile(template)({ pages }));
}
async function compile() {
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  await Promise.all([renderPages(), styles(), javascript(), assets()]);
  await styleGuide();
  console.log(`Built ${config.PATHS.dist}`);
}
await compile();

if (process.argv.includes('--serve')) {
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp' };
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      const file = path.resolve(dist, '.' + decodeURIComponent(url.pathname), url.pathname.endsWith('/') ? 'index.html' : '');
      if (!file.startsWith(dist + path.sep)) { res.writeHead(403).end(); return; }
      const body = await readFile(file);
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream' });
      res.end(body);
    } catch { res.writeHead(404).end('Not found'); }
  });
  server.listen(config.PORT ?? 8000, '127.0.0.1', () => console.log(`Preview: http://localhost:${config.PORT ?? 8000}`));
  let timer, rebuilding = false, pending = false;
  const rebuild = async () => {
    if (rebuilding) { pending = true; return; }
    rebuilding = true;
    try { await compile(); } catch (err) { console.error(err); }
    finally { rebuilding = false; if (pending) { pending = false; void rebuild(); } }
  };
  watch('src', { recursive: true }, () => { clearTimeout(timer); timer = setTimeout(rebuild, 100); });
}
