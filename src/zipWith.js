/**
 * 2018-11-28
 * @copyright LinWei 2018
 * @see [`_.zipWith`](https://lodash.com/docs/4.17.11#zipWith)
 * @param {...Array} [arrays] The arrays to process.
 * @param {Function} [iteratee] The function to combine grouped values.
 * @return {Array} The result array.   
 */
if (!window.zipWith) {
  var zipWith = (function() {
    "use strict";

    var nativeMax = Math.max;

    var size = function(array) {
      return array.length;
    };

    var slice = function(array, start, end) {
      return array.slice(start, end);
    };

    var maxLength = function(arrays) {
      var index = -1,
          max = 0,
          length = size(arrays);

      while (++index < length) {
        if (Array.isArray(arrays[index])) {
          max = nativeMax(max, size(arrays[index]));
        }
      }
      return max;
    };

    // common zip
    var zip = function(arrays) {
      var result = [],
          index = -1,
          argsLength = size(arrays),
          length = maxLength(arrays);

      while (++index < length) {
        var chunk = [],
            cthIndex = -1;

        while (++cthIndex < argsLength) {
          if (Array.isArray(arrays[cthIndex])) {
            chunk.push(arrays[cthIndex][index]);
          }
        }
        result.push(chunk);
      }
      return result;
    };

    var zipWith = function(array, iteratee) {
      var result = [],
          index = -1,
          length = size(array);

      while (++index < length) {
        result.push(iteratee.apply(null, array[index]));
      }
      return result;
    };

    var baseZip = function(arrays, iteratee) {
      var result = zip(arrays);

      if (typeof iteratee === 'function') {
        result = zipWith(result, iteratee);
      }
      return result;
    };

    return function(arrays, iteratee) {
      var args = Array.from(arguments),
          lastIndex = size(args) - 1;

      iteratee = args[lastIndex];
      arrays = slice(args, 0, typeof iteratee === 'function' 
                                ? lastIndex 
                                : lastIndex + 1);

      return baseZip(arrays, iteratee);
    };
  })();
}
