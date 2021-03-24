const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name : {
        type:String,
        maxlength: 50
    },
    email:{
        type:String,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        minlength:5
    },
    token:{
        type:String,
    }
})

userSchema.pre('save',function(next){
    var user =this;

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password,salt, function(err,hash){
             if(err) return next(err);
             user.password = hash;
             next();
         });
     });
    }
    else{//비밀번호 바꾸는게아니라 다른거 바꿀때는 next를 해줘야 비번 재설정을 다시 안해줌.
        next();
    }

})

userSchema.methods.comparePassword = function(plainPassword , cb){
    bcrypt.compare(plainPassword,this.password, function(err,isMatched){
        if(err) return cb(err);
        cb(null,isMatched);
    })
}

userSchema.methods.generateToken =function(cb){ //유저를 위한 token 생성 (나중에 세션으로 바꿀거임)
    var user =this;  //user id 는 object  id
    var token = jwt.sign(user._id, , 'secretToken');
}

const User = mongoose.model('User',userSchema);
module.exports ={User};