(function() {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http'];

    function MenuDataService($http) {
        var menuDataService = this;

        menuDataService.getAllCategories = function() {
            var response = $http({
                method: 'GET',
                url: 'https://davids-restaurant.herokuapp.com/categories.json'
            });

            return response;
        }

        menuDataService.getItemsForCategory = function(categoryShortName) {
            var categoryUrl = 'https://davids-restaurant.herokuapp.com/menu_items.json?category=' + categoryShortName;
            
            var response = $http({
                method: 'GET',
                url: categoryUrl
            });

            return response;
        }

    }

}());
