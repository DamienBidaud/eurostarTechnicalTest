/**
 * Created by bidau on 05/05/2016.
 */
(function(){

    var basket = angular.module("basketApp", []);


    basket.component("product", {
        
    });


    basket.controller("productsCtrl",  ["$log", "$scope", "$http", function($log, $scope, $http){
        $log.info("ok");
        $scope.products = [];
        $http.get("resource/products.json").then(function(data){
            $scope.products = data.data;
        }, function(response){
           $log.error(response.data);
           $log.error(response.status);
        });
    }]);

    basket.controller("basketCtrl", ["$scope", "$log", function($scope, $log){
        
    }])
})();