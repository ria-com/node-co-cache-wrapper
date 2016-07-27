var wrapper = require('../'),
    co = require('co');

var myObject = {
    sum: function* (a,b) {
        return a+b;
    },
    hello: function* (name) {
        return "Hello, " + name;
    }
};
var myWrappedObject = wrapper(myObject,180);

describe('Generator cache wrapped Tests', function () {
    it("Wrap myObject", function(done) {
        co(function *(){
            var result = yield myWrappedObject.hello("Oleg!");
            expect(result).toEqual("Hello, Oleg!");

            result = yield myWrappedObject.sum(7,2);
            expect(result).toEqual(9);
        }).then(done);
    });
});

