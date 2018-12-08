if (!window.sumBy) {
  var sumBy = (function() {
    "use strict";

    var nativeIsArray = Array.isArray;

    var identity = function(element) {
      return element;
    };

    var property = function(key) {
      return function(object) {
        return object == null ? undefined : object[key];
      };
    };

    var baseSumBy = function(array, iteratee) {
      var result,
          index = -1,
          length = array.length;

      while (++index < length) {
        var current = iteratee(array[index]);
        if (current !== undefined) {
          result = result === undefined ? current : (result + current);
        }
      }    
      return result;
    };

    return function(array, iteratee) {
      if (!nativeIsArray(array)) {
        return 0;
      }
      if (iteratee === undefined) {
        iteratee = identity;
      }
      if (typeof iteratee !== 'function') {
        iteratee = property(iteratee);
      }
      return baseSumBy(array, iteratee);
    };
  })();
}