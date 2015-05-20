/*
The MIT License (MIT)

Copyright (c) 2014 Walter M. Soto Reyes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function () {

    var isFunction = "function", isUndefined = "undefined", isString = "string";
   
    var qArr = function (arr) {
        var arrCopy = [];

        if (arr.constructor !== Array) {
            throw new Error("This object only works with Arrays");
        }
        arrCopy = arr.slice(0);
        this.where = function (fn) {
            ///	<summary>
            ///	Returns subset where items meet criteria.
            ///	</summary>
            ///	<param name="fn" type="function">
            ///	Condition ex. function(item){ return item > 0; }
            /// or function(item,index){ return index % 2 == 0; }
            ///	</param>
            ///	<returns type="this" />
            var sub = [];
            (function (a) {
                for (var i = 0, max = a.length; i < max; i++) {
                    if (fn(arrCopy[i],i)) {
                        sub.push(arrCopy[i]);
                    }
                }
            })(arrCopy);
            arrCopy = sub;
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
            if (arrCopy.length > 0 && typeof fn === isFunction) {
                for (var fi = 0, fm = arrCopy.length; fi < fm; fi++) {
                    fn(arrCopy[fi],fi);
                }
            }
            return this;
        };

        this.select = function (fn) {
            ///	<summary>
            ///	Transform selected items to a new form
            ///	</summary>
            ///	<param name="fn" type="function">
            ///	Format condition ex. function(item){ return 'item: '+item+' as string'; } 
            ///        or function(item,index){ return 'item '+item+' as string'; }
            ///	</param>
            ///	<returns type="this" />
            var sub = [];
            (function (a) {
                for (var i = 0, max = a.length; i < max; i++) {
                    sub.push(fn(a[i],i));
                }
            })(arrCopy);
            arrCopy = sub;

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

            if (arrCopy.length > 0) {
                if (typeof arrCopy[0] === isString) {
                    sub = arrCopy.sort().reverse();
                } else {
                    sub = arrCopy.sort(function (a, b) {

                        if (typeof fn !== isFunction) {
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

                arrCopy = sub;
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

            if (arrCopy.length > 0) {
                if (typeof arrCopy[0] === isString) {
                    sub = arrCopy.sort();
                } else {
                    sub = arrCopy.sort(function (a, b) {

                        if (typeof fn !== isFunction) {
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

                arrCopy = sub;
            }

            return this;
        };
        this.first = function (fn) {
            /// <signature>
            ///   <summary>Returns first item in array (null if empty)</summary> 
            /// </signature>
            /// <signature>
            ///   <summary>Returns first item that meets the condition (null if empty)</summary>
            ///   <param name="fn" type="function">Condition</param> 
            /// </signature>
            ///	<returns type="item or null" />
            if (typeof fn === isFunction) {
                this.where(fn);
            }

            if (arrCopy.length > 0) {
                return arrCopy[0];
            }
            return null;
        };
        this.last = function (fn) {
            /// <signature>
            ///   <summary>Returns last item in array (null if empty)</summary> 
            /// </signature>
            /// <signature>
            ///   <summary>Returns last item that meets the condition (null if empty)</summary>
            ///   <param name="fn" type="function">Condition</param> 
            /// </signature>
            ///	<returns type="item or null" />

            if (typeof fn === isFunction) {
                this.where(fn);
            }

            if (arrCopy.length > 0) {
                return arrCopy[arrCopy.length - 1];
            }
             
            return null;
        };
        this.single = function (fn) {
            ///   <summary>Returns single item that meets the condition (null if no item or more than one item meet the condition)</summary>
            ///   <param name="fn" type="function">Condition</param> 
            ///	  <returns type="item or null" />
            this.where(fn); 
            if (arrCopy.length === 1) {
                return arrCopy[0];
            }

            return null;
        };
        this.elementAt = function (index) {
            ///   <summary>The ElementAt operator retrieves the element at a given index in the collection.</summary>
            ///   <param name="index" type="number">Index in array (starting with 0)</param> 
            ///	  <returns type="item or null" />
            if (arrCopy.length > index) {
                return arrCopy[index];
            }
            return null;
        };
        this.count = function (fn) {
            /// <signature>
            ///   <summary>Number of items in array</summary> 
            /// </signature>
            /// <signature>
            ///   <summary>Number of items in array that meets the condition</summary>
            ///   <param name="fn" type="function">Condition</param> 
            /// </signature>
            ///	<returns type="number" />
            if (typeof fn !== isFunction) {
                return arrCopy.length;
            }  
            return this.where(fn).toArray().length;
        };
        this.skip = function (num) {
            ///	<summary>
            ///	Skip n items in array
            ///	</summary>
            ///	<param name="num" type="number">
            ///	 Number of items to skip
            ///	</param>
            ///	<returns type="this" />
            if (arrCopy.length > 0 && num > 0) {
                if (arrCopy.length > num) {
                    arrCopy = arrCopy.slice(num);
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
            if (arrCopy.length > 0 && num > 0) {
                if (arrCopy.length > num) {
                    arrCopy = arrCopy.slice(0, num);
                }
            }

            return this;
        };

        this.union = function (nArr) {
            ///   <summary>Concatenate a set of all distinct elements in two arrays</summary> 
            ///   <param name="nArr" type="array">New array</param>  
            arrCopy = arrCopy.concat(nArr);
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

            if (typeof size === isUndefined) {
                size = 10;
            }

            if (arrCopy.length > 0) {
                arrCopy = this.skip((pg - 1) * size).take(size).toArray();
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
            return contains(arrCopy, item);
        };

        var findAny = function (array, fn) {
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
            return findAny(arrCopy, fn);
        };
        this.distinct = function () {
            ///	<summary>
            ///	Returns only distinct items in the array
            ///	</summary> 
            ///	<returns type="this" />
            var uni = [];
            if (arrCopy.length > 0) {
                for (var i = 0, m = arrCopy.length; i < m; i++) { 
                    if (!contains(uni, arrCopy[i])) {
                        uni.push(arrCopy[i]);
                    } 
                }
                arrCopy = uni.slice(0);
            }
            return this;
        };

        this.shuffle = function () {
            ///	<summary>
            ///	Shuffle the elements in the array
            ///	</summary> 
            ///	<returns type="this" />
            if (arrCopy.length > 0) {
                var n = arrCopy.length; 
                while (n) {
                    var j = Math.floor(Math.random() * (--n + 1));
                    var tempN = arrCopy[n];
                    var tempJ = arrCopy[j];
                    arrCopy[n] = tempJ;
                    arrCopy[j] = tempN;
                }
            }
            return this;
            
        };

        var findIndex = function (fn,last) {
            var index = -1;
            for (var i = 0, max = arrCopy.length; i < max; i++) {
                if (fn(arrCopy[i])) {
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
            return findIndex(fn, true);
        };

        this.indexOf = function (fn) {
            ///	<summary>
            ///	Find first index of a element based on a condition
            ///	</summary> 
            ///	<returns type="int" />
            return findIndex(fn, false);
        };

        this.sum = function (asIntegers) {
            /// <signature>
            ///	<summary>
            ///	Returns the sum all numeric values in the array.
            ///	</summary> 
            ///	<returns type="float" />
            /// </signature>
            /// <signature>
            ///	<summary>
            ///	Returns the sum all numeric values in the array.
            ///	</summary> 
            /// <param name="asIntegers" type="boolean">Numbers as integers</param> 
            ///	<returns type="int" /> 
            /// </signature> 
            var count = 0;
            var asInt = typeof asIntegers !== isUndefined;

            if (arrCopy.length > 0) {
                for (var i = 0, m = arrCopy.length; i < m; i++) {
                    if (!isNaN(arrCopy[i])) {
                        if (asInt) {
                            count += parseInt(arrCopy[i]);
                        } else {
                            count += parseFloat(arrCopy[i]);
                        } 
                    }
                }
            } 
            return count;
        };
 

        this.groupBy = function (fn) { 
            ///	<summary>
            ///	Retrieve a groups the elements from an array.
            ///	</summary> 
            ///	<returns type="array of {key:'',item[]}" />
          
            var uni = [];
            if (arrCopy.length > 0) {
                for (var i = 0, m = arrCopy.length; i < m; i++) {
                    if (!contains(uni, fn(arrCopy[i]))) {
                        uni.push({key:fn(arrCopy[i]),obj:arrCopy[i]});
                    }
                }
                  
                var g = [];
                for (var k = 0, mk = uni.length;k < mk;k++){

                    if (!findAny(g, function (n) {
                        return n.key === uni[k].key;
                    })) {
                        g.push({ key: uni[k].key, item: [] }); 
                    }
                    
                    var index = qA(g).indexOf(function (n) {  return n.key === uni[k].key; });
                    if (index !== -1 && index < uni.length) {
                        g[index].item.push(qA(uni).elementAt(k).obj);
                    }  
                }

                arrCopy = g.slice(0);
            }
            
            return this;
        };

        this.except = function (excludeArr) {
            ///	<summary>
            ///	Produce an array of the differences between main array and the parameter array.
            ///	</summary>
            ///	<param name="arr" type="excludeArr">
            ///	Array to exclude from main array
            ///	</param>
            if (excludeArr.constructor === Array) {
                //Paramter must be an array
                var uni = [];
                if (arrCopy.length > 0) {
                    for (var i = 0, m = arrCopy.length; i < m; i++) {
                        if (!contains(excludeArr, arrCopy[i])) {
                            uni.push(arrCopy[i]);
                        }
                    }
                    arrCopy = uni.slice(0);
                }

            }
            return this;
        };

        this.toArray = function () {
            ///	<summary>
            ///	Returns the transformed array
            ///	</summary>
            return arrCopy;
        };

    };

    var qA = function (arr) {
        ///	<summary>
        ///	Query array object
        ///	</summary>
        ///	<param name="arr" type="array">
        ///	Array
        ///	</param>
        return new qArr(arr);

    };

    if (typeof window !== isUndefined) {
        if (!window.qA) {
            window.qA = qA;
        }
    } else {
        // Node.js export
        if (typeof module !== isUndefined && module.exports) {
            module.exports = qA;
        }
    }
     
    

})();
