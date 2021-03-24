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
//application/x-www-form-urlencoded data 분석해서 가져올수 있게함. (html form 제출방식) 
app.use(bodyParser.urlencoded({extended: true}));
//application/json 타입 분석가능하게 해줌!
app.use(bodyParser.json());
app.use(cookieParser());







//mongoose altlas  db 설정 옵션4개는 뭔지몰라나도 connect는 altlas 주소
const mongoose = require('mongoose');
//const uri = process.env.MONGODB_URI;
mongoose.connect(config.MONGO_URI
    ,{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=>console.log('MongoDB conneted...'))
.catch(err => console.log(err));

app.get('/',(req,res)=> res.send('Hello world!  ㅎㅇㅎㅇ'));

//check


app.post('/register',(req,res)=>{
    //user 객체는 mongoose 모듈 import 해서 만든 객체임 save method 사용가능
    const user = new User(req.body)
    user.save((err,userInfo)=>{
        if(err) return res.json({success:false,err});
        return res.status(200).json({
            success:true
        });
    })
})

app.post('/login',(req,res)=>{
    User.findOne({email: req.body.email},(err,userInfo=>{
        if(!userInfo){
            return res.json({
                loginSucces : false,
                message:" 이메일 db에 없움!"
            })
        }
        user.comparePassword(req.body.password,(err, isMatch)=>{
            if(!isMatch)
            return res.json({loginSucces : false, message: "비밀번호 안맞음."});
            else{

                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    res.cookie("x_auth", user.token)
                    .status(200)
                    .json({loginSucces:true, userId: user._Id});
                })
            }
        })

    })
    )
})


app.listen(process.env.PORT || 5000,()=>console.log(`Example app listening on port 5000!`))
//process.env.PORT || 