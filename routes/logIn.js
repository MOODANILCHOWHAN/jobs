import { Router } from "express";
import adminLogInController from "../controller/adminLogController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const logInRouter = Router()

logInRouter.post('/logIn',adminLogInController);
logInRouter.get('/demoTest',verifyToken,(req,res)=>{
    res.json({message:'tokn is there good to go.'})
})

export default logInRouter;