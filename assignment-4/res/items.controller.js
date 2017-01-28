(function() {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['MenuDataService', '$stateParams'];

    function ItemsController(MenuDataService, $stateParams) {
        var itemsController = this;

        var categoryShortName = $stateParams.shortName;

        itemsController.categoryName = '';
        itemsController.items = '';

        var response = MenuDataService.getItemsForCategory(categoryShortName);
        response.then(function(categoryObj) {
            if (categoryObj.status === 200) {
                itemsController.categoryName = categoryObj.data.category.name;
                itemsController.items = categoryObj.data.menu_items;
                // console.dir(categoryObj.data.category.name);
            } else {
                console.error('Some error occured');
            }
        }, function() {
            console.error('Some error occured');
        });
    }

}());
