// url server adress
// https://hongikeatme.herocuapp.com
// 
// git init
// git add .
// git commit -m "message"
// git push    (DbManagement .git)
// git push heroku HEAD:master    (server upload)
// heroku logs --fail   (logs)
// heroku.cofig.MongosUri 등록필수
// mongoose atlas 사용 (0.0.0.0/ white )
// process.env.PORT 사용 heroku port 는 다 다름
// git 주소 https://github.com/ImNM/DbManagement
// test 로 postman 사용

const config =require('./config/key');
const express =require('express');
const app =express();
//const port = 5000;
const {User}=require("./models/User");  //user schema
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const {auth} =require('./middleware/auth');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

var nodemailer = require('nodemailer');
var smtpTransporter=require('nodemailer-smtp-transport');
const crypto = require('crypto');

const passport = require('passport');
const LocalStarge = require('passport-local').Strategy;
//const morgan = require('morgan');





//application/x-www-form-urlencoded data 분석해서 가져올수 있게함. (html form 제출방식) 
app.use(bodyParser.urlencoded({extended: true}));
//application/json 타입 분석가능하게 해줌!
app.use(bodyParser.json());
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser());
//app.use(morgan('dev'));


app.use(session({
    secret: "asdfsadfsadf",
    resave: false,
    saveUninitialized : true
}));


//app.set('jwt-secret', config.secret);


app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser(function(user, done) {
    console.log('serializeUSer',user);
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    console.log('deserializeUSer',id);
      User.findById(id,function(err,user){
        done(err, user);
      })
  });

  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


//mongoose altlas  db 설정 옵션4개는 뭔지몰라나도 connect는 altlas 주소

//const uri = process.env.MONGODB_URI;
mongoose.connect(config.MONGO_URI
    ,{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=>console.log('MongoDB conneted...'))
.catch(err => console.log(err));

app.get('/api',(req,res)=> res.send('Hello world!  ㅎㅇㅎㅇ'));

//check

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


app.post('/api/users/register',(req,res)=>{
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

app.get('/api/users/confirmEmail',function (req,res) {
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





app.post('/api/users/login',(req,res)=>{
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
                    .json({loginSucces:true, userId: user._id ,token:user.token , name:user.name});  //json 객체 형태로 front단에 넘겨줄거야 쿠키 사용 x

                })
            }
        })

    })
    
})



//auth middleware 콜백 드가기 전에 미들웨어
app.post('/api/users/auth',auth,(req,res)=>{
    //isAdimin: req.user.role === 0 ? false : true,
  
    
    res.status(200).json({
        _id: req.user._id,
        name : req.user.name,
        isAuth: true,
    })
    
})



const KakaoStrategy = require("passport-kakao").Strategy;

const kakaoKey = {
  clientID: "f30e271d94a23d1ff9a9938a46c4e679",
  clientSecret: "r6c1QtmxL5cNXBUSrO03cix365nyL1rR",
  callbackURL: "http://localhost:5000/api/users/oauth/kakao/callback" //profilefields
};


passport.use(
  "kakao-login",
  new KakaoStrategy(kakaoKey, (accessToken, refreshToken, profile, done) => {
    console.log("loging");
    
        User.findOne({snsId: profile.id,provider:'kakao'},(err,user)=>{
         if(!user){
            console.log("!user");
            adduser = new User({name:profile.displayName, snsId:profile.id, provider:profile.provider , accessToken:accessToken,refreshToken:refreshToken});
            adduser.save();
            done(null,adduser);
         }
         else{
            if(user.accessToken == ""){
                user.accessToken = accessToken;
                user.save();
            } 
            console.log("useris on");
            done(null,user);
         }
        })
    
   })
);


app.get('/api/users/oauth/kakao',
passport.authenticate("kakao-login"));
app.get(
    "/api/users/oauth/kakao/callback",
    passport.authenticate("kakao-login", {
      successRedirect: "/",
      failureRedirect: "/api/users/oauth/kakao/fail"
    })
  );


app.get('/api/users/oauth/kakao/logout', function(req,res){
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

app.post('/api/users/oauth/kakao/login',function(req,response){
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
            //console.log(info);
            User.findOne({snsId: json.id,provider:'kakao'},(err,user)=>{

                if(!user){//유저가 없으면 가입!
                    console.log("!user");
                    adduser = new User({
                        name:info.profile.nickname, 
                        snsId:json.id, 
                        provider:'kakao' , 
                        accessToken:accessToken,
                        email:info.email
                    });
                   /*
                        clientToken = jwt.sign(
                            {UserId:json._id,name:adduser.name},
                            config.secret,
                            {expiresIn : "1d"}
                        )
                        adduser.token= clientToken;

                    adduser.save();
                    */
                    adduser.generateToken((err,user)=>{//user 정보에 token 까지 저장해줌.
                        console.log(err)
                        if(err) return response.status(400).send(err);
                       return response
                        .status(200)
                        .json({loginSucces:true, 
                            userId: user._id ,
                            token:user.token , 
                            name:user.name
                        });  //json 객체 형태로 front단에 넘겨줄거야 쿠키 사용 x
                    })
                 }
                 else{//유저가 있으면 jwt토큰 발행해줄꺼야!!
                        user.accessToken = accessToken;
                        /*
                        clientToken = jwt.sign(
                            {UserId:user._id,name:user.name},
                            config.secret,
                            {expiresIn : "1d"}
                        )
                        user.token= clientToken;
                        user.save();*/
                        user.generateToken((err,user)=>{//user 정보에 token 까지 저장해줌.
                            if(err) return response.status(400).send(err);
                           return response
                            .status(200)
                            .json({loginSucces:true, 
                                userId: user._id ,
                                token:user.token , 
                                name:user.name
                            });
                        })
                 }
            })
        })
     
            

        }
});





app.post('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate({_id:req.user._id}
        ,{token:""},
        (err,user)=>{
            if(err) return res.json({success: false, err});
            return res.status(200).send({
                success:true
            })
        })
})



app.get('/api/hello',(req,res)=>{
    res.send("테스트ㅎㅇㅎㅇgdgdㅎㅇㅎㅇ");
;})




app.use(express.static(path.join(__dirname,'/client/build')));


app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
})


app.listen(process.env.PORT || 5000,()=>console.log(`Example app listening on port 5000!`))


//process.env.PORT || 