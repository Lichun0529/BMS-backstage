//[创建数据模型] 1. 创建一个模型文件
//[创建数据模型] 2. 引入mongoose
const mongoose = require('mongoose');
//[创建数据模型] 3. 实例化Schema对象 
const Schema = mongoose.Schema;
//[创建数据模型] 4. 创建Schema（创建一个数据库）
const ProfilesSchema = new Schema({
    type:{
        type: String
    },
    describe:{
        type: String
    },
    incode:{
        type: String,
        require:true
    },
    expend:{
        type: String,
        require:true
    },
    cash:{
        type: String,
        require:true
    },
    remark:{
        type: String,
    },
    date:{
        type: Date,
        default:Date.now()
    }
})
//[创建数据模型] 5. 把创建的Schema编译成model
module.exports = Profiles = mongoose.model('profiles', ProfilesSchema);