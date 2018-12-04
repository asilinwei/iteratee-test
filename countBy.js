if (!window.countBy) {
  var countBy = (function() {
    "use strict";

    var nativeIsArray = Array.isArray;

    var isFunction = function(object) {
      return typeof object === 'function';
    };

    var defaultIteratee = function(element) {
      return element;
    };

    var hasOwnProperty = function(object, property) {
      return object.hasOwnProperty(property);
    };

    var baseCountBy = function(array, iteratee) {
      var result = {},
          index = -1,
          length = array.length;

      while (++index < length) {
        var current = array[index],
            key = isFunction(iteratee) ? iteratee(current) : current[iteratee];

        if (!hasOwnProperty(result, key)) {
          result[key] = 1;
        } else {
          result[key] += 1;
        }
      }
      return result;
    };

    return function(array, iteratee) {
      if (!nativeIsArray(array)) {
        return {};
      }
      if (iteratee === undefined) {
        iteratee = defaultIteratee;
      }
      if (!isFunction(iteratee)) {
        iteratee = String(iteratee);
      }
      return baseCountBy(array, iteratee);
    };
  })();
}