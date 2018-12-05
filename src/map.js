if (!window.map) {
  var map = (function() {
    "use strict";

    var nativeIsArray = Array.isArray;

    var isFunction = function(object) {
      return typeof object === 'function';
    };

    var identity = function(element) {
      return element;
    };

    var baseMap = function(array, iteratee) {
      var result = [],
          index = -1,
          length = array.length;

      while (++index < length) {
        var current = array[index];
        result.push(isFunction(iteratee) ? iteratee(current) : current[iteratee]);
      }
      return result;
    };

    return function(array, iteratee) {
      if (!nativeIsArray(array)) {
        return [];
      }
      if (iteratee === undefined) {
        iteratee = identity;
      }
      return baseMap(array, iteratee);
    };
  })();
}