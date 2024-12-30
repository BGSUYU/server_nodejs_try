const mysql = require('mysql2');

const connection = {
  host: 'localhost', // 数据库服务器地址
  user: 'root', // 数据库用户名
  password: '535462', // 数据库密码
  database: 'mydatabase', // 数据库名
  port:3307
}

const pool = mysql.createPool(connection)

module.exports = pool;