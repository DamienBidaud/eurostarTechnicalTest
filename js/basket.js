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

    var asBreadDiscount = function(baskets){
        for(var i = 0; i < baskets.length; i++){
            if(baskets[i].id==0 && baskets[i].quantity%2==0) {
                return true;
            }
        }
        return false;
    };

    var sumTotal = function(index, baskets){
        if(baskets[index].id==1){
            return milkDiscount(baskets[index]);
        }else if(baskets[index].id==2){
            return breadDiscount(index, baskets);
        }else{
            return baskets[index].quantity*baskets[index].price;
        }
    };


    var milkDiscount = function(product){
        if(product.id==1 && product.quantity>=4){
            var numberDiscount = parseInt(product.quantity/4);
            return (product.quantity-numberDiscount)*product.price;
        }
        return product.quantity*product.price;
    };

    var getBreadQty = function(baskets){
        for(var i = 0; i < baskets.length; i++){
            if(baskets[i].id==0) {
                return baskets[i].quantity;
            }
        }
    };

    var breadDiscount = function(index, baskets){
        if(asBreadDiscount(baskets)){
            var qty = parseInt(getBreadQty(baskets)/2);
            var total = 0;
            var i=0;
            while(i < baskets[index].quantity){
                if(i < qty){
                    total+=baskets[index].price/2;
                }else{
                    total+=baskets[index].price;
                }
                i++;
            }
            return total;
        }else{
            return baskets[index].quantity*baskets[index].price;
        }
    };


    var updateSum = function(baskets){
        for(var i = 0; i < baskets.length; i++){
            baskets[i].total = sumTotal(i, baskets);
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

    /**
     * product controller
     */
    basket.controller("productsCtrl",  ["$scope", "$http","baskets", function($scope, $http, baskets){
        $scope.products = [];
        $scope.baskets = baskets;
        $scope.add = function(product){
            var index = $scope.baskets.indexOf(product);
            if(index>=0){
                $scope.baskets[index].quantity++;
            }else{
                $scope.baskets.push(product);
            }
            updateSum($scope.baskets);
        };

        $http.get("resource/products.json").then(function(data){
            $scope.products = data.data;
        }, function(response){
           console.error(response.data);
           console.error(response.status);
        });
    }]);

    /**
     * basket controller
     */
    basket.controller("basketCtrl", ["$scope","baskets", function($scope, baskets){
        $scope.baskets = baskets;

        $scope.addItem = function(index){
            $scope.baskets[index].quantity++;
            updateSum($scope.baskets);
        };

        $scope.removeItem = function(index){
            if($scope.baskets[index].quantity==1){
                $scope.baskets.splice(index, 1);
            }else{
                $scope.baskets[index].quantity--;
                updateSum($scope.baskets);

            }
        };

        $scope.removeProduct = function(index){
            $scope.baskets[index].quantity = 1;
            $scope.baskets.splice(index, 1);
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