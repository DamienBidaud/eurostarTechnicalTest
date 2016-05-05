/**
 * Created by bidau on 05/05/2016.
 */
(function(){

    var basket = angular.module("basketApp", []);

    basket.factory("baskets", function(){
       return [];
    });

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


    basket.controller("productsCtrl",  ["$log", "$scope", "$http","baskets", function($log, $scope, $http, baskets){
        $scope.products = [];
        $scope.baskets = baskets;
        $scope.add = function(product){
            $scope.baskets.push(product);
        };

        $http.get("resource/products.json").then(function(data){
            $scope.products = data.data;
        }, function(response){
           $log.error(response.data);
           $log.error(response.status);
        });
    }]);

    basket.controller("basketCtrl", ["$scope", "$log","baskets", function($scope, $log, baskets){
        $scope.baskets = baskets;

        $scope.addItem = function(){

        };

        $scope.removeItem = function(){

        };
    }]);


})();