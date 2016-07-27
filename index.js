/**
 * @module cache-wrapper
 */
(function () {
    "use strict";
    var getAllMethods = function getAllMethods(object) {
        return Object.getOwnPropertyNames(object).filter(function(property) {
            return typeof object[property] == 'function';
        });
    };

    var cacherTypes = {
        'generator': 0,
        'promise': 1
    };

    var detectCacherType = function detectCacherType(cacherType) {
        return Number(cacherTypes[cacherType]);
    };

    var cachers = [require('co-cacher'),require('cacher-promise')];

    /**
     * Cahe wrapper
     * @param {function} targetObject
     * @param {number} expires
     * @param {object} options now support 'cacherType' option ('generator' or 'promise'). By default = 'generator'
     * @return {object}
     */
    module.exports = function (targetObject, expires, options) {
        var cacherIdx = 0,
            salt = '';
        if (typeof options == "object") {
            cacherIdx = detectCacherType(options.cacherType);
            salt = options.salt || '';
        }
        var redefinedMethods=getAllMethods(targetObject);
        var object = {};
        redefinedMethods.forEach(function(method) {
            object[method] = function(){
                var args = [].slice.call(arguments);
                return cachers[cacherIdx](targetObject[method], args, { expires: expires, salt: method+salt });
            };
        });

        return object;
    }
}());

