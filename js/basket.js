/**
 * Created by bidau on 05/05/2016.
 */
(function(){

    var basket = angular.module("basketApp", []);

    basket.factory("baskets", function(){
       return [];
    });

    /**
     * controller for the product component
     */
    var productController = function(){
        var ctrl = this;

        ctrl.addProduct = function(){
            ctrl.onUpdate();
        }
    };

    /**
     * controller for the basket component
     */
    var basketController = function(){
        var ctrl = this;

        ctrl.addItem = function(){
            ctrl.onAdd();
        };

        ctrl.removeItem = function(){
            ctrl.onRemove();
        };

        ctrl.removeProduct = function(){
            ctrl.onDelete();
        };
    };

    /**
     * check if there is exist a discount for the bread
     * @param baskets
     * @returns {boolean}
     */
    var asBreadDiscount = function(baskets){
        for(var i = 0; i < baskets.length; i++){
            if(baskets[i].id==0 && baskets[i].quantity>=2) {
                return true;
            }
        }
        return false;
    };

    /**
     * get the discount
     * @param qty
     * @param price
     * @param product
     * @returns {number}
     */
    var sumDiscount = function(qty, price, product){
        var i = 0;
        var total = 0;
        while(i < product.quantity){
            if(i < qty){
                total +=price;
            }else{
                total += product.price;
            }
            i++;
        }
        return total;
    };

    /**
     * map with the function for the discount
     * @type {{1: arrayDiscount.1, 2: arrayDiscount.2}}
     */
    var arrayDiscount = {1:function(index, product){
        if(product[index].id==1 && product[index].quantity>=4){
            var numberDiscount = parseInt(product[index].quantity/4);
            return sumDiscount(numberDiscount, 0, product[index]);
        }
        return product[index].quantity*product[index].price;
    },2:function(index, baskets){
        if(asBreadDiscount(baskets)){
            var qty = parseInt(getBreadQty(baskets)/2);
            return sumDiscount(qty, baskets[index].price/2, baskets[index]);
        }else{
            return baskets[index].quantity*baskets[index].price;
        }
    } };


    /**
     * return the total for a product
     * @param index
     * @param baskets
     * @returns {*}
     */
    var sumTotal = function(index, baskets){
        if(baskets[index].id in arrayDiscount){
            return arrayDiscount[baskets[index].id](index, baskets)
        } else{
            return baskets[index].quantity*baskets[index].price;
        }
    };

    /**
     * get the quantity of bread in the basket
     * @param baskets
     * @returns {number}
     */
    var getBreadQty = function(baskets){
        for(var i = 0; i < baskets.length; i++){
            if(baskets[i].id==0) {
                return baskets[i].quantity;
            }
        }
    };


    /**
     * update the total for all element in the basket
     * @param baskets
     */
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

    basket.component("basket", {
        templateUrl:"template/basket.html",
        controller:basketController,
        bindings:{
            basket:"<",
            onDelete:"&",
            onRemove:"&",
            onAdd:"&"
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