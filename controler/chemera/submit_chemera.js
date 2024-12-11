const {access,constants,readFile,writeFile}=require('fs')
const {join,relative,extname}=require('path')

exports.submits = (req, res) => {
    upload.single('image')(req, res, (err) =>{

        if (!req.file.originalname) {
            return res.status(400).send('File does not have an original file name.');
        }

        // req.file.buffer 包含图片的二进制数据
        // console.log(req.file) 验证文件是否传输成功
        const fileBuffer = req.file.buffer;
        const date=Date.now()
        const fileExtension = extname(req.file.originalname);
        // console.log(fileExtension) 验证文件后缀名
        const newFileName = `${date}_${req.file.originalname}`;
        // const finalFileName = `${newFileName}${fileExtension}`;
        //使用原文件名和时间戳进行命名

        const chemera_user = {
            nameword:req.body.nameword,
            chemera_comment:req.body.chemera_comment,
            pic_path:''
        };

        chemera_user.pic_path=newFileName
        // console.log(picHash)//hash值是否存在
        //将图片数据存储为hash值（但这里如果没有图片传入不知道会发生什么）

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        
        // 这里可以添加将用户数据保存到数据库的代码(将user装入数据库或者保存为json格式的数据)
        console.log(req.body.nameword)
        const filePath = join(__dirname,'..','..','data','comment_pic', newFileName);
        // console.log(filePath) 验证图片文件名是否正确

        const listDataPath=join(__dirname,'..','..','data','chamera_data.json');
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
                //通过find去通过学号找到数据，如果找到则修改数据
                writeFile(filePath, fileBuffer, (err) => {
                    if (err) {
                    return res.status(500).send('存储评论数据失败');
                    }
                });
                listData.unshift(chemera_user)
                writeFile(listDataPath,JSON.stringify(listData,null,2),'utf-8',err=>{
                    res.end(JSON.stringify({success:true,fields},null,2));//写入结束响应
                    console.log(`上传:${JSON.stringify(fields)}`);
                });//回写json数据
            });
        });//读取json数据信息

        console.log(`学号信息:${chemera_user.nameword}`)
        res.status(201).json({ message: 'User created successfully' });
    })
};