const mongoose = require('mongoose');
const {Schema} = mongoose;

//This shchema defines the input structure for the user
const userSchema = new Schema({
    //personal details
    name : String,
    email : String,
    rollNumber : String,
    branch : String, //maybe we need to map these to a code 

    //critical attributes
    currentYear : Number, //how to validate this? through roll number ? 
    department : String,
    designation : String,

    // Activity
    work : [{
        title : String,
        description:String,
        category:String,
    }]
    //scores
});

//tell mongoose to create a new collection based on this schema
mongoose.model('users', userSchema);
