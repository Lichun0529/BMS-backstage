const express = require('express');
const Profiles = require('../../models/profiles');
const passport = require('passport');
const router = express.Router();

//添加信息
router.post(
    '/add',
    passport.authenticate('jwt',{session:false}),
    (req,res)=>{
    const profileFields = {}
    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;
    new Profiles(profileFields).save().then(data=>{
        res.json(data)
    })
})
router.get('/allprofile',(req,res)=>{
    Profiles.find().then(data=>{
        res.json(data)
    })
})
module.exports = router