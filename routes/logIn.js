import { Router } from "express";
import adminLogInController from "../controller/adminLogController";
import { verifyToken } from "../middleware/verifyToken";
const router = Router()

router.post('/logIn',adminLogInController);
router.get('/demoTest',verifyToken,(req,res)=>{
    res.json({message:'tokn is there good to go.'})
})

export default router;