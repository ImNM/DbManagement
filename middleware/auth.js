const {User} = require('../models/User');
let auth = (req,res,next)=>{
    //client json 가져와 토큰 복호화 진행 후 유저 찾음 유저 db token 에 있으면 인증.
    
    const localUserInfo = req.body.localUserInfo;
   
    if(!localUserInfo){  //auth 진행 단게중 localUserInfo json 객체가 client 단에서 안넘어오면 res.isAuth = false 넘겨줌.
        res.status(200).json({
            isAuth: false
        })
    }else{

        let token = req.body.localUserInfo.token;
    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth:false,error:true});
        req.token = token;
        req.user = user;
        next(); // middleware 에서 callback function으로 넘겨줌.
    })

    

    }
    

}

module.exports = {auth};



