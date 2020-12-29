//Lecture : Let and const
/*
const - If we want our variable to act as constant,
we should declare it as const. If we try to change the value 
of such variables, compiler will give error.

let - if we want our variable to act like normal variable.
Its similar to 'var' declaration in ES5

# Variable declared as let and const are blocked scope while variables
declared as var are function scoped.


*/

//ES5 
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Doe';
console.log(name5);

//ES6
const name6 = 'Jane Smith';
let age6 = 23;
age6 = 24;
console.log(age6);
// = 'Jane Miller';
//console.log(name6)

//ES5 scoping of varibales - 
var getLicenese = function(passed) {
    
    if(passed) {
        var firstName = 'Jadon';
        var birthYear = 1998;   
    }
    //Below stmnt will work coz of ES 5
    console.log(firstName+' is passed with birth year '+ birthYear);
    
}
getLicenese(true);

//ES6 
var getLicenese6 = function(passed) {
    
    if(passed) {
        let firstName6 = 'Jadon';
        const birthYear6 = 1998;   
    }
    //Below stmnt will not work coz of ES 6, coz let and const scope
    // is till if block, not beyond that
    
    //console.log(firstName6+' is passed with birth year '+ birthYear6);
    
}

var getPassport = function(isOfAge) {
    let name;
    const brthYr = 1998;
    //const variable needs to be declared and defined together.
    //e.g. If we try to declare it outside of if block and try to define
    // it inside if block like we have done for let varibale, it will fail.
    if(isOfAge) {
        name = 'Jason';
    }
    console.log(name+ ' will now have a valid passport  with brth year as '+ brthYr);
}

getPassport(true);


/*
===============================================================================================
Blocks and IIFE's

In Es5 to make data privacy we used to have IIFE's.
But now we can hae just a block defined using curly braces and 
define all the variables and const inside that. That will automaticcally
take care of data privacy as 'let' and 'const' are block scoped
*/

//ES6 - Acheiving Data Privacy
{
    let name = 'Aryan';
    const yearOfBirth = 1998;
}
//Below line will give error
//console.log(name +' ' + yearOfBirth);


//ES5 - Acheiving Data Privacy
var func = (function() {
    var c = 90;
})();
//Below line will give error
//console.log(c);



/*
===============================================================================================
Strings in ES6 

# Template variables - rather than using + and ' again and again for creating 
message strings we can use template variales of ES6 using ` and ${}
*/

let name = 'Rishabh';
const lastName = 'Pant';
const birthYear = 1990;

var calcAge = function(year) {
    return 2020 - year;
}

//ES5
console.log(name+' is '+calcAge(birthYear)+ ' years old');

//ES6
console.log(`${name} is ${calcAge(birthYear)} years old. 
Used ES6 template variable`);

//New string methods in ES6
const n = `${name} ${lastName}`;
console.log(n);
console.log(n.startsWith('R')); //its case sensitive.
console.log(n.endsWith('t')); //its case sensitive.
console.log(n.includes(' '));
console.log(n.includes('ab'));
console.log(name.repeat(5))// repeat name 5 times.
console.log(`${name} `.repeat(5)); // repeat name with space.




/*
===============================================================================================
Arrow functions 

Its quite similar to Java's lambda functions 
*/

const years = [1990, 1998, 1989, 1979];

//ES5 
var ages5 = years.map(function(current, index, array) {
    return 2020 - current;
});
console.log(ages5);

//ES6 
var ages6 = years.map(current => 2020-current);
console.log(ages6);

/*
function used in map has access to current element, current index and whole of array
In ES6 version, we have used only current element argument.
*/

ages6  = years.map((ele, index) => `Age for Element ${index}: ${2020-ele}.`);
console.log(ages6);


var agesAgain6 = years.map((ele, index) => {
   let year = new Date().getFullYear();
   let age = year - ele;
    return `Age element ${index}: ${age}`;
});
console.log(agesAgain6);


/*
===============================================================================================
Arrow functions - Lexical This Keyword

*/
//ES5 

/*var func5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box ' + this.position + ' and its color is ' + this.color;
            alert(str);
        })
    }
}
func5.clickMe();*/

/*
Above code will show alert with values as undefined. This is because, this keyword used in anonymous 
inner function doesn't have access to objectt's variables. It only has access to global variables
It can be rectified using below hack in ES5.
*/

/*var func5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        var self = this;
        document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box ' + self.position + ' and its color is ' + self.color;
            alert(str);
        })
    }
}
func5.clickMe();*/


//ES6

var func5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box ' + this.position + ' and its color is ' + this.color;
            alert(str);
        })
    }
}
func5.clickMe();

/*
Functions defined using => does have access to object's variables. Problem comes when we define clickme function using ==>.
IN that case it only have access to global this variable rather than function specific this.
*/

//ES5
function Person(name) {
    this.name= name;
}

Person.prototype.myFriends5 = 
    function(friends) {
    var frnds = friends.map(function(el) {
        return this.name +' is friends with '+el;
    }.bind(this));
    console.log(frnds);
}


Person.prototype.myFriends6 = 
    function(friends) {
    var frnds = friends.map((el) => {
        return this.name +' is friends with '+el;
    });
    console.log(frnds);
}


