var wrapper = require('./'),
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

var myWrappedObject = wrapper(myObject,180,{cacherType: 'promise'}); // Cache all methods on 3 min
myWrappedObject.sum(7,2).then(function(value){
    console.log(value);
    myWrappedObject.hello("Oleg!").then(function(value){
        console.log(value);
    });
});

//myCachedObject.fake(1);
