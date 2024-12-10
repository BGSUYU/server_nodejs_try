const express = require('express');
// const userRoutes = require('./routes/userRoutes');
// const productRoutes = require('./routes/productRoutes');
const registerRoutes = require('./routers/register_ctl')
const loginRoutes = require('./routers/login_ctl')
// const comments=require('./routers/comment_ctl')
const change_data_Routes=require('./routers/change_data_ctl')
const get_data_Routes=require('./routers/get_data_clt')
const cors = require('cors');

const app = express();

// 使用中间件来解析请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000', // 允许的源
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的方法
    allowedHeaders: ['Content-Type', 'Authorization'], // 允许的头
    credentials: true, // 是否允许发送Cookie
    optionsSuccessStatus: 200 // 一些旧版浏览器不支持 204
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // 允许所有源，包括file://
    next();
});//主要运用与开发环境不用于生产环境

// 使用路由
// app.use(userRoutes);
// app.use(productRoutes);
app.use(registerRoutes);
app.use(loginRoutes);
// app.use(comments);
app.use(change_data_Routes);
app.use(get_data_Routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});