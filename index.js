const express = require('express');
const app = express();
const mongoose = require('mongoose')
const keys = require('./config/keys')

require('./models/User')
const User = mongoose.model('users');

//connect to database via mongoose
mongoose.connect(keys.mongoURI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.get('/api/testdb', async (req,res) => {
    const userSaved = await new User({name :"Ashwamedh"}).save()
    console.log(userSaved)
    // return res.send("userSaved")
})

const PORT = process.env.port | 5000
app.listen(PORT)
console.log(`running on port ${PORT}`)

