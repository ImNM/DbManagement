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
    },
    isAuth:{
        type:String
    },
    snsId:{
        type:String
    },
    provider:{
        type:String
    },
    accessToken:{
        type:String
    },
    refreshToken:{
        type:String
    },
    email_verified :{ 
        type: Boolean, 
         default: false 
    },
    key_for_verify :{ 
        type: String, 
    },
    avatar:{
        type:String,
        default : ""
    },

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
    var token = jwt.sign(user._id.toHexString(),'secretToken');
    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null, user);
    })
}

userSchema.statics.findByToken = function(token ,cb){
    var user =this;


    jwt.verify(token,'secretToken',function(err,decoded){
        user.findOne({"_id" : decoded , "token":token}, function(err,user){
            if(err) return cb(err);
            cb(null,user);
        })
    })
}



const User = mongoose.model('User',userSchema);
module.exports ={User};