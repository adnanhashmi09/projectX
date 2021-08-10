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
    // console.log(req.params.uid)
    return res.send(userData)
});

router.get('/:uid/getUserActivity',async (req,res)=>{
    console.log("here")
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

router.post('/:uid/profile/update',async (req,res)=>{
    const data = req.body;
    data.uid = req.params.uid;
    // const uid = req.params.uid
    var query = {uid: data.uid};
    var update = {...data}
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Find the document
    User.findOneAndUpdate(query, update, options, function(error, result) {
        if (error) return;
        // do something with the document
        console.log(result)
    });
})
router.get('/:uid/processActivity',async (req,res)=>{
    const userData = await User.findOne({uid:req.params.uid})
    // console.log(req.params.uid)
    return res.send(userData)
});

router.post('/:uid/teamActivity/addComment',async(req,res,next)=>{
    const data = req.body;
    console.log(data)
    User.findOneAndUpdate(
        {"uid":data.uid,"work._id":data._id},
        {"$push":
            {"work.$.comments":
                {name:data.name,
                text:data.text}
            }
        }
        ,async function(err,doc){
            if(err) return next(err)
            const data = await User.find({});
            return res.send(data);
        }
    );
});
 
router.post('/:uid/processActivity',async(req,res,next)=>{
    const data = req.body;
    console.log(data);
    return res.send(200)
});


module.exports = router;
