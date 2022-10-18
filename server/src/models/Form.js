"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var FormSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    institution: {
        type: String,
        // enum : ['NEW','STATUS'],
    },
    participation: { type: String, },
    num: { type: Number },
    employedInstitution: { type: String, },
    position: { type: String, },
    email: { type: String, required: true },
    tel: { type: String, },
    isNeedHotel: { type: String, },
    roomNum: { type: Number },
    checkInDate: { type: String, },
    note: { type: String, },
    image: { type: String, },
    knowchnl: { type: String, },
}, { collection: "forms", timestamps: true });
var Form = (0, mongoose_1.model)("User", FormSchema);
exports.default = Form;
