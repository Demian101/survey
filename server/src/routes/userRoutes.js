"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var authenticate_1 = require("../middlewares/authenticate");
// User Routes
var router = (0, express_1.Router)();
router.post("/login", userController_1.loginUser);
router.post("/register", userController_1.registerUser);
router.route("all").get(authenticate_1.authGuard, userController_1.getAllUsers);
// 同一个路由 url，请求方法不同 , 对应的处理函数也不同 ;
/* router.route("/refresh").post(refreshAuth); */
// router.route("/:id").get(getUserById);
// router.route("/:id/follow").get(authGuard, followUser);
// router.route("/:id/unfollow").get(authGuard, unfollowUser);
exports.default = router;
