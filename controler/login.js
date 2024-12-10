const register=require('./register')
const {access,constants,readFile,writeFile}=require('fs')
const {join,relative}=require('path')

exports.verify=(req,res)=>{
    const user = {
        nameword:req.body.nameword,
        password:req.body.password
    };

    console.log(user)

    const listDataPath=join(__dirname,'..','data','user_data.json');
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
                console.log(listData)//查看是否读取正确(试运行后是可以读取)
            }
            catch(e){
                res.end(JSON.stringify({success:false,error:e.message}));
                return;
            }
            if(login_verify1(listData,user)&&login_verify2(listData,user))
                res.status(201).json({message:"登录成功"})
            else
                res.status(403).json({message:"登录失败"})
        });
    });//读取json数据信息

}

function login_verify1(list,users)
{
    // console.log(list,users);
    const user = list.find(u => u.nameword === users.nameword);
    // console.log(user ? true : false)
    return user ? true : false;
}
function login_verify2(list,users)
{
    // console.log(list,users);
    const user = list.find(u => u.password === users.password);
    // console.log(user ? true : false)
    return user ? true : false;
}