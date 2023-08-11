import { Router } from "express";
import { userController } from "../controller/index.controller";
import upload  from "../config/multer";
import validateUser from "../middleware/auth";



const router = Router();

router.get("/ig/:username", userController.findUserbyIGUsername)

router.post("/singup", userController.singUp);

router.post("/singup/admin", userController.singUpAdmin);

router.post("/singin", userController.singin)

router.get("/:amount/:page", userController.getUsers)

router.get("/:id/test", userController.getUserById)

router.get("/all", userController.getAll)

router.put("/delete_user", userController.deleteUsers)

router.post('/avatar', validateUser, upload.single('image'), userController.postImage);

export { router as userRouter }