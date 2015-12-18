qArr
======

qArr.js implements a collection of methods for querying data from arrays similar to some of the methods provided by Linq in ".NET".

###Examples:

Using the **where** method to retrieve users younger than 30.
```js
             var users = [{ firstName: 'Joe', lastName: 'Flacco', age: 29 }, 
                          { firstName: 'George', lastName: 'Costanza', age: 40 },
                          { firstName: 'Leo', lastName: 'Messi', age: 27 },
                          { firstName: 'Willie', lastName: 'Nelson', age: 81 }];

              var younger = qA(users).where(function (o) { return o.age < 30; }).toArray();

             qA(younger).forEach(function (o) {
                        console.log(o.firstName + ' ' + o.lastName);
                        });
```

Update the example above to include the **select** method to transform the results of **where** into an array of string.
```js
            var users = [{ firstName: 'Joe', lastName: 'Flacco', age: 29 },
              { firstName: 'George', lastName: 'Costanza', age: 40 },
              { firstName: 'Leo', lastName: 'Messi', age: 27 },
              { firstName: 'Willie', lastName: 'Nelson', age: 81 }];

            var younger = qA(users)
                            .where(function (o) { return o.age < 30; })
                            .select(function (o) {
                                return o.firstName + ' ' + o.lastName + '(' + o.age + ')';
                            }).toArray();

            qA(younger).forEach(function (o) {
                console.log(o);
            });
```

Sort array by using **orderBy()** or **orderByDescending()**

```js

            var users = [{ firstName: 'Joe', lastName: 'Flacco', age: 29 },
              { firstName: 'George', lastName: 'Costanza', age: 40 },
              { firstName: 'Leo', lastName: 'Messi', age: 27 },
              { firstName: 'Willie', lastName: 'Nelson', age: 81 }];

        
            var asc = qA(users).orderBy(function (n) { return n.firstName; }).toArray();
            var desc = qA(users).orderByDescending(function (n) { return n.firstName; }).toArray();

            qA(asc).forEach(function (o) {
                console.log(o.firstName);
            });

            console.log('***************');

            qA(desc).forEach(function (o) {
                console.log(o.firstName);
            });

```
Group an array into categories (keys) by using **groupBy()**.
Note: the result will be an array with the following structure {key:'',item[]}
```js
          var teams = [{ name: "FC Barcelona", country: "ESP" },
                         { name: "Juventus", country: "ITA" },
                         { name: "PSG", country: "FR" },
                         { name: "Manchester City", country: "ENG" },
                         { name: "Sevilla FC", country: "ESP" },
                         { name: "Chelsea", country: "ENG" },
                         { name: "AC Milan", country: "ITA" }];

            var byCountry = qA(teams).groupBy(function(x) { return x.country; }).toArray();

            qA(byCountry).forEach(function(g) {
                console.log(g.key);
                qA(g.item).forEach(function(t) {
                    console.log(' >'+t.name);
                });
                console.log('');
            });
```