var friends = ['Bob', 'Jadon', 'Mark'];
new Person('John').myFriends6(friends);



/*
===================================  Data Destructuring  =======================
1. To store data of arrays into different variabes. 
2. Return multiple values from a function. In ES5, we have to return an object from function
*/

//ES5 for Arrays.
var john = ['John', 24];

var name1 = john[0];
var age1 = john[1];
console.log('ES5 array values' + name1 + ', '+age1);


const[name66, age66] = john;
console.log('ES const '+ name66 + ', ' + age66);

// Returning multiple values from function - 
var calcRetireMentAge = function(year) {
    var age11 = new Date().getFullYear() - year;
    return [age11, 60-age11];
}

const[age12, retirementAge] = calcRetireMentAge(1984);
console.log('retirement age for '+age12+' year\'s old person is '+retirementAge);



/*
===================================  Arrays ES6  =======================
*/

var boxes = document.querySelectorAll('.box');

//ES5 
/*
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur) {
    cur.style.background = 'dodgerBlue';
})
*/

//ES6 
const boxesArr6 = Array.from(boxes);
Array.from(boxes).forEach((cur) => cur.style.background = 'dodgerBlue');

//ES5
/*
for(var i=0; i<boxes.length; i++) {
    if(boxesArr5[i].className === 'box blue') {
        //continue;
        break;
    }
    boxesArr5[i].textContent = 'Blue Converted';
}
*/

//ES6 
for(const cur of boxesArr6) {
    if(cur.className.includes('blue')) {
        continue;
    }
    cur.textContent = 'Converted to blue';
}


/*
=============== Spread Operator =======================
It takes out the elements of array and List, which we can then pass to any function
or can also be used to combine 2 arrays to make a big array.
*/
function calcAges(a,b,c,d) {
    return a+b+c
}

//ES5 - passing below array elements to calcAges function
var agessp5 = [18,20,30,22];
var sumsp5 = calcAges.apply(null, agessp5);
console.log(sumsp5);

//ES6  - spread operator
var agessp6 = [18,20,30,22];

var sumsp6  = calcAges(...agessp6);
console.log(sumsp6);

//combining 2 arrays.
var johnArr = ['Mary', 'Anna'];
var smithArr = ['Judy', 'Nicole'];

var combinedFamily = [...johnArr, ...smithArr];
console.log(combinedFamily);

var heading = document.querySelector('h1');
var boxessp6 = document.querySelectorAll('.box');
var all = [heading, ...boxessp6];
all.forEach(cur => {
    cur.style.color = 'purple';
})


/*
======================== Rest Parameter ================================
It is used to convert function arguments to ARray. 
It is used at function declaration while spread operator will be used 
during function calling.
*/


//ES5 - converting passed args to array
/*
function isFullAge5() {
    //each function context has access to 'arguments' variable,
    //which will give access to all the args passed.
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function(cur) {
        console.log((2020 - cur) > 18);
    })
}
isFullAge5(2001, 2009, 2000);

//ES6 using Rest params 

function isFullAge6(...years) {
    years.forEach(cur => console.log((2020 - cur) > 18));
}
isFullAge6(2002, 2000, 2010);
*/


/*
What if we want to pass another variable. 
*/
//ES5
function isFullAge5(limit) {
    //each function context has access to 'arguments' variable,
    //which will give access to all the args passed.
    var args = Array.prototype.slice.call(arguments, 1);
    //Passed another args to slice methods, which will determine from which 
    //location it needs to slice
    args.forEach(function(cur) {
        console.log((2020 - cur) > limit);
    })
}
isFullAge5(18,2001, 2009, 2000);

//ES6 using Rest params, its very simple

function isFullAge6(limit,...years) {
    years.forEach(cur => console.log((2020 - cur) > limit));
}
isFullAge6(18, 2002, 2000, 2010);


/*
======================== Default Parameters =========================
Settig default values of parameter/arguments of a function
*/

//ES5 - setting default values to function's arguments 
/*
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
    
    lastName === undefined ? lastName = 'Smith' : lastName = lastName;
    nationality === undefined ? nationality = 'American' : 
    nationality = nationality;
    
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

var john = new SmithPerson('John', 1984);
var emily = new SmithPerson('Emily', 'Diaz', 1988, 'spanish');
*/

//ES6 - Setting default values - 
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}
var john = new SmithPerson('John', 1984);
var emily = new SmithPerson('Emily', 1988, 'Diaz', 'spanish');

/*
========================== Maps (quite similar to Java's Hashmap) ===================================
1. Store data as Key-Value pair.
2. Keys can be anything - String, primitive, boolean and even Object.
3. We can iterate over Map just like arrays using for each and for of.
4. We can get the size of map using size.
5. We can add and delete elements in map.
*/

const question = new Map();
question.set('question', 'What is the official name of the latest major JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer :D');
question.set(false, 'Wrong, please try again!');

if(question.has(4)) {
    console.log('It has key 4');
}
question.delete(4);

if(question.has(4)) {
    console.log('It still has key 4');
}else {
    console.log('Key 4 got deleted');
}

