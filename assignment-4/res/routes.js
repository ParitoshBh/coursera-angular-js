(function() {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'partials/home.html'
            })
            .state('categories', {
                url: '/categories',
                templateUrl: 'partials/categories.html',
                controller: 'CategoriesController as categoriesController'
            })
            .state('item', {
                url: '/item/{shortName}',
                templateUrl: 'partials/items.html',
                controller: 'ItemsController as itemsController',
                resolve: {
                    shortName: '$stateParams'
                }
            });
    }

}());
