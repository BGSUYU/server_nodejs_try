const {access,constants,readFile,writeFile}=require('fs')
const {join,relative,extname}=require('path')

exports.gets = (req, res) => {
    const nameword=req.body.nameword
    const listDataPath=join(__dirname,'..','..','data','car_data.json');
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
            const find_name = listData.filter(u => u.nameword === nameword);
            const find_index_1=find_name.findIndex(u=> u.car_id === '1')
            const find_index_2=find_name.findIndex(u=> u.car_id === '2')
            if(find_name){
                res.end(find_name[find_index_1],find_name[find_index_2]);//需要验证
            }
            else{
                res.writeHead(405);
                res.end('验证错误');
            }
        })
    }) 
}