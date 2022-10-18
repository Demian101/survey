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
exports.getAllUsers = exports.registerUser = exports.loginUser = void 0;
var cloudinary_1 = __importDefault(require("cloudinary"));
var streamifier_1 = __importDefault(require("streamifier"));
var User_1 = __importDefault(require("../models/User"));
var generateToken_1 = require("../utils/generateToken");
var refreshTokens = [];
var loginUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, identifier, password, user, _b, accessToken, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                _a = req.body, identifier = _a.identifier, password = _a.password;
                return [4 /*yield*/, User_1.default.findOne({ email: identifier })];
            case 1:
                user = _c.sent();
                if (!user) {
                    res.status(404).json("User dosen't exists!");
                }
                _b = user;
                if (!_b) return [3 /*break*/, 3];
                return [4 /*yield*/, user.matchPassword(password)];
            case 2:
                _b = (_c.sent());
                _c.label = 3;
            case 3:
                /*
                  使用 matchPassword 对比 [前端] 传的 password 和 [数据库] 里的 password
                  matchPassword: bcrypt.compare(enteredPassword, this.password);
                   - `this.password` is the hashed password in the database, 是 UserSchema 实例的 password。
                 */
                if (_b) {
                    console.log('password matched!');
                    accessToken = (0, generateToken_1.generateAccessToken)(user._id);
                    // 响应给客户端 /login 的 response ：
                    res.json({
                        _id: user._id,
                        user: user.username,
                        email: user.email,
                        token: accessToken,
                    });
                }
                return [3 /*break*/, 5];
            case 4:
                err_1 = _c.sent();
                // res.status(500).json({message: "Something went wrong"})
                console.log(err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
var streamUpload = function (req) {
    return new Promise(function (resolve, reject) {
        var stream = cloudinary_1.default.v2.uploader.upload_stream({
            folder: "avatars"
        }, function (error, result) {
            if (result) {
                resolve(result);
            }
            else {
                reject(error);
            }
        });
        streamifier_1.default.createReadStream(req.file.buffer).pipe(stream);
    });
};
var registerUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, userExists, user, result, savedUser, accessToken, refreshToken, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                userExists = _b.sent();
                if (!userExists) return [3 /*break*/, 2];
                res.status(409).json({ message: "User already exists" });
                return [3 /*break*/, 6];
            case 2:
                user = new User_1.default({ username: username, email: email, password: password, });
                if (!(req === null || req === void 0 ? void 0 : req.file)) return [3 /*break*/, 4];
                return [4 /*yield*/, streamUpload(req)];
            case 3:
                result = _b.sent();
                user.avatar = result.secure_url;
                _b.label = 4;
            case 4: return [4 /*yield*/, user.save()];
            case 5:
                savedUser = _b.sent();
                accessToken = (0, generateToken_1.generateAccessToken)(savedUser._id);
                refreshToken = (0, generateToken_1.generateRefreshToken)(savedUser._id);
                /* 将 accessToken 响应给客户端，客户端将 accessToken 存储在 localStorage 中
                   之后客户端每次请求都会带上 accessToken, 服务端会验证 accessToken, 确认用户身份,
                   然后响应数据, 或者拒绝请求, 返回 401, 403 等错误码, 以及错误信息 */
                res.json({
                    _id: savedUser._id,
                    username: savedUser.username,
                    email: savedUser.email,
                    avatar: savedUser.avatar,
                    accessToken: accessToken,
                });
                _b.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_2 = _b.sent();
                res.status(500).json({ message: "Something went wrong" });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
var getAllUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_1.default.find()
                        .select("-password")];
            case 1:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.log('err', err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
