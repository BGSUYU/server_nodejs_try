const register=require('../register')
const {access,constants,readFile,writeFile}=require('fs')
const {join,relative}=require('path')
const multer = require('multer');

exports.comments=((req,res)=>{
  const comment={
    text:req.body.text
  }
  const listDataPath=join(__dirname,'..','..','data','comment_data.json');
  let listData=[]
  console.log(listDataPath)//文件路径正确
  access(listDataPath,constants.F_OK|constants.R_OK,err=>{
      try{
          listData=JSON.parse(data);
          // console.log(listData)//查看是否读取正确(试运行后是可以读取)
      }
      catch(e){
          res.end(JSON.stringify({success:false,error:e.message}));
          return;
      }
      listData.unshift=comment
      writeFile(listDataPath,JSON.stringify(listData,null,2),'utf-8',err=>{
        res.end(JSON.stringify({success:true,listData},null,2));//写入结束响应
        console.log(`上传:${JSON.stringify(listData)}`);
    });//回写json数据
  })
})