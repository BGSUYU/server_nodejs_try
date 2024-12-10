// 'use strict'

const {access,constants,readFile,writeFile}=require('fs')
const {join,relative}=require('path')
const formidable=require('formidable')
const { error } = require('console')

exports.createUser = (req, res) => {
    const user = {
        nameword:req.body.nameword,
        password:req.body.password
    };
    // 这里可以添加将用户数据保存到数据库的代码(将user装入数据库或者保存为json格式的数据)
    // console.log(req.body.name)

    const listDataPath=join(__dirname,'..','data','user_data.json');
    let listData=[]
    // console.log(listDataPath)//文件路径正确

    access(listDataPath,constants.F_OK|constants.R_OK,err=>{
        if(err){
            res.end(JSON.stringify({success:false,error:e.message}));
            return;
        }
        readFile(listDataPath,'utf-8',(err,data)=>{
            try{
                listData=JSON.parse(data);
                console.log(listData)//查看是否读取正确(试运行后是可以读取)
            }
            catch(e){
                res.end(JSON.stringify({success:false,error:e.message}));
                return;
            }

            fields=user
            listData.unshift(fields);
            console.log(listData)
        
            writeFile(listDataPath,JSON.stringify(listData,null,2),'utf-8',err=>{
                res.end(JSON.stringify({success:true,fields},null,2));//写入结束响应
                console.log(`上传:${JSON.stringify(fields)}`);
            });//回写json数据
        });
    });//读取json数据信息

    console.log(`学号信息:${user.nameword}`)
    res.status(201).json({ message: 'User created successfully'});
};