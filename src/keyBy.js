if (!window.keyBy) {
  var keyBy = (function() {
    "use strict";

    var nativeIsArray = Array.isArray;

    var isFunction = function(object) {
      return typeof object === 'function';
    };

    var identity = function(element) {
      return element;
    };

    var baseKeyBy = function(array, iteratee) {
      var result = {},
          index = -1,
          length = array.length;

      while (++index < length) {
        var value = array[index],
            key = isFunction(iteratee) ? iteratee(value) : value[iteratee];

        result[key] = value;
      }
      return result;
    };

    return function(array, iteratee) {
      if (!nativeIsArray(array)) {
        return {};
      }
      if (iteratee === undefined) {
        iteratee = identity;
      }
      return baseKeyBy(array, iteratee);
    };
  })();
}
