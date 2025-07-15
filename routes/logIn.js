import { Router } from "express";
import adminLogInController from "../controller/adminLogController";
const router = Router()

router.get('/logIn',adminLogInController)