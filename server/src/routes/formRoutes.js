"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var formController_1 = require("../controllers/formController");
var authenticate_1 = require("../middlewares/authenticate");
var router = (0, express_1.Router)();
// 同一个路由 url，请求方法不同 , 对应的处理函数也不同 ;
router
    .route("/") // 39.105.169.246/form...
    .post(formController_1.postInfo)
    .get(authenticate_1.authGuard, formController_1.getInfo); // 登录后才能获取 form 数据。
router.route('/:id').delete(authenticate_1.authGuard, formController_1.deleteForm);
router.route('/:id/note').put(authenticate_1.authGuard, formController_1.modifyNote);
exports.default = router;
