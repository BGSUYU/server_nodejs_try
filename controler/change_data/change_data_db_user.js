// 'use strict'

const pool = require('../mysql/db');

// 用户注册API
exports.change_data = (req, res) => {
    console.log(req.body)
    const { username, nameword , email, phone} = req.body;

    // 简单的SQL插入语句
    const sql = 'INSERT INTO users (name, nameword,email,phone) VALUES (?, ?, ?, ?)';
    
    pool.getConnection((err, connection) => {
        if (err) {
        return res.status(500).send('Error connecting to the database');
        }
        connection.query(sql, [username, nameword,email,phone], (error, results, fields) => {
        connection.release();
        if (error) {
            console.error('Database error:', error);
            return res.status(500).send('Error inserting user into the database');
        }
        res.status(201).send('User registered successfully');
        });
    });
}