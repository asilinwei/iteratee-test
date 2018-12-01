if (!window.groupBy) {
  var groupBy = (function() {
    "use strict";

    var isArray = Array.isArray;

    var isObject = function(object) {
      return typeof object === 'object' && object !== null;
    };

    var isFunction = function(func) {
      return typeof func === 'function';
    };

    var defaultInvoke = function(value) {
      return value;
    };

    var size = function(array) {
      return array.length;
    };

    var hasOwnProperty = function(object, property) {
      return object.hasOwnProperty(property);
    };

    var collectValues = function(object) {
      var keys = Object.keys(object),
          values = [],
          index = -1,
          length = size(keys);

      while (++index < length) {
        var key = keys[index];
        values.push(object[key]);
      }
      return values;
    };

    var invokeBy = function(collection, iteratee) {
      var result = {},
          index = -1,
          length = size(collection);

      while (++index < length) {
        var element = collection[index],
            key = isFunction(iteratee) ? iteratee(element) : element[iteratee];

        if (!hasOwnProperty(result, key)) {
          result[key] = [];
        }
        var array = result[key];
        array.push(collection[index]);
      }
      return result;
    };

    var baseGroupBy = function(collection, iteratee) {
      if (isObject(collection)) {
        collection = collectValues(collection);
      }
      return invokeBy(collection, iteratee);
    };

    return function(collection, iteratee) {
      if (!isArray(collection) && !isObject(collection)) {
        return {};
      }
      if (iteratee === undefined) {
        iteratee = defaultInvoke;
      }
      if (!isFunction(iteratee)) {
        iteratee = String(iteratee);
      }
      return baseGroupBy(collection, iteratee);
    };
  })();
}