const config =require('./config/key');
const express =require('express');
const app =express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//application/x-www-form-urlencoded data 분석해서 가져올수 있게함. (html form 제출방식) 
app.use(bodyParser.urlencoded({extended: true}));
//application/json 타입 분석가능하게 해줌!
app.use(bodyParser.json());
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser());

mongoose.connect(config.MONGO_URI
    ,{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=>console.log('MongoDB conneted...'))
.catch(err => console.log(err));

app.use('/api/users',require('./routes/users'));
app.use('/api/comment',require('./routes/comment'));
app.use('/api/board',require('./routes/board'));
app.use('/api/like',require('./routes/like'));
app.use('/api/everyDay',require('./routes/everyDay'));
app.use('/api/admin',require('./routes/admin'));

app.use(express.static(path.join(__dirname,'/client/build')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
})

app.listen(process.env.PORT || 5000,()=>console.log(`Example app listening on port 5000!`))
