var wrapper = require('../'),
    Q = require('q');

var myObject = {
    sum: function (a,b) {
        var deferred = Q.defer();
        deferred.resolve(a+b);
        return deferred.promise;
    },
    hello: function (name) {
        return Q.delay("Hello, " + name, 1000);
    }
};

var myWrappedObject = wrapper(myObject,180,{cacherType: 'promise'});

describe('Generator cache wrapped Tests', function () {
    it("Wrap myObject", function(done) {
        myWrappedObject.hello("Oleg!").then(function(result) {
            expect(result).toEqual("Hello, Oleg!");
            myWrappedObject.sum(7,2).then(function(result) {
                expect(result).toEqual(9);
                done();
            })
        })
    });
});


//myCachedObject.fake(1);
