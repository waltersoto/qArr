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

    var QArr = function (arr) {
        var me = this;
        if (typeof arr === "undefined" || arr === null) {
            throw new Error("Undefined array");
        }
        if (arr.constructor !== Array) {
            throw new Error("This object only works with Arrays");
        }

        var arrCopy = arr.slice(0);

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
                    if (fn(arrCopy[i], i)) {
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
                    fn(arrCopy[fi], fi);
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
                    sub.push(fn(a[i], i));
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
            var sub;

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
            var sub;

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

        var getElementAt = function (index, elemArray) {

            if (elemArray.length > index) return arr[index];

            return null;
        };

        this.elementAt = function (index) {
            ///   <summary>The ElementAt operator retrieves the element at a given index in the collection.</summary>
            ///   <param name="index" type="number">Index in array (starting with 0)</param> 
            ///	  <returns type="item or null" />
            return getElementAt(index, arrCopy);
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

        this.skipWhile = function (fn) {
            ///	<summary>
            ///	Skip elements while a predicate matches (fn)
            ///	</summary>
            ///	<param name="fn" type="function">
            ///	Function that returns result of predicate
            ///	</param>
            ///	<returns type="this" />
            if (typeof fn !== isFunction) return this;
            if (arrCopy.length === 0) return this;
            var num = 0;
            for (var i = 0, max = arrCopy.length; i < max; i++) {
                if (fn(arrCopy[i])) {
                    num++;
                } else {
                    break;
                }
            }
            me.skip(num);
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

        this.takeWhile = function (fn) {
            ///	<summary>
            ///	Take elements while a predicate matches (fn)
            ///	</summary>
            ///	<param name="fn" type="function">
            ///	Function that returns result of predicate
            ///	</param>
            ///	<returns type="this" />
            if (typeof fn !== isFunction) return this;
            if (arrCopy.length === 0) return this;
            var num = 0;
            for (var i = 0, max = arrCopy.length; i < max; i++) {
                if (fn(arrCopy[i])) {
                    num++;
                } else {
                    break;
                }
            }
            me.take(num);
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
            if (typeof fn !== "function") return false;
            for (var i = 0, m = array.length; i < m; i++) {
                if (fn(array[i])) {
                    return true;
                }
            }
            return false;
        };

        this.all = function (fn) {
            ///	<summary>
            ///	Check if all items in the array match the condition
            ///	</summary>
            ///	<param name="fn" type="function">
            ///	Condition to match
            ///	</param>
            ///	<returns type="true/false" /> 
            if (arrCopy.length === 0) return false;
            if (typeof fn !== "function") return false;
            for (var i = 0; i < arrCopy.length; i++) {
                if (!fn(arrCopy[i])) return false;
            }
            return true;
        }

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

        var indexInArr = function (fn, last, searchArray) {
            var index = -1;
            for (var i = 0, max = searchArray.length; i < max; i++) {
                if (fn(searchArray[i])) {
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
            return indexInArr(fn, true, arrCopy);
        };

        this.indexOf = function (fn) {
            ///	<summary>
            ///	Find first index of a element based on a condition
            ///	</summary> 
            ///	<returns type="int" /> 
            return indexInArr(fn, false, arrCopy);
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

        this.min = function () {
            ///	<summary>
            ///	Returns lowest value in an array of numbers
            ///	</summary> 
            ///	<returns type="int" />
            var count = 0;

            if (arrCopy.length > 0) {

                for (var i = 0, m = arrCopy.length; i < m; i++) {
                    if (!isNaN(arrCopy[i])) {
                        if (count === 0) {
                            count = parseInt(arrCopy[i]);
                        }
                        if (parseInt(arrCopy[i]) < count) {
                            count = parseInt(arrCopy[i]);
                        }

                    }
                }
            }
            return count;
        };

        this.max = function () {
            ///	<summary>
            ///	Returns highest value in an array of numbers
            ///	</summary> 
            ///	<returns type="int" />
            var count = 0;

            if (arrCopy.length > 0) {
                for (var i = 0, m = arrCopy.length; i < m; i++) {
                    if (!isNaN(arrCopy[i])) {
                        if (parseInt(arrCopy[i]) > count) {
                            count = parseInt(arrCopy[i]);
                        }
                    }
                }
            }

            return count;
        };

        this.average = function () {
            ///	<summary>
            ///	Returns average value of an array of numbers
            ///	</summary> 
            ///	<returns type="float" />
            var count = 0;
            var counter = 0;
            if (arrCopy.length > 0) {
                for (var i = 0, m = arrCopy.length; i < m; i++) {
                    if (!isNaN(arrCopy[i])) {
                        counter++;
                        count += parseFloat(arrCopy[i]);
                    }
                }
            }
            return count / counter;
        };

        this.groupBy = function (fn) {
            ///	<summary>
            ///	Retrieve a groups the elements from an array.
            /// Collection will be transformed to an array of {key:'',item[]}
            ///	</summary>  
            ///	<returns type="array of {key:'',item[]}" />
            ///	<returns type="this" />

            var grouped = [];
            if (arrCopy.length > 0) {
                for (var i = 0, m = arrCopy.length; i < m; i++) {
                    if (!contains(grouped, fn(arrCopy[i]))) {
                        grouped.push({ key: fn(arrCopy[i]), obj: arrCopy[i] });
                    }
                }

                var g = [];
                for (var k = 0, mk = grouped.length; k < mk; k++) {
                    (function (localKey) {
                        if (!findAny(g, function (n) {
                            return n.key === grouped[localKey].key;
                        })) {
                            g.push({ key: grouped[localKey].key, item: [] });
                        }
                        var index = indexInArr(function (n) { return n.key === grouped[localKey].key; }, false, g);
                        if (index !== -1 && index < grouped.length) {
                            var located = getElementAt(localKey, grouped);
                            if (located !== null && typeof located !== "undefined") {
                                g[index].item.push(located.obj);
                            }
                        }

                    })(k);
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
            ///	<returns type="this" />

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

        this.aggregate = function (fn, seed) {
            ///	<summary>
            ///	Performs an operation on each element of the array carrying forward the result of the previous operation
            ///	</summary>
            /// <signature>
            ///	<param name="fn" type="var">
            ///	Function use to proccess each element.
            /// Ex. The result of the following function will be
            /// applied to the aggregatedValue.
            /// fn(aggregatedValue, currentValue){ return aggregatedValue + currentValue; }
            ///	</param>
            /// </signature>
            /// <signature>
            ///	<param name="fn" type="var">
            ///	Function use to proccess each element.
            /// Ex. The result of the following function will be
            /// applied to the aggregatedValue.
            /// fn(aggregatedValue, currentValue){ return aggregatedValue + currentValue; }
            ///	</param>
            ///	<param name="seed" type="var">
            ///	This is the first value to be assigned to the operation.
            ///	</param>
            /// </signature>
            ///	<returns type="aggregated value" />
            var agg;
            if (typeof seed !== "undefined") {
                agg = seed;
            }
            if (arrCopy.length > 0) {
                if (typeof agg === "undefined") {
                    if (!isNaN(arrCopy[0])) {
                        agg = 0;
                    } else if (typeof arrCopy[0] === "boolean") {
                        agg = false;
                    } else {
                        agg = "";
                    }
                }

                for (var i = 0, m = arrCopy.length; i < m; i++) {
                    if (typeof fn === "function") {
                        agg = fn(agg, arrCopy[i]);
                    }
                }
            }

            return agg || 0;
        };

        this.reverse = function () {
            ///	<summary>
            ///	Reverse order of the collection.
            ///	</summary>
            ///	<returns type="this" />

            if (arrCopy.length === 0) return this;
            arrCopy.reverse();
            return this;
        };

        this.zip = function (array, fn) {
            ///	<summary>
            ///	Processes each element in two series together
            ///	</summary>
            ///	<param name="array" type="array">
            ///	Array used to process with internal collection
            ///	</param>
            ///	<param name="fn" type="function">
            /// The result of this function will be assigned to each element in the collection.
            /// ex. function([array parameter item],[internal collection item]);
            ///	</param>
            ///	<returns type="this" />

            if (array.constructor !== Array) {
                throw new Error("This method expects an Array");
            }
            if (typeof fn !== "function") return this;
            if (arrCopy.length === 0) return this;
            var size = array.length;
            for (var i = 0, m = arrCopy.length; i < m; i++) {
                if (i >= size) {
                    arrCopy.splice(i, 1);
                } else {
                    arrCopy[i] = fn(array[i], arrCopy[i]);
                }
            }
            return this;
        };

        this.intersect = function (array) {
            ///	<summary>
            ///	Create a subset of each array that is found in both arrays
            ///	</summary>
            ///	<param name="array" type="array">
            ///	Array used to find the subset
            ///	</param>
            ///	<returns type="this" />
            if (array.constructor !== Array) {
                throw new Error("This method expects an Array");
            }
            if (arrCopy.length === 0) return this;
            var removeList = [];
            for (var i = 0, m = arrCopy.length; i < m; i++) {
                var remove = true;
                for (var s = 0, sM = array.length; s < sM; s++) {
                    if (JSON.stringify(arrCopy[i]) === JSON.stringify(array[s])) {
                        remove = false;
                        break;
                    }
                }
                if (remove) {
                    removeList.push(i);
                }
            }
            if (removeList.length === 0) return this;
            for (var r = 0, rM = removeList.length; r < rM; r++) {
                arrCopy.splice(removeList[r], 1);
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
        return new QArr(arr);

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
