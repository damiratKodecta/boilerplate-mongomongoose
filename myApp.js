require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || 'http://localhost' 
/*  { useNewUrlParser: true, useUnifiedTopology: true 
     useFindAndModify : false, 
     useCreateIndex: true 
    }
*/     
);




const Schema = mongoose.Schema;

var  personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

var Person = mongoose.model("Person", personSchema);

var createAndSavePerson = function(done) {
  var janeFonda = new Person({name: "Jane Fonda", 
    age: 84, 
    favoriteFoods: [
      "eggs", 
      "fish", 
      "fresh fruit"]
    });

  janeFonda.save(function(err, data) {
    if (err) {
      console.log('greska:'+err);
      return console.error(err);
    }
    done(null, data)
  });
};


/** 4) Create many People with `Model.create()` */
var arrayOfPeople = [
  {name: "Damir", age: 54, favoriteFoods: ["Kebab"]},
  {name: "Amela", age: 50, favoriteFoods: ["Piletina"]},
  {name: "Amir", age: 22, favoriteFoods: ["Meso"]},
  {name: "Nahla", age: 16, favoriteFoods: ["Kolaci"]}
];

var createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};


/** 5) Use `Model.find()` */
var findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

/** 6) Use `Model.findOne()` */
var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function (err, person) {
    if (err) return console.log(err);

     // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
     person.favoriteFoods.push(foodToAdd);

     // and inside the find callback - save() the updated Person.
     person.save((err, updatedPerson) => {
       if(err) return console.log(err);
       done(null, updatedPerson)
     })

    //done(null, data);
  });
  //done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
 //console.log('before');
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
   // console.log('in findOneAndUpdate');
    if (err) return console.log(err);
    done(null, updatedDoc);

  })

 // done(null /*, data*/);
};

const removeById = (personId, done) => {

  Person.findByIdAndRemove( personId, (err, data) => {
      if (err) return console.log(err);
      done(null, data);
    });

};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.deleteMany({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ food: foodToSearch})
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
 .exec(function(error, people) {
    //do something here
    done(error, data);
  } 
); 

  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