//for each to iterte. - Similar to array, it has access to value, key and whole of map

question.forEach((value, key) => {
    console.log(`This is ${key} with value ${value}`);
});

// for of loop - 

for(let [key, value] of question.entries()) {
    if(typeof(key) === 'number') {
        console.log(`This is ${key}: ${value}`);
    }
}

let userIp = parseInt(window.prompt(question.get(question)));
console.log(question.get(userIp === question.get('correct')));


/*
======================= Classes in ES6 ===============================
Syntactic sugar - Quite similar to Java classes
*/

//ES5 way of creating objects 

var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calcPersonAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

const person1 = new Person5('Aaron', 1982, 'Engineer');
person1.calcPersonAge();


//ES6 classes

class Person6 {
    constructor(name, birthYear, job) {
        this.name = name;
        this.birthYear = birthYear;
        this.job = job;
    }
    ageCalculation() {
        var age = new Date().getFullYear() - this.birthYear;
        return age;
    }
    
    static greetings(name) {
        console.log(`Hey ${name}! How are yoy`);
    }
}
var psn6 = new Person6('Jason', 1980, 'Assistant');
console.log('psn6 age is '+psn6.ageCalculation());

Person6.greetings(psn6.name);


/*
==================== Class Inheritence ============================
*/

//ES5 - Creating inheritence between two objects

var Person55 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person55.prototype.calcPersonAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals) {
    Person55.call(this, name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
}

/*Below line link Athlete to Person5. This is like creating inheritence b/w two of them.
We are creating object of Person55 using Object.create and adding it to the prototype of 
Athlete5 object.
*/
Athlete5.prototype = Object.create(Person55.prototype);

Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
}

var mikeAthelete = new Athlete5('Mike', 1983, 'athlete', 3, 2);
mikeAthelete.calcPersonAge();
mikeAthelete.wonMedal();



//ES6 - It works similar to JAVA


class Person66 {
    constructor(name, birthYear, job) {
        this.name = name;
        this.birthYear = birthYear;
        this.job = job;
    }
    ageCalculation() {
        var age = new Date().getFullYear() - this.birthYear;
        return age;
    }
}

class Athlete66 extends Person66 {
    constructor(name, birthYear, job, olympicGames, medals) {
        super(name, birthYear, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }
    
    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

var mikeAthlete66 = new Athlete66('MIke', 1986, 'wrestler', 4,1);
console.log('mike 66 details');
console.log(mikeAthlete66.ageCalculation());
mikeAthlete66.wonMedal();


/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

var townAdministrator = (function() {
    class Park {
        constructor(name, buildYear, numberOfTress, parkArea) {
            this.name = name;
            this.buildYear = buildYear;
            this.numberOfTrees = numberOfTress;
            this.parkArea = parkArea;
        }
        
        calculateDensity() {
            return this.numberOfTrees / this.parkArea;
        }
        
        calculateAge() {
            return (new Date().getFullYear() - this.buildYear);
        }
    }
    
    class Street {
        constructor(name, buildYear, length, size = 'normal') {
            this.name = name;
            this.buildYear = buildYear;
            this.length = length;
            this.size = size;
        }
    }
    
    //Defining parks
    var park = [new Park('Park Corner', 2005, 398, 500),
                new Park('Park Louise', 2008, 598, 700),
                new Park('Central Park', 2001, 1098, 1000)];

    
    //Defining Streets 
    var streets = [new Street('Street1', 1986, 10, 'tiny'),
                   new Street('Street2', 1984, 25, 'small'),
                   new Street('Street3', 1987, 70),
                   new Street('Street4', 1982, 100, 'big'),
                   new Street('Street5', 1989, 500, 'huge')];    
    
    return {
        parkReport: function() {
            console.log('---- park report -------');
            var parkWithLargestNumberOfTrees;
            var sumOfAges=0;
            park.forEach(ele => {
                console.log(`${ele.name} has tree density of ${ele.calculateDensity()}`);
                if(ele.numberOfTrees > 1000) {
                    parkWithLargestNumberOfTrees = ele.name;
                    sumOfAges += ele.calculateAge();
                }
            });
            var averageAgeOfParks = sumOfAges/park.length;
            console.log(`Our town has ${park.length} parks. Average age is ${averageAgeOfParks}`);
            console.log(`${parkWithLargestNumberOfTrees} has maximumm number of trees count`);
        },
        
        streetsReport: function() {
            console.log('----- streets report -------');
            /*
            4. Total and average length of the town's streets
            5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal
            */
            var totalLength=0;
            var averageLength =0;
            var streetSizeMap = new Map();
            streets.forEach(ele => {
               totalLength += ele.length; 
                streetSizeMap.set(ele.name, ele.size);
            });
            averageLength = totalLength/streets.length;
            console.log(`Our town has ${streets.length} streets with total length of ${totalLength} and average length ${averageLength}`);
            console.log(`Streets classification`);
            for(let[key, value] of streetSizeMap.entries()) {
                console.log(`${key} is ${value} street`);
            }
            
        }
    }
    
})();

townAdministrator.parkReport();
townAdministrator.streetsReport();














































