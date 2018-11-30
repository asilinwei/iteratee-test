if (!window.uniqBy) {
  var uniqBy = (function() {
    "use strict";

    var size = function(array) {
      return array.length;
    };

    var hasElement = function(array, iteratee, target) {
      var index = -1,
          length = size(array);

      while (++index < length) {
        if (iteratee(array[index]) === target) {
          return true;
        }
      }
      return false;
    };

    var hasPropertyValue = function(array, iteratee, target) {
      var index = -1,
          length = size(array);

      while (++index < length) {
        var element = array[index];

        if (target !== target || element[iteratee] === target) {
          return true;
        }
      }
      return false;
    };

    var funcBy = function(array, iteratee) {
      var result = [],
          index = -1,
          length = size(array);

      while (++index < length) {
        if (!hasElement(result, iteratee, iteratee(array[index]))) {
          result.push(array[index]);
        }
      }
      return result;
    };

    var keyBy = function(array, iteratee) {
      var result = [],
          index = -1,
          length = size(array);

      while (++index < length) {
        var target = array[index];

        if (!hasPropertyValue(result, iteratee, target[iteratee])) {
          result.push(target);
        }
      }
      return result;
    };

    var baseUniqBy = function(array, iteratee) {
      var func = typeof iteratee === 'function' ? funcBy : keyBy;

      return func(array, iteratee);
    };

    return function(array, iteratee) {
      if (!Array.isArray(array)) {
        return [];
      }
      if (iteratee === undefined) {
        return Array.from(array);
      }
      if (typeof iteratee !== 'function') {
        iteratee = String(iteratee);
      }
      return baseUniqBy(array, iteratee);
    };
  })();
}  