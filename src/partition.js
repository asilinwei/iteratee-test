if (!window.partition) {
  var partition = (function() {
    "use strict";

    var nativeIsArray = Array.isArray;

    var identity = function(element) {
      return element;
    };

    var checkPropertyValue = function(target, iteratee, keys) {
      var index = -1,
          length = keys.length;

      while (++index < length) {
        var key = keys[index];
        if (iteratee[key] !== target[key]) {
          return false;
        }
      }
      return true;
    };

    var judgeIndex = function(array, current, iteratee) {
      if (typeof iteratee === 'function') {
        return iteratee(current);
      }
      if (nativeIsArray(iteratee)) {
        var key = iteratee[0],
            value = iteratee[1];

        return current[key] === value;    
      }
      if (typeof iteratee === 'object' && iteratee !== null) {
        var getKeys = Object.keys(iteratee);
        return checkPropertyValue(current, iteratee, getKeys);
      }
      return current[iteratee];
    };

    var baseIteratee = function(array, result, iteratee) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        result[judgeIndex(array, array[index], iteratee) ? 0 : 1].push(array[index]);
      }
    };

    var basePartition = function(array, iteratee) {
      var result = [[], []];
      baseIteratee(array,result,iteratee);
      return result;
    };

    return function(array, iteratee) {
      if (!nativeIsArray(array)) {
        return [[], []];
      }
      if (iteratee === undefined) {
        iteratee = identity;
      }
      return basePartition(array, iteratee);
    };
  })();
}