const express = require('express');
const Profiles = require('../../models/profiles');
const passport = require('passport');
const router = express.Router();


// route POST api/profile/add
// @desc add profile
// @access private
// 添加信息
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

// route GET api/profile/allprofile
// @desc return all profile
// @access private
// 获取所有信息
router.get(
    '/allprofile',
    passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        Profiles.find().sort({'date':-1})
        .then(data=>{
            if(!data){
                return res.json('没有任何内容')
            }
            res.json(data)
        })
        .catch(err=>{res.json(err).status(404)})
})

// route GET api/profile/:id
// @desc return single profile
// @access private
// 获取单个信息
router.get(
    '/:id',
    passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        Profiles.findOne({_id:req.params.id})
        .then(data=>{
            if(!data){
                return res.json('没有任何内容')
            }  
            res.json(data)
        })
        .catch(err=>{res.status(404).json(err)})
})

// route POST api/profile/update
// @desc update single profile
// @access private
// 编辑指定信息
router.post(
        '/edit/:id',
        passport.authenticate('jwt',{session:false}),
        (req,res)=>{
            const profileFields = {}
            if(req.body.type) profileFields.type = req.body.type;
            if(req.body.describe) profileFields.describe = req.body.describe;
            if(req.body.income) profileFields.income = req.body.income;
            if(req.body.expend) profileFields.expend = req.body.expend;
            if(req.body.cash) profileFields.cash = req.body.cash;
            if(req.body.remark) profileFields.remark = req.body.remark;
            Profiles.findOneAndUpdate(
                {_id:req.params.id},
                {$set:profileFields},)
                .then(data =>{
                    if(!data){
                        return res.status(404).json('数据不存在')
                    }
                    res.json(data)
                })
                .catch(err=>{res.status(404).json(err)})
        }
    )
// route DELETE api/delete/:id
// @desc delete single profile
// @access private
// 删除指定信息
router.delete(
    '/delete/:id',
    passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        Profiles.findOneAndRemove({_id:req.params.id})
            .then(data =>{
                if(!data){
                    return res.status(404).json('数据不存在')
                }
                res.json(data)
            })
            .catch(err=>{res.status(404).json(err)})
    }
)
module.exports = router