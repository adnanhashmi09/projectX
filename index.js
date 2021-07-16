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
    const userSaved = await new User({
        name:'Priyansh',
        email:'priyanshkt67@gmail.com',
        rollNumber : '2018UIT2606',
        branch: 'IT',

        currentYear : 4,
        department : 'Script',
        // designation : 'President',

        // Work : [
        // {
        //     Title:'ProjectX',
        //     Description:'A WebApp for Ashwamedh',
        //     Category : 'Tech',
        // },
        // {
        //     Title:'ProjectXY',
        //     Description:'A WebApp for Ashwamedh',
        //     Category : 'Tech',
        // },
    // ]
    }).save()
    console.log(userSaved)
    // return res.send("userSaved")
});
app.get('/api/usersz',async (req,res)=>{
        const user = await User.findOne({name:'Priyansh'});
        return res.send(user);
    }
)

const PORT = process.env.port | 5000
app.listen(PORT)
console.log(`running on port ${PORT}`)

