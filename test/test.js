/**
 * Created by bidau on 05/05/2016.
 */

var assert = require('assert');


var asDiscount = function(baskets){
    for(var i = 0; i < baskets.length; i++){
        if(baskets[i].name==="Butter" && baskets[i].quantity%2==0){
            return true;
        }else if(baskets[i].name==="Milk" && baskets[i].quantity%3==0){
            return true;
        }
    }
    return false;
};

describe("discount", function(){
    describe("#asDiscount", function(){
        it("should return true when they are a multiple of 2 butter", function(){
            var baskets = [{
                "id":0,
                "name":"Butter",
                "price":0.80,
                "quantity":2,
                "total":1.60
            }];
            assert.equal(true, asDiscount(baskets));
            baskets = [{
                "id":0,
                "name":"Butter",
                "price":0.80,
                "quantity":4,
                "total":1.60
            }];
            assert.equal(true, asDiscount(baskets));
        });
        it("should return true when they are a multiple of 3 milk", function(){
            var baskets = [{
                "id":1,
                "name":"Milk",
                "price":1.15,
                "quantity":3,
                "total":1.15
            }];
            assert.equal(true, asDiscount(baskets));
            baskets = [{
                "id":1,
                "name":"Milk",
                "price":1.15,
                "quantity":24,
                "total":1.15
            }];
            assert.equal(true, asDiscount(baskets));

        });
        it("should return false when they are not a multiple of 2 butter", function(){
            var baskets = [{
                "id":0,
                "name":"Butter",
                "price":0.80,
                "quantity":1,
                "total":1.60
            }];
            assert.equal(false, asDiscount(baskets));
            baskets = [{
                "id":0,
                "name":"Butter",
                "price":0.80,
                "quantity":3,
                "total":1.60
            }];
            assert.equal(false, asDiscount(baskets));
        });
    });
});