let animal = {
    species: "general",
    walk: function() {
        console.log(`animal walks`);    
    },
    sleepingHrs: function(hrs) {
        this.sleepHrs = hrs;
    }
}

let rabbit = {
    name: "rabbit1",
    __proto__: animal
}

rabbit.walk = () => {
    console.log(`Rabbiit walks`);
}
rabbit.species = "Rabbit";
console.log(`rabbit species are => ${rabbit.species}`);
rabbit.sleepingHrs(9);
console.log(`rabbit sleep hrs are => ${rabbit.sleepHrs}`);
console.log(`animal sleep hrs are => ${animal.sleepHrs}`);

rabbit.walk();