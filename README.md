# iteratee-test
This is a repository about iteratee test.     
      
2018-11-28    
LinWei      
        
Methods:   
```
zipWith
```    
Description:   
see [`_.zipWith`](https://lodash.com/docs/4.17.11#zipWith) in lodash.   
[`source`](https://github.com/asilinwei/iteratee-test/blob/master/src/zipWith.js)      
      
Example:
```
zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
  return a + b + c;
});
// => [111, 222]
```      