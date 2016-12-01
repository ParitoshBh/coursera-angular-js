(function() {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.lunchMenu = "";
        $scope.message = "";

        $scope.getLunchItems = function() {
            var lunchItems = $scope.lunchMenu;

            // Check if atleast 1 lunch item exists
            if (lunchItems === "") {
                // No lunch item is entered. Show error message
                $scope.message = "Please enter data first";
            } else {
                // Atleast 1 lunch item exists
                // Split into individual lunch items
                lunchItems = lunchItems.split(',');
                // Get total lunch items (except for empty one's)
                var lunchItemsCount = getLunchItemsCount(lunchItems);
                // Criteria for number of items
                if (lunchItemsCount <= 3) {
                    $scope.message = "Enjoy!";
                } else {
                    $scope.message = "Too much!";
                }
            }

        };

        function getLunchItemsCount(lunchItems) {
            var lunchItemsCount = 0;
            for (var i = 0; i < lunchItems.length; i++) {
                // Increase lunch item count only if lunch item isn't empty
                if (lunchItems[i].trim() !== "") {
                    lunchItemsCount += 1;
                }
            }
            return lunchItemsCount;
        }
    }

})();
