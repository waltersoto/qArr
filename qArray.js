/*
 Array query object for JavaScript
<<<<<<< HEAD
 Copyright (c) 2014 Walter M. Soto Reyes 
=======
 Copyright (c) 2014 Walter M. Soto Reyes
>>>>>>> origin/master
*/

(function () {

    var _qArray = function (_array) {
        var arr = [];

        if (_array.constructor !== Array) {
            throw new Error("This object only works with Arrays");
        }
        arr = _array.slice(0);
        this.where = function (fn) {
            ///	<summary>
            ///	Returns subset where items meet criteria.
            ///	</summary>
            ///	<param name="fn" type="function">
            ///	Condition ex. function(n){ return n > 0; }
            ///	</param>
            ///	<returns type="this" />
            var sub = [];
            (function (a) {
                for (var i = 0, max = a.length; i < max; i++) {
                    if (fn(arr[i])) {
                        sub.push(arr[i]);
                    }
                }
            })(arr);
            arr = sub;
            return this;
        };
        this.forEach = function (fn) {
            ///	<summary>
            ///	Pass each element in the array through a function
            ///	</summary>
            ///	<param name="fn" type="function">
            ///	Function call during each iteration.
            /// Ex. fn(val,index);
            ///	</param>
            ///	<returns type="this" />
            if (arr.length > 0 && typeof fn === 'function') {
                for (var fi = 0, fm = arr.length; fi < fm; fi++) {
                    fn(arr[fi],fi);
                }
            }
            return this;
        };

        this.select = function (fn) {
            ///	<summary>
            ///	Transform selected items to a new form
            ///	</summary>
            ///	<param name="fn" type="function">
            ///	Format condition ex. function(n){ return 'item '+n+' as string'; }
            ///	</param>
            ///	<returns type="this" />
            var sub = [];
            (function (a) {
                for (var i = 0, max = a.length; i < max; i++) {
                    sub.push(fn(a[i]));
                }
            })(arr);
            arr = sub;

            return this;
        };

        this.orderByDescending = function (fn) {
            ///	<summary>
            ///	Sort an array descending by a condition 
            ///	</summary>
            ///	<param name="fn" type="function">
            ///	Condition ex. function(n){ return n }
            ///	</param>
            ///	<returns type="this" />
            var sub = [];

            if (arr.length > 0) {
                if (typeof arr[0] === 'string') {
                    sub = arr.sort().reverse();
                } else {
                    sub = arr.sort(function (a, b) {

                        if (typeof fn !== 'function') {
                            if (!isNaN(parseFloat(a))) {
                                return -(parseFloat(a) - parseFloat(b));
                            }
                            return -(a.toUpperCase().localeCompare(b.toUpperCase()));
                        }

                        if (!isNaN(parseFloat(fn(a)))) {
                            return -(parseFloat(fn(a)) - parseFloat(fn(b)));
                        }

                        return -fn(a).toUpperCase().localeCompare(fn(b).toUpperCase());

                    });
                }

                arr = sub;
            } 

            return this;
        };

        this.orderBy = function (fn) {
            ///	<summary>
            ///	Sort an array by a condition
            ///	</summary>
            ///	<param name="fn" type="function">
            ///	Condition ex. function(n){ return n }
            ///	</param>
            ///	<returns type="this" />
            var sub = [];

            if (arr.length > 0) {
                if (typeof arr[0] === 'string') {
                    sub = arr.sort();
                } else {
                    sub = arr.sort(function (a, b) {

                        if (typeof fn !== 'function') {
                            if (!isNaN(parseFloat(a))) {
                                return parseFloat(a) - parseFloat(b);
                            }

                            return a.toUpperCase().localeCompare(b.toUpperCase());
                        } 
                        if (!isNaN(parseFloat(fn(a)))) {
                            return parseFloat(fn(a)) - parseFloat(fn(b));
                        }

                        return fn(a).toUpperCase().localeCompare(fn(b).toUpperCase());
                    });
   
                }

                arr = sub;
            }

            return this;
        }

        this.first = function (fn) {
            /// <signature>
            ///   <summary>Returns first item in array (null if empty)</summary> 
            /// </signature>
            /// <signature>
            ///   <summary>Returns first item that meets the condition (null if empty)</summary>
            ///   <param name="fn" type="function">Condition</param> 
            /// </signature>
            ///	<returns type="item or null" />
            if (typeof fn !== 'function') {
                if (arr.length > 0) {
                    return arr[0];
                }
            } else {
                var sub = [];
                (function (a) {
                    for (var i = 0, max = a.length; i < max; i++) {
                        if (fn(a[i])) {
                            sub.push(a[i]);
                        }
                        
                    }
                })(arr);
                if (sub.length > 0) {
                    return sub[0];
                }
            }
            return null;
        }

        this.last = function (fn) {
            /// <signature>
            ///   <summary>Returns last item in array (null if empty)</summary> 
            /// </signature>
            /// <signature>
            ///   <summary>Returns last item that meets the condition (null if empty)</summary>
            ///   <param name="fn" type="function">Condition</param> 
            /// </signature>
            ///	<returns type="item or null" />
            if (typeof fn !== 'function') {
                if (arr.length > 0) {
                    return arr[arr.length - 1];
                }
            } else {
                var sub = [];
                (function (a) {
                    for (var i = 0, max = a.length; i < max; i++) {
                        if (fn(a[i])) {
                            sub.push(a[i]);
                        } 
                    }
                })(arr);
                if (sub.length > 0) {
                    return sub[sub.length - 1];
                }
            }
            return null;
        }

        this.single = function (fn) {
            ///   <summary>Returns single item that meets the condition (null if no item or more than one item meet the condition)</summary>
            ///   <param name="fn" type="function">Condition</param> 
            ///	  <returns type="item or null" />
            var sub = [];
            (function (a) {
                for (var i = 0, max = a.length; i < max; i++) {
                    if (fn(a[i])) {
                        sub.push(a[i]);
                    }
                }
            })(arr);
            if (sub.length == 1) {
                return sub[0];
            }

            return null;
        }

        this.elementAt = function (index) {
            ///   <summary>The ElementAt operator retrieves the element at a given index in the collection.</summary>
            ///   <param name="index" type="number">Index in array (starting with 0)</param> 
            ///	  <returns type="item or null" />
            if (arr.length > index) {
                return arr[index];
            }
            return null;
        }

        this.count = function (fn) {
            /// <signature>
            ///   <summary>Number of items in array</summary> 
            /// </signature>
            /// <signature>
            ///   <summary>Number of items in array that meets the condition</summary>
            ///   <param name="fn" type="function">Condition</param> 
            /// </signature>
            ///	<returns type="number" />
            if (typeof fn !== 'function') {
                return arr.length;
            }  
            var sub = [];
            (function (a) {
                for (var i = 0, max = a.length; i < max; i++) {
                    if (fn(a[i])) {
                        sub.push(a[i]);
                    }
                }
            })(arr);

            return sub.length;
        }

        this.skip = function (num) {
            ///	<summary>
            ///	Skip n items in array
            ///	</summary>
            ///	<param name="num" type="number">
            ///	 Number of items to skip
            ///	</param>
            ///	<returns type="this" />
            if (arr.length > 0 && num > 0) {
                if (arr.length > num) {
                    arr = arr.slice(num);
                }
            }

            return this;
        };

        this.take = function (num) {
            ///	<summary>
            ///	Take top n items
            ///	</summary>
            ///	<param name="num" type="number">
            ///	Number of items to take
            ///	</param>
            ///	<returns type="this" />
            if (arr.length > 0 && num > 0) {
                if (arr.length > num) {
                    arr = arr.slice(0, num);
                }
            }

            return this;
        };

        this.union = function (nArr) {
            ///   <summary>Concatenate a set of all distinct elements in two arrays</summary> 
            ///   <param name="nArr" type="array">New array</param>  
            arr = arr.concat(nArr);
            this.distinct();

            return this;
        };

        this.page = function (pg, size) {
            /// <signature>
            ///   <summary>Array paging</summary> 
            ///   <param name="pg" type="number">Page number</param> 
            ///   <param name="size" type="number">Page size</param> 
            /// </signature>
            /// <signature>
            ///   <summary>Array paging with default page size (10)</summary> 
            ///   <param name="pg" type="number">Page number</param>  
            /// </signature>
            ///	<returns type="this" />

            if (typeof size === 'undefined') {
                size = 10;
            }

            if (arr.length > 0) {
                arr = this.skip((pg - 1) * size).take(size).toArray();
            }

            return this;
        };

        var contains = function (array, o) {
            for (var s = 0, sm = array.length; s < sm; s++) {
                if (JSON.stringify(array[s]) === JSON.stringify(o)) {

                    return true;
                }
            }

            return false;
        };

        this.contains = function (item) {
            ///	<summary>
            ///	Check if the array contains an item
            ///	</summary>
            ///	<param name="item" type="item">
            ///	Condition to match
            ///	</param>
            ///	<returns type="true/false" />
            return contains(arr, item);
        };

        var _any = function (array, fn) {
            for (var i = 0, m = array.length; i < m; i++) {
                if (fn(array[i])) {
                    return true;
                }
            }
            return false;
        };


        this.any = function (fn) {
            ///	<summary>
            ///	Check if any item in the array matches the condition
            ///	</summary>
            ///	<param name="fn" type="function">
            ///	Condition to match
            ///	</param>
            ///	<returns type="true/false" /> 
            return _any(arr, fn);
        }

        
        this.distinct = function () {
            ///	<summary>
            ///	Returns only distinct items in the array
            ///	</summary> 
            ///	<returns type="this" />
            var uni = [];
            if (arr.length > 0) {
                for (var i = 0, m = arr.length; i < m; i++) { 
                    if (!contains(uni, arr[i])) {
                        uni.push(arr[i]);
                    } 
                }
                arr = uni.slice(0);
            }
            return this;
        };

        this.shuffle = function () {
            ///	<summary>
            ///	Shuffle the elements in the array
            ///	</summary> 
            ///	<returns type="this" />
            if (arr.length > 0) {
                var n = arr.length; 
                while (n) {
                    var j = Math.floor(Math.random() * (--n + 1));
                    var tempN = arr[n];
                    var tempJ = arr[j];
                    arr[n] = tempJ;
                    arr[j] = tempN;
                }
            }
            return this;
            
        };

        var _index = function (fn,last) {
            var index = -1;
            for (var i = 0, max = arr.length; i < max; i++) {
                if (fn(arr[i])) {
                    index = i;
                    if (!last) {
                      break;
                    }  
                }
            }
            return index;
        };

        this.lastIndexOf = function (fn) {
            ///	<summary>
            ///	Find last index of a element based on a condition
            ///	</summary> 
            ///	<returns type="int" />
            return _index(fn, true);
        };

        this.indexOf = function (fn) {
            ///	<summary>
            ///	Find first index of a element based on a condition
            ///	</summary> 
            ///	<returns type="int" />
            return _index(fn, false);
        };

        this.groupBy = function (fn) { 
            ///	<summary>
            ///	Retrieve a groups the elements from an array.
            ///	</summary> 
            ///	<returns type="array" />
          
            var uni = [];
            if (arr.length > 0) {
                for (var i = 0, m = arr.length; i < m; i++) {
                    if (!contains(uni, fn(arr[i]))) {
                        uni.push({key:fn(arr[i]),obj:arr[i]});
                    }
                }
                  
                var g = [];
                for (var k = 0, mk = uni.length;k < mk;k++){

                    if (!_any(g, function (n) {
                        return n.key == uni[k].key;
                    })) {
                        g.push({ key: uni[k].key, item: [] }); 
                    }
                    
                    var index = qA(g).indexOf(function (n) {  return n.key === uni[k].key; })
                  
                    if (index !== -1 && index < uni.length) {
                        g[index].item.push(qA(uni).elementAt(k).obj);
                    }  
                }

                arr = g.slice(0);
            }
            
            return this;
        };

        this.toArray = function () {
            ///	<summary>
            ///	Returns the transformed array
            ///	</summary>
            return arr;
        };

    };

    var qA = function (arr) {
        ///	<summary>
        ///	Query array object
        ///	</summary>
        ///	<param name="arr" type="array">
        ///	Array
        ///	</param>
        return new _qArray(arr);

    };

    if (typeof window !== 'undefined') {
        if (!window.qA) {
            window.qA = qA;
        }
    } else {
        // Node.js export
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = qA;
        }
    }
     
    

})();
