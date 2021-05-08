const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');
var smtpTransporter=require('nodemailer-smtp-transport');
const {User} = require("../models/User");
const {auth} =require('.././middleware/auth');
const config =require('.././config/key');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');



var smtpTransport = nodemailer.createTransport(smtpTransporter({
    service: 'Gmail',
    host:'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'water0641@gmail.com',
        pass: config.GmailpassWord
    }
}));


router.post('/register',(req,res)=>{
    //user 객체는 mongoose 모듈 import 해서 만든 객체임 save method 사용가능
    var key_one=crypto.randomBytes(256).toString('hex').substr(100, 5);
    var key_two=crypto.randomBytes(256).toString('base64').substr(50, 5);
    var key_for_verify=key_one+key_two;

    //console.log(config.GmailpassWord)
    //console.log(req.body);
    const user = new User({
        email : req.body.email,
        password: req.body.password,
        name : req.body.name,
        key_for_verify :key_for_verify
    })
    user.save((err,userInfo)=>{  //나중에 순서 바꾸셈 이메일 먼저 그다음  save다
        if(err) return res.json({success:false,err});

        
            console.log(userInfo);
            //url
            var url = 'http://' + req.get('host')+'/api/users/confirmEmail'+'?key='+userInfo.key_for_verify;
            //옵션
            console.log("url" , url)

            var mailOpt = {
                from: 'water0641@gmail.com',
                to: user.email,
                subject: '이메일 인증을 진행해주세요.',
                html : `<h1 href= "${url}">이메일 인증을 위해 URL을 클릭해주세요.</h1><br>`+url
            };
            //전송
            smtpTransport.sendMail(mailOpt, function(err, res) {
                if (err) {
                    console.log(err);
                } else {
                     console.log('email has been sent.');
                }
                smtpTransport.close();
            });
            
        return res.status(200).json({
            success:true
        });
    })
})

router.get('/confirmEmail',function (req,res) {
   console.log("gdgd",req.query.key);

    User.findOne({key_for_verify:req.query.key},
        function(err,user){
        //에러처리
        if (err) {
            console.log(err);
        }
        //일치하는 key가 없으면
        else if(!user){
            return res.send('<script type="text/javascript">alert("이메일 인증에 성공하지 못했습니다."); window.location="/"; </script>');
        }
        //인증 성공
        else {
            user.updateOne({email_verified : true}).then(()=>{
                return  res.send('<script type="text/javascript">alert("이메일 인증 완료!"); window.location="/"; </script>');
            })
          
        }
    });
});





router.post('/login',(req,res)=>{
    User.findOne({email: req.body.email},(err,user)=>{
        if(!user){
            return res.json({
                loginSucces : false,
                message:" 이메일 db에 없움!"
            })
        }
        user.comparePassword(req.body.password,(err, isMatch)=>{
            if(!isMatch)
            return res.json({loginSucces : false, message: "비밀번호 안맞음."});
            else{//success 시 ,,
                if(!user.email_verified)
                return res.json({loginSucces : false, message: "이메일 인증 안됨"});

                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    res
                    .status(200)
                    .json({loginSucces:true, userId: user._id ,token:user.token , name:user.name ,  avator:user.avatar});  //json 객체 형태로 front단에 넘겨줄거야 쿠키 사용 x

                })
            }
        })

    })
    
})



//auth middleware 콜백 드가기 전에 미들웨어
router.post('/auth',auth,(req,res)=>{
    //isAdimin: req.user.role === 0 ? false : true,
  
    res.status(200).json({
        _id: req.user._id,
        name : req.user.name,
        isAuth: true,
        avatar: req.user.avatar,
        isAdmin:req.user.isAdmin
    })
    
})

router.get('/oauth/kakao/logout', function(req,res){
    console.log(req.session);
    User.findOne({_id:req.session.passport.user},(err,user)=>{
        if(!user){
           return res.send("can not logout  user is not exist");
        }
        else{
            console.log('Bearer '+user.accessToken);
        fetch('https://kapi.kakao.com/v1/user/logout', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer '+user.accessToken}
        }).then(res => res.json())
        .then(json => console.log(json))


        req.logout(); //세션에서 로그아웃 한거지 카카오 api 에선 아니야.
        req.session.save(function(){
            user.accessToken = "";
            user.save();
         res.redirect('/');
        console.log(req.session);
        })
        }
    })  
         
});
//--------------------------------------------------------------------------------------------------- client 와 통신해서 회원가입&로그인 과정진행후
// jwt 토큰 반환

router.post('/oauth/kakao/login',function(req,response){
    const accessToken = req.body.accessToken;
    var clientToken = "";
    console.log(accessToken)
    if(!accessToken){
        return response.json({success:false});
    }
    else{

       fetch('https://kapi.kakao.com/v2/user/me', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer '+accessToken}
        }).then(res => res.json())
        .then(json => {
            console.log(json)
            clientid = json.id;
            const info = json.kakao_account;
            console.log(info);
            if(info == null){
                return response.status(400).json({success:false ,message : "올바르지 않은 accestoken 입니다."});
            }

            User.findOne({snsId: json.id,provider:'kakao'},(err,user)=>{

                if(!user){//유저가 없으면 가입!
                    console.log("!user");
                    adduser = new User({
                        name:info.profile.nickname, 
                        snsId:json.id, 
                        provider:'kakao' , 
                        accessToken:accessToken,
                        email:info.email,
                        avatar:info.profile.thumbnail_image_url
                    });
                  
                    adduser.generateToken((err,user)=>{//user 정보에 token 까지 저장해줌.
                        console.log("userinfo",user)
                        if(err) return response.status(200).send(err);
                       return response
                        .status(200)
                        .json({loginSucces:true, 
                            userId: user._id ,
                            token:user.token , 
                            name:user.name,
                            avator:user.avatar
                        });  //json 객체 형태로 front단에 넘겨줄거야 쿠키 사용 x
                    })
                 }
                 else{//유저가 있으면 jwt토큰 발행해줄꺼야!!
                        user.accessToken = accessToken;
                        
                        user.generateToken((err,user)=>{//user 정보에 token 까지 저장해줌.
                            console.log("userinfo",user)
                            if(err) return response.status(400).send(err);
                           return response
                            .status(200)
                            .json({loginSucces:true, 
                                userId: user._id ,
                                token:user.token , 
                                name:user.name,
                                avatar:user.avatar
                            });
                        })
                 }
            })
        })
     
            

        }
});

router.post('/logout',auth,(req,res)=>{
    User.findOneAndUpdate({_id:req.user._id}
        ,{token:""},
        (err,user)=>{
            if(err) return res.json({success: false, err});
            return res.status(200).send({
                success:true
            })
        })
})

router.post('/info',auth,(req,res)=>{
    console.log(req.body.localUserInfo)

    res.status(200).json({success:true,UserInfo:req.user})
 
})


router.post('/tags',auth,(req,res)=>{
    console.log(req.body.localUserInfo)
    console.log(req.body.selectedTags)
    const localUserInfo = req.body.localUserInfo;
    const selectedTags = req.body.selectedTags;

    User.findById(localUserInfo.userId,(err,user)=>{
        if(err) return res.status(400).json({success:false,err});

        user.tag = selectedTags;
        user.save((err)=>{
            console.log(err)
            if(err) return res.status(400).json({success:false,err});
            return res.status(200).json({success:true,selectedTags:selectedTags})
        })
    })

   // res.status(200).json({success:true,UserInfo:req.user})

})

module.exports = router;