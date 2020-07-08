const express = require('express');
const Profiles = require('../../models/profiles');
const passport = require('passport');
const router = express.Router();
router.get('/test',(req,res)=>{
    res.json('Profiles OK')
})
module.exports = router