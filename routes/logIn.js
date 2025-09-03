import { Router } from "express";
import adminLogInController from "../controller/adminLogController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const logInRouter = Router();

logInRouter.post("/login", adminLogInController);
logInRouter.get("/demoTest", verifyToken, (req, res) => {
  res.json({ message: "Token is valid. Good to go!" });
});

export default logInRouter;
