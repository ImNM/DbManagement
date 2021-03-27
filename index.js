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

const session = require('express-session');
const passport = require('passport');





//application/x-www-form-urlencoded data 분석해서 가져올수 있게함. (html form 제출방식) 
app.use(bodyParser.urlencoded({extended: true}));
//application/json 타입 분석가능하게 해줌!
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: " asdfsadfsadf",
    resave: false,
    saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());





//mongoose altlas  db 설정 옵션4개는 뭔지몰라나도 connect는 altlas 주소

//const uri = process.env.MONGODB_URI;
mongoose.connect(config.MONGO_URI
    ,{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=>console.log('MongoDB conneted...'))
.catch(err => console.log(err));

app.get('/api',(req,res)=> res.send('Hello world!  ㅎㅇㅎㅇ'));

//check


app.post('/api/users/register',(req,res)=>{
    //user 객체는 mongoose 모듈 import 해서 만든 객체임 save method 사용가능
    const user = new User(req.body)
    user.save((err,userInfo)=>{
        if(err) return res.json({success:false,err});
        return res.status(200).json({
            success:true
        });
    })
})





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

                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    res.cookie("x_auth", user.token)
                    .status(200)
                    .json({loginSucces:true, userId: user._id});
                })
            }
        })

    })
    
})



//auth middleware 콜백 드가기 전에 미들웨어
app.get('/api/users/auth',auth,(req,res)=>{
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
  callbackURL: "http://localhost:5000/api/users/oauth/kakao/callback"
};


passport.use(
  "kakao-login",
  new KakaoStrategy(kakaoKey, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
  })
);


app.get('/api/users/oauth/kakao',passport.authenticate("kakao-login"));
app.get(
    "/api/users/oauth/kakao/callback",
    passport.authenticate("kakao-login", {
      successRedirect: "/",
      failureRedirect: "/api/users/oauth/kakao/fail"
    })
  );
  




app.get('/api/users/logout',auth,(req,res)=>{
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