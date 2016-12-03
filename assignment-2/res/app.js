(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;

        // Error message for an empty to buy list
        toBuy.emptyMessage = "Everything is bought!";
        // Setting up the list with default list items
        toBuy.toBuyList = ShoppingListCheckOffService.getToBuyList();

        toBuy.markItemAsBought = function(itemPosition) {
            // Mark item as bought and remove/transfer from appropriate list
            ShoppingListCheckOffService.markItemAsBought(itemPosition);
        };

        toBuy.buyListLength = function() {
            return ShoppingListCheckOffService.getToBuyListLength();
        };
    }


    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBought = this;

        // Error message for empty bought list
        alreadyBought.emptyMessage = "Nothing bought yet.";
        // Setting up the list as an empty one
        alreadyBought.boughtList = ShoppingListCheckOffService.getBoughtList();

        alreadyBought.boughtListLength = function() {
            return ShoppingListCheckOffService.getBoughtListLenght();
        };
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var boughtList = [];
        // 5 default items for to buy list
        var toBuyList = [{
            name: "Sour Cream",
            quantity: 2
        }, {
            name: "Chips",
            quantity: 5
        }, {
            name: "Milk",
            quantity: 1
        }, {
            name: "Rice",
            quantity: 2
        }, {
            name: "Popcorn",
            quantity: 4
        }];

        // Returns object of to buy list
        service.getToBuyList = function() {
            return toBuyList;
        };

        // Returns object of bought list
        service.getBoughtList = function() {
            return boughtList;
        };

        service.getToBuyListLength = function() {
            return toBuyList.length;
        };

        service.getBoughtListLenght = function() {
            return boughtList.length;
        };

        service.markItemAsBought = function(itemPosition) {
            // Push item to bought list
            boughtList.push(toBuyList[itemPosition]);
            // Remove item from to buy list
            toBuyList.splice(itemPosition, 1);
        };

    }
})();
