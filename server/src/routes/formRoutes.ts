import { Router } from "express";
import { postInfo, getInfo, deleteForm, modifyNote } from "../controllers/formController";
import { authGuard } from "../middlewares/authenticate";

const router = Router();

// 同一个路由 url，请求方法不同 , 对应的处理函数也不同 ;
router
  .route("/")   // 39.105.169.246/form...
  .post(postInfo)
  .get(authGuard, getInfo)  // 登录后才能获取 form 数据。

router.route('/:id').delete(authGuard, deleteForm);
router.route('/:id/note').put(authGuard, modifyNote);


export default router;