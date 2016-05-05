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

    var asDiscount = function(baskets){
        for(var i = 0; i < baskets; i++){
            if(baskets[i].name==="Butter" && baskets[i].quantity%2==0){
                return true;
            }else if(baskets[i].name==="Milk" && baskets[i].quantity%3==0){
                return true;
            }
        }
        return false;
    };



    basket.component("product", {
        templateUrl:"template/product.html",
        controller:productController,
        bindings:{
            product:"<",
            onUpdate:"&"
        }
    });

    /**
     * product controller
     */
    basket.controller("productsCtrl",  ["$log", "$scope", "$http","baskets", function($log, $scope, $http, baskets){
        $scope.products = [];
        $scope.baskets = baskets;
        $scope.add = function(product){
            var index = $scope.baskets.indexOf(product);
            if(index>=0){
                $scope.baskets[index].quantity++;
                $scope.baskets[index].total= $scope.baskets[index].quantity*$scope.baskets[index].price;
            }else{
                $scope.baskets.push(product);
            }
        };

        $http.get("resource/products.json").then(function(data){
            $scope.products = data.data;
        }, function(response){
           $log.error(response.data);
           $log.error(response.status);
        });
    }]);

    /**
     * basket controller
     */
    basket.controller("basketCtrl", ["$scope", "$log","baskets", function($scope, $log, baskets){
        $scope.baskets = baskets;

        $scope.addItem = function(index){
            $scope.baskets[index].quantity++;
            $scope.baskets[index].total = $scope.baskets[index].quantity*$scope.baskets[index].price;
        };

        $scope.removeItem = function(index){
            if($scope.baskets[index].quantity==1){
                $scope.baskets.splice(index, 1);
            }else{
                $scope.baskets[index].quantity--;
                $scope.baskets[index].total = $scope.baskets[index].quantity*$scope.baskets[index].price;
            }
        };

        $scope.getTotal = function(){
            var total = 0;
            for (var i = 0; i < $scope.baskets.length;i++){
                total += $scope.baskets[i].total;
            }
            return total;
        }
        
    }]);


})();