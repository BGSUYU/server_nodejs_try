const {access,constants,readFile,writeFile}=require('fs')
const {join,relative,extname}=require('path')

exports.gets = (req, res) => {
    const user={
        nameword:req.body.nameword
    }

    const listDataPath=join(__dirname,'..','..','data','user_data.json');
    let listData=[]
    console.log(listDataPath)//文件路径正确

    access(listDataPath,constants.F_OK|constants.R_OK,err=>{
        if(err){
            console.error('读取文件权限失败:', err);
            res.end(JSON.stringify({ success: false, error: '读取文件权限失败' }));
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
            const find_index = listData.findIndex(u => u.nameword === user.nameword)
            if(find_index){
                res.end(listData[find_index])
            }
            else{
                res.writeHead(405);
                res.end('验证错误');
            }
        })
    })   
}