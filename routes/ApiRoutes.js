var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
require('../models/User')
const User = mongoose.model('users');

router.get('/getTeamData',async(req,res)=>{
    const data = await User.find({});
    return res.send(data);
})
router.get('/:uid/getUser',async (req,res)=>{
    const userData = await User.findOne({uid:req.params.uid})
    console.log(req.params.uid)
    return res.send(userData)
});
router.get('/:uid/getUserActivity',async (req,res)=>{
    const userData = await User.findOne({uid:req.params.uid})
    return res.send(userData.work)
});
router.post('/createUser', async(req,res)=>{
    let user = await new User(req.body).save();
    return res.sendStatus(200)
});

//insert list of work
router.post('/:uid/addWork',async(req,res)=>{
    const arr = req.body.work;
    User.findOneAndUpdate(
        {uid:req.params.uid},
        {$push : { work:{$each:arr}}},
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        }
    )
    const userData = await User.findOne({uid:req.params.uid})
    res.send(userData);
});
module.exports = router;
