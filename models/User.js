const mongoose = require('mongoose');
const {Schema} = mongoose;

//This shchema defines the input structure for the user
const userSchema = new Schema({
    name : String,
});

//tell mongoose to create a new collection based on this schema
mongoose.model('users', userSchema);
