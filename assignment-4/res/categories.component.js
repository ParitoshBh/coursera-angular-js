(function() {
    'use strict';

    angular.module('MenuApp')
        .component('categories', {
            templateUrl: 'partials/categories.items.html',
            bindings: {
                categories: '<'
            }
        });

}());
