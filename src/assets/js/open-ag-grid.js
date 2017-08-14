const PRODUCTS_ACTIONS_TEMPLATE = `
    <div class="products-actions">
        <a ng-click=""
            class="fa fa-pencil action-icon"
            aria-hidden="true">
        </a>
        <span class="sr-only">Edit</span>
        <a ng-click=""
            class="fa fa-trash action-icon"
            aria-hidden="true">
        </a>
        <span class="sr-only">Delete</span>
    </div>`;
agGrid.initialiseAgGridWithAngular1(angular);
// create your module with ag-Grid as a dependency
var module = angular.module("example", ["ngSanitize", "mgcrea.ngStrap", "agGrid"]);
module.controller("exampleCtrl", function ($scope) {
    var ctrl = this;
    ctrl.columnDefs = [
        {
            headerName: 'Make'
            , field: 'make'
            , headerCheckboxSelection: true
            , checkboxSelection: true
    }
        , {
            headerName: "Model"
            , field: "model"
            , headerComponentParams: {
                menuIcon: 'fa-bus'
            }
            , pinned: 'left'
            , hide: true
    }
        , {
            headerName: "Comments"
            , field: "comments"
            , hide: true
    }
        , {
            headerName: "Engine"
            , field: "engine"
            , editable: true
            , suppressSorting: true
            , hide: true
    }
        , {
            headerName: "Drive Train"
            , field: "driveTrain"
            , suppressSorting: true
    }
        , {
            headerName: "MPG"
            , field: "mpg"
            , hide: true
    }
        , {
            headerName: "Horse Power"
            , field: "hp"
            , hide: true
    }
        , {
            headerName: "Liter"
            , field: "liter"
    }
        , {
            headerName: "Type"
            , field: "type"
    }
        , {
            headerName: "Price"
            , field: "price"
    }
        , {
            headerName: "Actions"
            , field: ''
            , template: PRODUCTS_ACTIONS_TEMPLATE
            , minWidth: 80
            , maxWidth: 80
            , pinned: 'right'
    }
  ];
    ctrl.rowData = [
        {
            make: "Toyota"
            , model: "Rav4"
            , engine: "4-cyl"
            , driveTrain: "All-wheel"
            , mpg: "28"
            , hp: "170"
            , liter: "2.5"
            , type: "suv"
            , price: 28000
            , comments: 'We have purged your fear. You are ready to Iead these men. You are ready to become a member of the League of Shadows. But first, you must demonstrate your commitment to justice.'
    }
        , {
            make: "Toyota"
            , model: "Sienna"
            , engine: "6-cyl"
            , driveTrain: "front-wheel"
            , mpg: "16"
            , hp: "170"
            , liter: "2.5"
            , type: "mini-van"
            , price: 35000
            , comments: 'Bruce Wayne! Design, live and breathe. What brings you out of the prior sleep, Mr. Wayne?'
    }
        , {
            make: "Toyota"
            , model: "Celica"
            , engine: "4-cyl"
            , driveTrain: "All-wheel"
            , mpg: "21"
            , hp: "170"
            , liter: "2.5"
            , type: "suv"
            , price: 35000
            , comments: 'I am here to ensure the League of Shadow fulfills its duty to restore balance to civilization. You yourself fought the decadence of Gotham for years with all your strength, all your resources, all your moral authority. And the only victory you achieved was a lie. Now, you understand? Gotham is beyond saving and must be allowed to die.'
    }
        , {
            make: "Honda"
            , model: "Pilot"
            , engine: "4-cyl"
            , driveTrain: "All-wheel"
            , mpg: "21"
            , hp: "170"
            , liter: "2.5"
            , type: "suv"
            , price: 42000
            , comments: "Bruce... it's okay. Don't be afraid."
    }
        , {
            make: "Subaru"
            , model: "Cross Trek"
            , engine: "4-cyl"
            , driveTrain: "All-wheel"
            , mpg: "21"
            , hp: "170"
            , liter: "2.5"
            , type: "suv"
            , price: 35000
            , comments: "Just you, sir? Don't worry, Master Wayne. It takes a little time to get back in the swing of things."
    }
        , {
            make: "Chrysler"
            , model: "Plymouth"
            , engine: "4-cyl"
            , driveTrain: "All-wheel"
            , mpg: "21"
            , hp: "170"
            , liter: "2.5"
            , type: "suv"
            , price: 32000
            , comments: "Master Wayne, you've been gone a long time. You look very fashionable. Apart from the mud."
    }
        , {
            make: "Porsche"
            , model: "Boxter"
            , engine: "4-cyl"
            , driveTrain: "All-wheel"
            , mpg: "21"
            , hp: "170"
            , liter: "2.5"
            , type: "suv"
            , price: 72000
            , comments: "Why do we fall, sir? So that we can learn to pick ourselves up."
    }
        , {
            make: "Porsche"
            , model: "Boxter"
            , engine: "4-cyl"
            , driveTrain: "All-wheel"
            , mpg: "21"
            , hp: "170"
            , liter: "2.5"
            , type: "suv"
            , price: 72000
            , comments: "Tomorrow, you will be released. If you are bored of brawling with thieves and want to achieve something there is a rare blue flower that grows on the eastern slopes. Pick one of these flowers. If you can carry it to the top of the mountain, you may find what you were looking for in the first place."
    }
        , {
            make: "Porsche"
            , model: "Boxter"
            , engine: "4-cyl"
            , driveTrain: "All-wheel"
            , mpg: "21"
            , hp: "170"
            , liter: "2.5"
            , type: "suv"
            , price: 72000
            , comments: '... nothing!'
    }
        , {
            make: "Porsche"
            , model: "Boxter"
            , engine: "4-cyl"
            , driveTrain: "All-wheel"
            , mpg: "21"
            , hp: "170"
            , liter: "2.5"
            , type: "suv"
            , price: 72000
            , comments: 'Perhaps. Perhaps not!'
    }
        , {
            make: "Porsche"
            , model: "Boxter"
            , engine: "4-cyl"
            , driveTrain: "All-wheel"
            , mpg: "21"
            , hp: "170"
            , liter: "2.5"
            , type: "suv"
            , price: 72000
            , comments: 'Gone again!'
    }
        , {
            make: "Porsche"
            , model: "Boxter"
            , engine: "4-cyl"
            , driveTrain: "All-wheel"
            , mpg: "21"
            , hp: "170"
            , liter: "2.5"
            , type: "suv"
            , price: 72000
            , comments: 'Gone again!'
    }
        , {
            make: "Porsche"
            , model: "Boxter"
            , engine: "4-cyl"
            , driveTrain: "All-wheel"
            , mpg: "21"
            , hp: "170"
            , liter: "2.5"
            , type: "suv"
            , price: 72000
            , comments: 'Gone again!'
    }
  ];
    $scope.gridOptions = {
        columnDefs: ctrl.columnDefs
        , rowData: ctrl.rowData
        , rowHeight: 35
        , headerHeight: 30
        , suppressRowClickSelection: true
        , rowSelection: 'multiple'
        , enableSorting: true
        , enableFilter: true
        , enableColResize: true
        , suppressMenuHide: true
        , groupDefaultExpanded: 1
        , icons: {
            columnMovePin: '<i class="fa fa-thumb-tack"/>'
            , columnMoveAdd: '<i class="fa fa-plus"/>'
            , columnMoveHide: '<i class="fa fa-minus"/>'
            , columnMoveMove: '<i class="fa fa-arrows"/>'
            , columnMoveLeft: '<i class="fa fa-long-arrow-left"/>'
            , columnMoveRight: '<i class="fa fa-long-arrow-right"/>'
            , menuIcon: '<i class="fa fa-bars"/>'
            , checkboxChecked: '<span class="xl-base xl-base-check"></span>'
            , checkboxUnchecked: '<span class="xl-base xl-base-uncheck"></span>'
            , checkboxIndeterminate: '<span class="xl-base xl-base-indeterminent"></span>'
            , columnGroupOpened: '<i class="fa fa-chevron-right"/>'
            , columnGroupClosed: '<i class="fa fa-chevron-down"/>'
        }
        , defaultColDef: {
            minWidth: 36
            , maxWidth: 400
            , headerComponent: MyHeaderComponent
        }
    };
    /* icons needed:
    columnMovePin: 'd-pin-web',
    columnMoveAdd: 'd-plus-web',
    columnMoveHide: 'd-minus-web',
    columnMoveMove: 'd-direction-web',
    columnMoveLeft: 'd-arrow-left-web',
    columnMoveRight: 'd-arrow-right-web',
    //*/
    function MyHeaderComponent() {
        // console.log('new template');
    }
    var popoverTmpl = '<ul>' + '<li class="customHeaderMenuButton"><i class="fa fa-filter"></i> Filters</li>' + '<li class="customSortDownLabel inactive"><i class="fa fa-sort-alpha-asc"></i> Sort Ascending</li>' + '<li class="customSortUpLabel inactive"><i class="fa fa-sort-alpha-desc"></i> Sort Descending</li>' + '<li class="customSortRemoveLabel inactive"><i class="fa fa-times"></i> Reset Sort</li>' + '</ul>';
    MyHeaderComponent.prototype.init = function (agParams) {
        this.agParams = agParams;
        this.eGui = document.createElement('div');
        this.eGui.setAttribute('class', 'xl-col-header-container');
        // this.eGui.setAttribute('bs-popover', '');
        // this.eGui.innerHTML = ''+
        //     '<div class="customHeaderMenuButton"><i class="fa ' + this.agParams.menuIcon + '"></i></div>' +
        //     '<div class="customHeaderLabel">' + this.agParams.displayName + '</div>' +
        //     '<div class="customSortDownLabel inactive"><i class="fa fa-sort-alpha-asc"></i></div>' +
        //     '<div class="customSortUpLabel inactive"><i class="fa fa-sort-alpha-desc"></i></div>' +
        //     '<div class="customSortRemoveLabel inactive"><i class="fa fa-times"></i></div>';
        // ' + ctrl.popoverTmpl + '
        this.eGui.innerHTML = '' + '<button type="button" class="btn btn-link" data-placement="bottom" bs-popover="tooltip" data-title="frogger">' + this.agParams.displayName + '</button>'
            // ;
            //*
            + '<span class="customHeaderMenuButton"><i class="fa fa-bars"></i></span>' + '<div class="customSortDownLabel inactive"><i class="fa fa-sort-alpha-asc"></i></div>' + '<div class="customSortUpLabel inactive"><i class="fa fa-sort-alpha-desc"></i></div>' + '<div class="customSortRemoveLabel inactive"><i class="fa fa-times"></i></div>';
        //*/
        console.log('eGui', agParams);
        this.eMenuButton = this.eGui.querySelector(".customHeaderMenuButton");
        this.eSortDownButton = this.eGui.querySelector(".customSortDownLabel");
        this.eSortUpButton = this.eGui.querySelector(".customSortUpLabel");
        this.eSortRemoveButton = this.eGui.querySelector(".customSortRemoveLabel");
        if (this.agParams.enableMenu) {
            this.onMenuClickListener = this.onMenuClick.bind(this);
            this.eMenuButton.addEventListener('click', this.onMenuClickListener);
        }
        else {
            this.eGui.removeChild(this.eMenuButton);
        }
        if (this.agParams.enableSorting) {
            console.log('--> btn up', this);
            this.onSortAscRequestedListener = this.onSortRequested.bind(this, 'asc');
            this.eSortDownButton.addEventListener('click', this.onSortAscRequestedListener);
            this.onSortDescRequestedListener = this.onSortRequested.bind(this, 'desc');
            this.eSortUpButton.addEventListener('click', this.onSortDescRequestedListener);
            this.onRemoveSortListener = this.onSortRequested.bind(this, '');
            this.eSortRemoveButton.addEventListener('click', this.onRemoveSortListener);
            this.onSortChangedListener = this.onSortChanged.bind(this);
            this.agParams.column.addEventListener('sortChanged', this.onSortChangedListener);
            this.onSortChanged();
        }
        else {
            this.eGui.removeChild(this.eSortDownButton);
            this.eGui.removeChild(this.eSortUpButton);
            this.eGui.removeChild(this.eSortRemoveButton);
        }
    };
    MyHeaderComponent.prototype.onSortChanged = function () {
        function deactivate(toDeactivateItems) {
            toDeactivateItems.forEach(function (toDeactivate) {
                toDeactivate.className = toDeactivate.className.split(' ')[0]
            });
        }

        function activate(toActivate) {
            toActivate.className = toActivate.className + " active";
        }
        if (this.agParams.column.isSortAscending()) {
            deactivate([this.eSortUpButton, this.eSortRemoveButton]);
            activate(this.eSortDownButton)
        }
        else if (this.agParams.column.isSortDescending()) {
            deactivate([this.eSortDownButton, this.eSortRemoveButton]);
            activate(this.eSortUpButton)
        }
        else {
            deactivate([this.eSortUpButton, this.eSortDownButton]);
            activate(this.eSortRemoveButton)
        }
    };
    MyHeaderComponent.prototype.getGui = function () {
        return this.eGui;
    };
    MyHeaderComponent.prototype.onMenuClick = function () {
        this.agParams.showColumnMenu(this.eMenuButton);
    };
    MyHeaderComponent.prototype.onSortRequested = function (order, event) {
        this.agParams.setSort(order, event.shiftKey);
    };
    MyHeaderComponent.prototype.destroy = function () {
        if (this.onMenuClickListener) {
            this.eMenuButton.removeEventListener('click', this.onMenuClickListener)
        }
        this.eSortDownButton.removeEventListener('click', this.onSortRequestedListener);
        this.eSortUpButton.removeEventListener('click', this.onSortRequestedListener);
        this.eSortRemoveButton.removeEventListener('click', this.onSortRequestedListener);
        this.agParams.column.removeEventListener('sortChanged', this.onSortChangedListener);
    };
    // ctrl.sortList = [];
    // ctrl.setSortMenu = setSortMenu;
    // setSortMenu(); 
    /*
    function setSortMenu () {
      let sortItem = [];
      for(var i = 0; i < ctrl.columnDefs.length; i++) {
        let sortObj = {
          colId: ctrl.columnDefs[i].field,
          sort: 'asc'
        };
        console.log('item', sortObj);
        sortItem.push(sortObj);
        ctrl.sortList.push(sortObj);
      }
      console.log('list', sortItem);
    }
    //*/
});