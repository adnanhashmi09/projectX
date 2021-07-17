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
        designation : 'President',

        work : [
        {
            title:'ProjectX',
            description:'A WebApp for Ashwamedh',
            category : 'Tech',
        },
        {
            title:'ProjectXY',
            description:'A WebApp for Ashwamedh',
            category : 'Tech',
        },
    ]
    }).save()
   
    // console.log(userSaved)
    return res.send(userSaved)
});
app.get('/api/delete',async (req,res)=>{
        const user = await User.deleteMany({name:'Priyansh'});
        return res.send(user);
    }
)
app.get('/api/getUsers',async(req,res)=>{
    const users = await User.find({name:'Priyansh'});
    return res.send(users)
})

const PORT = process.env.port | 5000
app.listen(PORT)
console.log(`running on port ${PORT}`)

