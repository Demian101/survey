import mongoose, { Schema, Document, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IForm extends Document {
  name: string;            // 姓名
  institution: string;     // 领域？ [高校、研究机构 /  企业  /  投资机构] 
  participation: string;   // 参会形式 [online、offline] 
  num: Number;             // 随行人数？？？
  employedInstitution: string;  // 就职单位
  position: string;        // 职务
  email: string;           // 邮箱
  tel:  string;            // 手机号
  isNeedHotel:  string;    // 是否需要预定会议酒店
  roomNum:  Number;        // 房间数量
  checkInDate: string;     // 入住日期[11.6 11.7]
  note: string;            // 备注信息
  image: string;           // 名片
  knowchnl: string;        // 获知渠道
}

const FormSchema: Schema = new Schema(
  {
    name: {type: String, required: true},
    institution: { 
      type: String, 
      // enum : ['NEW','STATUS'],
    },
    participation: { type: String, },
    num: { type: Number},
    employedInstitution: { type: String, },
    position: { type: String, },
    email: { type: String, required: true},    // 手机号或邮箱
    tel: { type: String, },
    isNeedHotel: {type: String, },
    roomNum:  { type: Number},
    checkInDate: {type: String, },
    note: {type: String, },
    image: {type: String, },
    knowchnl: {type: String, },
    
  },
  { collection: "forms", timestamps: true }
);

const Form = model<IForm>("User", FormSchema);
export default Form;