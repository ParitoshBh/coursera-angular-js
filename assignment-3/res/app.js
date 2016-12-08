(function() {

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', foundItems)
        .constant('BaseUrl', 'https://davids-restaurant.herokuapp.com/');

    function foundItems() {
        var ddo = {
            restrict: 'E', // Restricting the directive to being an element only to avoid conflict with attribute of same name
            templateUrl: 'menuitems.html', // Not using the template given in startup templace from coursera tutor
            scope: {
                foundItems: '<', // One binding only required
                onRemove: '&' // Referencing method to parent NarrowItDownController
            }
        };

        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var narrowItDown = this;

        // Initializing search term with an empty string
        narrowItDown.searchTerm = "";

        // Initializing found items array with empty set
        narrowItDown.found = [];

        // Function for filtering menu items based on search query
        narrowItDown.filterMenuItems = function() {
            // Passing the searched string to service for processing
            var promise = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm);

            // Handle result returned by then function in url request
            promise.then(function(foundItems) {
                narrowItDown.found = foundItems;
            });
        };

        // Removing the item not required in filtered results
        narrowItDown.removeItem = function(itemIndex) {
            narrowItDown.found.splice(itemIndex, 1);
        };
    }

    MenuSearchService.$inject = ['$http', 'BaseUrl'];

    function MenuSearchService($http, BaseUrl) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            // Get menu items from url
            var response = $http({
                    method: 'GET',
                    url: BaseUrl + 'menu_items.json' // Base url takes care of trailing '/'
                }).then(function(result) {
                    // Check if status is favourable
                    if (result.status === 200) {
                        // Go ahead and get the data
                        var foundItems = findSearchTerm(result.data, searchTerm);

                        return foundItems;
                    } else {
                        // Url isn't available
                        console.log('Url returned status ', result.status);
                    }
                })
                .catch(function(error) {
                    // Something went wrong. Show error in console
                    console.log('Unable to process request with error ', error);
                });

            return response;
        };

        function findSearchTerm(data, searchTerm) {
            var menuItems = data.menu_items;
            // Object for holding matched items
            var matchedItems = [];

            // Lower casing search term for better match results
            searchTerm = searchTerm.toLowerCase();

            // Loop through retrieving menu items to find matche(s)
            for (var i = 0; i < menuItems.length; i++) {
                // Check if description of item contains search term
                if (menuItems[i].description.toLowerCase().includes(searchTerm)) {
                    // Push menu item to matched items Object
                    matchedItems.push(menuItems[i]);
                }
            }

            return matchedItems;
        }

    }

})();
