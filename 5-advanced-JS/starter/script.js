/*Old way of creating object*/
var John = {
    firstName: 'John',
    lastName: 'Smith',
    yearOfBirth: 1988,
    job: 'Teacher',
    calculateAge: function(){
        console.log(2019 - this.yearOfBirth)
    }
}
console.log(John.firstName);
John.calculateAge();

/* FUNCTION CONSTRUCTOR 
New way of creating objects. Here we are using Constructors [Just Like 
class in java] to create a blue print and from that we will be creating our objects.

All the metods and propeties that need to be inherited will have to be placed inside
prototype prpoperty of object.
*/
var Person = function (name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    this.calculateAge = function(){
        console.log(2019 - this.yearOfBirth);
    }
}

var Jane = new Person('Jane', 1993, 'Su-Chef');
console.log('Jane is ' + Jane.job + ' with age ');
Jane.calculateAge();

/*Adding function in prototype property of object. Becasue of that it will be 
inherited by all the objects */
Person.prototype.yearsLeftForRetirement = function(){
    console.log(60 - (2019 - this.yearOfBirth))
}
console.log('Jane remainig years for retirement is ');
Jane.yearsLeftForRetirement();


/* OBJECT CREATE
This is another way of creating object. Difference between this and previous way is
that, we can pass any object directly as first argument, which we want to inherit.

In previous way, we have to rely on prototype property of constructor/class.

Below is the implementation.
*/

var personProto = {
    lastName : 'Smith',
    calculateAge: function() {
        console.log(2019 - this.yearOfBirth);
    }
}

var Mark = Object.create(personProto, {
    name : {value: 'Marks'},
    yearOfBirth: {value: '1994'},
    job: {value: 'Teacher'}
});

console.log(Mark.name +' '+ Mark.lastName + ' is '+Mark.job + ' and he is ');
Mark.calculateAge();



/*
Objects and Primitives - 

Variables containing primitives doesn't changes its values.
Variables pointing to object just contains reference of the object location.
*/

var a = 10;
var b = a;
a = 20;
console.log('a is '+ a + ' and b is '+ b);

var obj1 = {
    name: 'John',
    age: 19
}
var obj2 = obj1;
obj1.age = 23;

console.log('obj1 age is '+ obj1.age+ ' obj2 age is '+obj2.age);

function change (a, b){
    a = 24;
    b.age = 26;
}

change(b, obj1);
console.log('var b value is '+b+' and obj1 age is '+obj1.age);



/*
Functions in Javascript - 

1. A Function is an instance of an Object.
2. A Function behaves like any other Object.
3. We can store functions in a variable.
4. We can pass a function as an argument to another function.
5. We can return a function from another function.

Because of above all they are called as FIRST CLASS FUNCTION.
*/

/*
-------- Passing Function as an Argument ------------
=====================================================
*/
var year = [1990, 1971, 1965, 2010, 2007];

var genericCalculator = function(arr, fn){
    var resArr = new Array();
    for(var i=0; i<arr.length; i++){
        resArr.push(fn(arr[i]));
    }
    return resArr;
}

var ageCalc = function(item){
    return 2019 - item;
}

var heartRateCalc = function(item){
    var result = 0;
    (item >= 18 && item <=80) ? 
        result =  Math.round(206.9-(0.67 * item)) : 
        result = -1;
    return result;
}

var ages = genericCalculator(year, ageCalc);
var heartRates = genericCalculator(ages, heartRateCalc);

console.log('ages '+ ages);

console.log('heart Rates '+ heartRates);


/*
------------ Returnigng Function from Function ----------
=========================================================
*/
var generateQuestion = function(job){
    switch(job) {
        case 'Teacher' : 
            return function(person) {
                return (' Subject which you teach, '+person);
            }
            break;
            
        case 'Designer' :
            return function(person) {
                return (' Do you know about UX designs '+person);
            }
            break;
            
        default : 
            return function(person) {
                 return ('What do you do '+person);
            }
    }
}

var designerQuestion = generateQuestion('Designer')
console.log(designerQuestion('Mark'));

/* We can also write above statement in single line */
console.log(generateQuestion('Teacher')('Jane'));


/*
--------- IIFE ---------
========================
*/

console.log('Working with iife');
(function () {
    var score = Math.random() * 10;
    return console.log(score >= 5);
})();

//Passing parameters to iife function 
(function (param) {
    var score = Math.random() * 10;
    return console.log(score >= 5-param);
})(5);


/*
------------- Closures -------------
====================================

An inner function has always access to variables and parameters 
of its outer function, even after after the outer function has 
returned.
*/
console.log('Closures')
var yearsLeftForRetirement = function(age) {
    var a = ' years left for retirement ';
    return function (yearOfBirth) {
        return (age - (2019 - yearOfBirth)) + a;
    }
}
var ylfrUS = yearsLeftForRetirement(66);
console.log(ylfrUS(1990));


/*
Function callled at line 212 caused the execution stack of yearsLeftForRetirement
function removed from Global execution stack. Even then when inner function being 
called at next line, it was still able to use 'age' and 'a' variable.
*/



/*
----------- Function's call, apply and bind -------------------
===============================================================
*/
console.log('Function \'call\' ');
var john = {
    name: 'John',
    age: 35,
    job: 'Teacher',
    presentation: function(type, timeOfDay) {
        if(type === 'formal') {
            console.log('Good '+timeOfDay+' to all.' +
                       ' My name is '+this.name+
                       '. I\'m a '+this.job+' and '+
                       ' I\'m '+this.age+' years old.');
        }else {
            console.log('Hey what\'s up !. I\'m '+this.name+
                       '. I\'m a '+this.job+' and I\'m '+
                       this.age+' years old. Have a good '+ timeOfDay);
        }
    }
}
john.presentation('friendly', 'evening');

console.log('call function usage');
var emily = {
    name: 'Emily',
    age: '49',
    job: 'Designer'
}

john.presentation.call(emily, 'formal', 'morning');

/*
Call is used to borrow function from another object.
As we can see in line 254, we have called 'call' function 
on 'presentation' function. Arguments of 'call' are - 
1. this is the object, for which we are borrowing function 'presentation'.
   Object passed will replace 'this' keyword in 'presentation' function.
2. First argument for 'presentation' function.
3. Second argument for 'presentation' function.
*/

/*
Apply will be used when a function which we are borrowing has arrays as argument.
Below code will not work, that's why commented.
*/
//john.presentation.apply(emily, ['formal', 'morning']);


console.log('Bind function usage');

var friendlyJohn = john.presentation.bind(john, 'friendly');
friendlyJohn('afternoon');
friendlyJohn('evening');
friendlyJohn('night');

var formalemily = john.presentation.bind(emily, 'formal');
formalemily('Morning');
formalemily('afternoon');


/*
'Bind' - It is used to borrow a function with pre-defined argument value.
We can also assume that, it returns a separate function with some arguments 
pre-defined.

In our example we can see that, we have borrowed 'presentation' function of john
with pre-defined 'friendly' argument. Then we have used it just by passing emily's 
object and remaining argument
*/




