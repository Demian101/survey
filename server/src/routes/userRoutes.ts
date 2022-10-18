import { Router } from "express";
import { loginUser, registerUser, getAllUsers } from "../controllers/userController";
import { authGuard } from "../middlewares/authenticate";
// User Routes
const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.route("all").get(authGuard, getAllUsers);

// 同一个路由 url，请求方法不同 , 对应的处理函数也不同 ;

/* router.route("/refresh").post(refreshAuth); */
// router.route("/:id").get(getUserById);
// router.route("/:id/follow").get(authGuard, followUser);
// router.route("/:id/unfollow").get(authGuard, unfollowUser);

export default router;
