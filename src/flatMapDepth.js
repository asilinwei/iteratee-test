if (!window.flatMapDepth) {
  var flatMapDepth = (function() {
    "use strict";

    var nativeIsArray = Array.isArray,
        nativeArrayFrom = Array.from;

    var nativeFloor = Math.floor;

    var defaultIteratee = function() {
      return undefined;
    };

    var baseFlatDepth = function(array, result, depth, iteratee) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        var element = array[index],
            current = iteratee ? iteratee(element) : element;

        if (nativeIsArray(current) && depth > 0) {
          baseFlatDepth(current, result, depth - 1);
          continue;
        }
        result.push(current);
      }
    };

    var baseFlatMapDepth = function(array, iteratee, depth) {
      var result = [];
      baseFlatDepth(array, result, depth, iteratee);
      return result;
    };

    return function(array, iteratee, depth) {
      if (!nativeIsArray(array)) {
        return [];
      }
      if (iteratee === undefined) {
        return nativeArrayFrom(array);
      }
      if (typeof iteratee !== 'function') {
        iteratee = defaultIteratee;
      }
      depth = depth === undefined ? 1 : nativeFloor(depth);

      if (depth !== depth) {
        depth = 0;
      }
      return baseFlatMapDepth(array, iteratee, depth);
    };
  })();
}