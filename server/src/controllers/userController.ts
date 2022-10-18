import cloudinary from "cloudinary";
import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import streamifier from "streamifier";
import User from "../models/User";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken";

let refreshTokens: Array<object | string> = [];

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { identifier, password } = req.body;
    const user = await User.findOne({ email: identifier });
    if (!user){ res.status(404).json("User dosen't exists!")}
    /*
      使用 matchPassword 对比 [前端] 传的 password 和 [数据库] 里的 password
      matchPassword: bcrypt.compare(enteredPassword, this.password);
       - `this.password` is the hashed password in the database, 是 UserSchema 实例的 password。      
     */
    if (user && (await user.matchPassword(password))) { 
      console.log('password matched!')
      /* generateAccessToken :
          - 将用户的信息加密成 JWT 字符串，响应给客户端
          - secret 密钥 (ACCESS_TOKEN) 是一个自定义的字符串，用于加密  */
      const accessToken = generateAccessToken(user._id);
      // 响应给客户端 /login 的 response ：
      res.json({
        _id: user._id,
        user: user.username,
        email: user.email,
        token: accessToken,
      });
    }
  }
  catch(err){
    // res.status(500).json({message: "Something went wrong"})
    console.log(err)
  }
};

let streamUpload = (req: any) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.v2.uploader.upload_stream( {
      folder: "avatars"
    } ,(error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
};

const registerUser = async ( req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password,  } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {    // if user exists
      res.status(409).json({ message: "User already exists" });
    } else {
      const user = new User({ username, email, password, });
      if(req?.file) {    // req 不一定有 .file 属性， 所以用 ? 防止报错；
        const result: any = await streamUpload(req);   // streamUpload 是 Promise, 上面定义了
        user.avatar = result.secure_url;
      }

      const savedUser = await user.save();
      // console.log("Run user.save()", savedUser);
      const accessToken = generateAccessToken(savedUser._id);
      const refreshToken = generateRefreshToken(savedUser._id);

      /* 将 accessToken 响应给客户端，客户端将 accessToken 存储在 localStorage 中
         之后客户端每次请求都会带上 accessToken, 服务端会验证 accessToken, 确认用户身份, 
         然后响应数据, 或者拒绝请求, 返回 401, 403 等错误码, 以及错误信息 */
      res.json({
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        avatar: savedUser.avatar,
        accessToken,
      });
    }
  }
  catch(err){
    res.status(500).json({message: "Something went wrong"})
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try{
    // dont display current user in list, 不包括当前用户，因为当前用户已经在前端显示了
    // 字段中也不包括密码，不需要密码。
    const users = await User.find()
      .select("-password");
    res.json(users);
  } catch(err){
    console.log('err', err)
    //res.status(500).json( {message: "Something went wrong"} )
  }
};

export {
  loginUser,
  registerUser,
  getAllUsers
};