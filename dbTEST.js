const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb+srv://test:rt69801234@cluster0.2le4g.mongodb.net/<dbname>?retryWrites=true&w=majority',{ useUnifiedTopology: true })
    .then(()=>{
        console.log('MongoDB Connected');
    }).catch(err=>{
        console.log(err);
    })  
const kittySchema = new Schema({
    name: String
})
var Kitten = mongoose.model('Kitten', kittySchema);
var felyne = new Kitten({ name: 'Felyne' });
kittySchema.methods.speak = function () {
        var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
        console.log(greeting);
    }
felyne.save(function (err, felyne) {
    if (err) return console.error(err);
  });
  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  })