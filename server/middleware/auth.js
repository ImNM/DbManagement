const {User} = require('../models/User');
let auth = (req,res,next)=>{
    //client cookie 가져와 토큰 복호화 진행 후 유저 찾음 유저 db token 에 있으면 인증.
    let token = req.cookies.x_auth;
    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth:false,error:true});
        req.token = token;
        req.user = user;
        next(); // middleware 에서 callback function으로 넘겨줌.
    })

}

module.exports = {auth};