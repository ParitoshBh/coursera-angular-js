(function() {
    'use strict';

    angular.module('MenuApp')
        .component('items', {
            templateUrl: 'partials/items.item.html',
            bindings: {
                items: '<'
            }
        });

}());
