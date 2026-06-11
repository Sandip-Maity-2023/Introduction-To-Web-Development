import express from "express";
import { sendEmailController } from "../controllers/portfolioController.js";

const router = express.Router();

//routes
router.post("/sendEmail",sendEmailController);

//export
//module.exports=router;

export default router;