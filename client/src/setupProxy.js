const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function(app){
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOringin:true,
        })
    );
};


//--------------------------------------------------------------------------------------------------------
//heroku 에 올릴때 process.env.PORT로 수정해라~~~~~~~~~~~~~~~~~~~
// 2021.03.24 수요일 17시
//--------------------------------------------------------------------------------------------------------