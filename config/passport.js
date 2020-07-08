//[验证token] 3. 配置passport（难点）
const passport = require("passport");
const keys = require('./keys');
const mongoose = require('mongoose');
const User = mongoose.model('users')
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKeys;
module.exports = passport =>{
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id).then(data=>{
            if(data){
                return done(null,data)
            }else{
                return done(null,false)
            }
        }).catch(err=>{console.log(err)})
    }));
}