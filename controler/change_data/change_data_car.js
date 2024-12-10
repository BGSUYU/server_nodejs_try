// 'use strict'

const {access,constants,readFile,writeFile}=require('fs')
const {join,relative}=require('path')
const formidable=require('formidable')
const { error } = require('console');

exports.change_data = (req, res) => {
    const car={
        car_user:req.body.nameword,
        car_type_first:req.body.car_type_first,
        car_type_second:req.body.car_type_second,
        car_number:req.car_number,
        car_id:req.car_id
    }

    const listDataPath_2=join(__dirname,'..','..','data','user_data.json')
    const listDataPath_1=join(__dirname,'..','..','data','car_data.json');
    let listData_1=[]
    console.log(listDataPath_1,listDataPath_2)//文件路径正确
    verify(listDataPath_1,listDataPath_2)
    readFile(listDataPath_1,'utf-8',(err,data)=>{
        try{
            listData_1=JSON.parse(data);
        }
        catch(err){
            res.end(JSON.stringify({success:false,error:e.message}));
            return;
        }
        const find_carnum=listData_1.find(u => u.car_number === car.car_number)
        if(find_carnum){
            res.end("车辆信息存在")//不知道是否会报错以及用法问题
            return;
        }
        else{
                {
                    listData_1.unshift=car
                    writeFile(listDataPath_1,JSON.stringify(listData_1,null,2),'utf-8',err=>{
                        res.end(JSON.stringify({success:true,car},null,2));//写入结束响应
                        console.log(`上传:${JSON.stringify(car)}`);
                    });//回写json数据
                }
        }
    })
    console.log(`车辆信息:${car}`)
    res.status(201).json({ message: '修改车辆信息成功' });
};

// async function verify(listDataPath_1,listDataPath_2) {
//     try {
//         // 使用 Promise.all 同时检查两个文件的可读性
//         await Promise.all([
//             access(listDataPath_1,constants.F_OK|constants.R_OK,err=>{
//                 if(err){
//                     res.end(JSON.stringify({success:false,error:e.message}));
//                     return;
//                 }
//             }),
//             access(listDataPath_2,constants.F_OK|constants.R_OK,err=>{
//                 if(err){
//                     res.end(JSON.stringify({success:false,error:e.message}));
//                     return;
//                 }
//             })
//         ]);
//         console.log('两个文件都可读');
//       } catch (error) {
//         // 如果任何一个文件不可读，将在这里捕获错误
//         console.error('一个或两个文件不可读', error);
//       }
// }

  