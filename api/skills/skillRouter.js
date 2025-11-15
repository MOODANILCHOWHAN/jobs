import {Router} from "express";
import skillController from "./skillController";

const skillRouter=Router();

skillRouter.post('/addSkill',skillController.addSkills);
skillRouter.post('/getSkill/:name',skillController.getSkills)
export default skillRouter;