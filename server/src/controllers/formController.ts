import { NextFunction, Request, Response } from "express";
import { ElementFlags } from "typescript";
import Form, { IForm } from "../models/Form";
import { appendFileSync } from 'node:fs';
require('dotenv').config()
import { ServerResponse } from "http";

const multer = require('multer'); // multer是一个node.js文件上传中间件,有了他才能读取到文件
let co = require('co'); // co 模块，它基于 ES6 的 generator 和 yield ，让我们能用同步的形式编写异步代码。
let OSS = require('ali-oss'); // oss上传所需模块
let fs = require('fs'); // fs可以对文件进行操作

let client = new OSS({ // 链接oss 这里面的配置最好是放在单独的文件，引入如果要上传的git的话账号密码最好不要传到git
  region: process.env.Region, // oss地区，只需要把 hangzhou 改为相应地区即可，可以在oss上随便找一个文件链接就知道是哪个地区的了
  accessKeyId: process.env.AccessKeyID, // oss秘钥
  accessKeySecret: process.env.AccessKeySecret, // oss秘钥的密码
  bucket: process.env.Bucket, // 存储库名称
});

let ali_oss = {
  endPoint: 'imagesoda.oss-cn-beijing.aliyuncs.com',   // 自己的oss链接名，可以在oss上随便找一个文件链接就知道了
  bucket: 'imagesoda'
}

// 文件暂存本地文件夹-自动生成./tmp/
let upload = multer({
  dest: './public/'
});

// 写入文件，会完全替换之前 JSON 文件中的内容
const writeData = (form: any) => {
  const datapath = "/home/soda/data.json"
  try {
    const data = JSON.stringify(form);
    appendFileSync(datapath, data, 'utf8');
    console.log('The "data to append" was appended to file!');
  } catch (err) {
    /* Handle the error */
  }
}



const postInfo = async (req: Request, res: Response, next: NextFunction) => {
  console.log('req.files', req.files)
  console.log('process.env.Region', process.env.Region)
  console.log('postInfo - req.body: ', req.body)

  try {
    if (!req.body.name || !req.body.email) {
      res.status(500).json({ "Message": "Pls write name or email!" })
    } else {

      const {
        name,
        employedInstitution,
        position,
        email,
        tel,
        institution,
        participation,
        num,
        isNeedHotel,
        roomNum,
        checkInDate,
        note,
        knowchnl
      } = req.body;

      // 图片上传部分/ 文件路径
      const files = req.files as Express.Multer.File[];
      const myFirstfile = files[0];
      console.log('myFirstfile', myFirstfile)
      // 文件类型
      let temp = myFirstfile.originalname.split('.');
      let filePath = myFirstfile.path
      let fileType = ''
      if (temp) { fileType = temp[temp?.length - 1]; }
      let lastName = '.' + fileType;

      // 构建图片名
      let fileName = Date.now() + lastName;

      console.log('fileType', fileType)  // jpg
      console.log('fileName', fileName)  // 1666022143598.jpg
      let localFile = './' + fileName;

      // 图片重命名
      fs.rename(filePath, fileName, (err: any) => {
        if (err) {
          res.json({
            code: 403,
            message: '文件写入失败(重命名失败)'
          })
        } else {
          // let localFile = './' + fileName;

          // 上传到指定目录（/imgs/2021-11-27/1637994928002.jpg）
          // 将文件上传到指定目录,需要输入目录名称。
          // 若输入的目录不存在,OSS将自动创建对应的文件目录并将文件上传到该目录中。
          let key = fileName;
          console.log('key', key)

          // 阿里云 上传文件
          co(function* () {
            client.useBucket(ali_oss.bucket);
            let result: ServerResponse = yield client.put(key, localFile);
            // 上传成功返回图片路径域名-域名修改成自己绑定到oss的
            console.log('result', result)
            // let imageSrc = result.requestUrls;
            // 上传之后删除本地文件
            fs.unlinkSync(localFile);

          }).catch(function (err: any) {
            // 上传之后删除本地文件
            fs.unlinkSync(localFile);
          })
        }
      })


      // console.log('user\'s image', image)
      const formData = {
        name,
        employedInstitution,
        position,
        email,
        tel,
        institution,
        participation,
        num,
        isNeedHotel,
        roomNum,
        checkInDate: checkInDate?.toString(),
        note,
        knowchnl,
        image: `http://imagesoda.oss-cn-beijing.aliyuncs.com/${fileName}`
      }
      const form_: IForm = new Form(formData);
      const savedForm = await form_.save();

      // writeData(formData);
      res.json(savedForm)
    }
  }
  catch (err) {
    console.log("error: ------- ", err);
    // res.status(500).json({ message: "Something went wrong" })
  }
};

const getInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Controller getInfo...');
    const forms = await Form.find()
      .sort({ createdAt: -1 })
      .limit(5)

    res.json(forms);
  } catch (err) {
    //  console.log("error: ------- ", err);
    res.status(500).json({ message: "Something went wrong" })
  }
};


const deleteForm = async (req: Request, res: Response) => {
  const formId: string = req.params.id;
  console.log('req.params.id')
  const form = await Form.findOne({ _id: formId });
  try {
    if (form) {
      const deleteFormById = await Form.findByIdAndDelete(formId);
      res.status(200).json({ message: "Form deleted successfully" });
    }
  }
  catch (err) {
    // console.log(err)
    res.status(500).send({ message: "Something goes wrong" });
  }
};

const modifyNote = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const { text } = req.body;
  console.log('modifyNote - req.params.id', req.params.id)
  try {
    const form = await Form.findOne({ _id: id });
    if (form) {
      const modiFormById = await Form.findByIdAndUpdate(id, { note: text });
      if (modiFormById) {
        res.status(200).json(modiFormById);
      } else { res.status(500).send({ message: "Something goes wrong" }); }
    }
  }
  catch (err) {
    // console.log(err)
    res.status(500).send({ message: "Something goes wrong" });
  }
};

export {
  postInfo,
  getInfo,
  deleteForm,
  modifyNote,
};
