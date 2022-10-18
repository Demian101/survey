"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyNote = exports.deleteForm = exports.getInfo = exports.postInfo = void 0;
var Form_1 = __importDefault(require("../models/Form"));
var node_fs_1 = require("node:fs");
require('dotenv').config();
var multer = require('multer'); // multer是一个node.js文件上传中间件,有了他才能读取到文件
var co = require('co'); // co 模块，它基于 ES6 的 generator 和 yield ，让我们能用同步的形式编写异步代码。
var OSS = require('ali-oss'); // oss上传所需模块
var fs = require('fs'); // fs可以对文件进行操作
var client = new OSS({
    region: process.env.Region,
    accessKeyId: process.env.AccessKeyID,
    accessKeySecret: process.env.AccessKeySecret,
    bucket: process.env.Bucket, // 存储库名称
});
var ali_oss = {
    endPoint: 'imagesoda.oss-cn-beijing.aliyuncs.com',
    bucket: 'imagesoda'
};
// 文件暂存本地文件夹-自动生成./tmp/
var upload = multer({
    dest: './public/'
});
// 写入文件，会完全替换之前 JSON 文件中的内容
var writeData = function (form) {
    var datapath = "/home/soda/data.json";
    try {
        var data = JSON.stringify(form);
        (0, node_fs_1.appendFileSync)(datapath, data, 'utf8');
        console.log('The "data to append" was appended to file!');
    }
    catch (err) {
        /* Handle the error */
    }
};
var postInfo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, employedInstitution, position, email, tel, institution, participation, num, isNeedHotel, roomNum, checkInDate, note, knowchnl, files, myFirstfile, temp, filePath, fileType, lastName, fileName_1, localFile_1, formData, form_, savedForm, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log('req.files', req.files);
                console.log('postInfo - req.body: ', req.body);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                if (!(!req.body.name || !req.body.email)) return [3 /*break*/, 2];
                res.status(500).json({ "Message": "Pls write name or email!" });
                return [3 /*break*/, 4];
            case 2:
                _a = req.body, name_1 = _a.name, employedInstitution = _a.employedInstitution, position = _a.position, email = _a.email, tel = _a.tel, institution = _a.institution, participation = _a.participation, num = _a.num, isNeedHotel = _a.isNeedHotel, roomNum = _a.roomNum, checkInDate = _a.checkInDate, note = _a.note, knowchnl = _a.knowchnl;
                files = req.files;
                myFirstfile = files[0];
                console.log('myFirstfile', myFirstfile);
                temp = myFirstfile.originalname.split('.');
                filePath = myFirstfile.path;
                fileType = '';
                if (temp) {
                    fileType = temp[(temp === null || temp === void 0 ? void 0 : temp.length) - 1];
                }
                lastName = '.' + fileType;
                fileName_1 = Date.now() + lastName;
                console.log('fileType', fileType); // jpg
                console.log('fileName', fileName_1); // 1666022143598.jpg
                localFile_1 = './' + fileName_1;
                // 图片重命名
                fs.rename(filePath, fileName_1, function (err) {
                    if (err) {
                        res.json({
                            code: 403,
                            message: '文件写入失败(重命名失败)'
                        });
                    }
                    else {
                        // let localFile = './' + fileName;
                        // 上传到指定目录（/imgs/2021-11-27/1637994928002.jpg）
                        // 将文件上传到指定目录,需要输入目录名称。
                        // 若输入的目录不存在,OSS将自动创建对应的文件目录并将文件上传到该目录中。
                        var key_1 = fileName_1;
                        console.log('key', key_1);
                        // 阿里云 上传文件
                        co(function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        client.useBucket(ali_oss.bucket);
                                        return [4 /*yield*/, client.put(key_1, localFile_1)];
                                    case 1:
                                        result = _a.sent();
                                        // 上传成功返回图片路径域名-域名修改成自己绑定到oss的
                                        console.log('result', result);
                                        // let imageSrc = result.requestUrls;
                                        // 上传之后删除本地文件
                                        fs.unlinkSync(localFile_1);
                                        return [2 /*return*/];
                                }
                            });
                        }).catch(function (err) {
                            // 上传之后删除本地文件
                            fs.unlinkSync(localFile_1);
                        });
                    }
                });
                formData = {
                    name: name_1,
                    employedInstitution: employedInstitution,
                    position: position,
                    email: email,
                    tel: tel,
                    institution: institution,
                    participation: participation,
                    num: num,
                    isNeedHotel: isNeedHotel,
                    roomNum: roomNum,
                    checkInDate: checkInDate === null || checkInDate === void 0 ? void 0 : checkInDate.toString(),
                    note: note,
                    knowchnl: knowchnl,
                    image: "http://imagesoda.oss-cn-beijing.aliyuncs.com/".concat(fileName_1)
                };
                form_ = new Form_1.default(formData);
                return [4 /*yield*/, form_.save()];
            case 3:
                savedForm = _b.sent();
                // writeData(formData);
                res.json(savedForm);
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                console.log("error: ------- ", err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.postInfo = postInfo;
var getInfo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var forms, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log('Controller getInfo...');
                return [4 /*yield*/, Form_1.default.find()
                        .sort({ createdAt: -1 })
                        .limit(5)];
            case 1:
                forms = _a.sent();
                res.json(forms);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                //  console.log("error: ------- ", err);
                res.status(500).json({ message: "Something went wrong" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getInfo = getInfo;
var deleteForm = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var formId, form, deleteFormById, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                formId = req.params.id;
                console.log('req.params.id');
                return [4 /*yield*/, Form_1.default.findOne({ _id: formId })];
            case 1:
                form = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                if (!form) return [3 /*break*/, 4];
                return [4 /*yield*/, Form_1.default.findByIdAndDelete(formId)];
            case 3:
                deleteFormById = _a.sent();
                res.status(200).json({ message: "Form deleted successfully" });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_3 = _a.sent();
                // console.log(err)
                res.status(500).send({ message: "Something goes wrong" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteForm = deleteForm;
var modifyNote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, text, form, modiFormById, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                text = req.body.text;
                console.log('modifyNote - req.params.id', req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, Form_1.default.findOne({ _id: id })];
            case 2:
                form = _a.sent();
                if (!form) return [3 /*break*/, 4];
                return [4 /*yield*/, Form_1.default.findByIdAndUpdate(id, { note: text })];
            case 3:
                modiFormById = _a.sent();
                if (modiFormById) {
                    res.status(200).json(modiFormById);
                }
                else {
                    res.status(500).send({ message: "Something goes wrong" });
                }
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_4 = _a.sent();
                // console.log(err)
                res.status(500).send({ message: "Something goes wrong" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.modifyNote = modifyNote;
