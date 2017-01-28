(function() {
    'use strict';

    angular.module('MenuApp')
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['MenuDataService'];

    function CategoriesController(MenuDataService) {
        var categoriesController = this;

        categoriesController.categories = '';

        var response = MenuDataService.getAllCategories();
        response.then(function(categoryObj) {
            if (categoryObj.status === 200) {
                categoriesController.categories = categoryObj.data;
                // console.dir(categoryObj.data);
            } else {
                console.error('Some error occured');
            }
        }, function() {
            console.error('Some error occured');
        });
    }

}());
