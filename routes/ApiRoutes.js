var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
require('../models/User')
const User = mongoose.model('users');

router.get('/:uid/getUser',async (req,res)=>{
    console.log(req.params.uid)
    const userData = await User.findOne({_id:req.params.uid})
    return res.send(userData)
});
router.get('/:uid/getUserActivity',async (req,res)=>{
    console.log(req.params.uid)
    const userData = await User.findOne({_id:req.params.uid})
    // console.log(userData.work)
    return res.send(userData.work)
});
router.post('/createUser', async(req,res)=>{
    let user = await new User(req.body).save();
    return res.sendStatus(200)
});

//insert list of work
router.post('/:uid/addWork',async(req,res)=>{
    const arr = req.body.work;
    console.log('check',req.body.work);
    User.findOneAndUpdate(
        {_id:req.params.uid},
        {$push : { work:{$each:arr}}},
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        }
    )
    res.sendStatus(200);
});
module.exports = router;
