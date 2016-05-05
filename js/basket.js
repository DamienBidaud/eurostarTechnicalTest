/**
 * Created by bidau on 05/05/2016.
 */
(function(){

    var basket = angular.module("basketApp", []);

    var productController = function(){
        var ctrl = this;

        ctrl.addProduct = function(){
            ctrl.onUpdate();
        }


    };

    basket.component("product", {
        templateUrl:"template/product.html",
        controller:productController,
        bindings:{
            product:"<",
            onUpdate:"&"
        }
    });


    basket.controller("productsCtrl",  ["$log", "$scope", "$http", function($log, $scope, $http){
        $scope.products = [];
        $scope.baskets = [];
        $scope.add = function(product){
            $log.info(product);
            $scope.baskets.push(product);
            $log.info($scope.baskets);
        };

        $http.get("resource/products.json").then(function(data){
            $scope.products = data.data;
        }, function(response){
           $log.error(response.data);
           $log.error(response.status);
        });
    }]);

    basket.controller("basketCtrl", ["$scope", "$log", function($scope, $log){
        //$log.info($scope.baskets);
    }]);


})();