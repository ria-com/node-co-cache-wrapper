var wrapper = require('./'),
    co = require('co');

var myObject = {
    sum: function* (a,b) {
        return a+b;
    },
    hello: function* (name) {
        return "Hello, " + name;
    }
};

var myWrappedObject = wrapper(myObject,180); // Cache all methods on 3 min
co(function *(){
    console.log(yield myWrappedObject.hello("Oleg!"));
    //console.log(myCachedObject.first.toString());
    console.log(yield myWrappedObject.sum(7,2));
}).catch(function(e) {throw e; });



//myCachedObject.fake(1);
