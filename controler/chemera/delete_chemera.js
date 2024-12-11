const {access,constants,readFile,writeFile}=require('fs')
const {join,relative}=require('path')
const formidable=require('formidable')
const { error } = require('console');

exports.deletes=(req,res)=>{
    const chemera_user={
        chemera_comment:req.body.comment,
    }
    const listDataPath=join(__dirname,'..','data','chamera_data.json');
    let listData=[]
    console.log(listDataPath)//文件路径正确

    access(listDataPath,constants.F_OK|constants.R_OK,err=>{
        if(err){
            res.end(JSON.stringify({success:false,error:e.message}));
            return;
        }
        readFile(listDataPath,'utf-8',(err,data)=>{
            try{
                listData=JSON.parse(data);
                // console.log(listData)//查看是否读取正确(试运行后是可以读取)
            }
            catch(e){
                res.end(JSON.stringify({success:false,error:e.message}));
                return;
            }
        })
        const find_chemera_comment=listData.find(u=>u.chemera_comment===chemera_user.chemera_comment)
        if(find_chemera_comment){
            const find_car_index=listData.findIndex(u=>u.chemera_comment===chemera_user.chemera_comment)
            listData.splice(find_car_index,1)//删除数据
        }
        writeFile(listDataPath,JSON.stringify(listData,null,2),'utf-8',err=>{
            res.end(JSON.stringify({success:true,fields},null,2));//写入结束响应
            console.log(`上传:${JSON.stringify(fields)}`);
        });//回写json数据 
    })
}