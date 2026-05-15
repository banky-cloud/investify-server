import  {Router} from "express"
import {createPlan, editPlan, editUser, forgotPassword, getPlans, getSiteStats, getWallets, login, loginWithToken, register, resetPassword, sendNotifications, setWallets, verifyEmail} from "./controllers.js"
import { verifyToken, verifyAdmin } from "./verify.js";



const userRouter= Router()

userRouter.post("/register", register);
userRouter.get("/verify/:id", verifyEmail)
userRouter.post("/login", login);
userRouter.post("/token", verifyToken, loginWithToken);
userRouter.post("/getAllStats", verifyAdmin, getSiteStats);
userRouter.post("/edituser/:id", verifyAdmin, editUser);
userRouter.post("/resetpassword/:id",  resetPassword);
userRouter.post("/notify/:id", verifyAdmin, sendNotifications);
userRouter.post("/createPlan", verifyAdmin, createPlan);
userRouter.get("/getplans", getPlans)
userRouter.post("/forgot-password",forgotPassword)
userRouter.post("/editplan/:id",verifyAdmin, editPlan)
userRouter.post("/setwallets",verifyAdmin, setWallets)
userRouter.get("/getwallets", getWallets)



export default userRouter