

import { Router } from "express";
import { forgotPasswordController,loginController,logoutController,registerUserController,resetPassword,updateUserDetails,uploadAvatar,loginUserDetails,verifyEmailController,verifyForgotPasswordOtp } from "../controllers/user.controller.js";

import auth from "../middleware/auth.js"
import upload from "../middleware/multer.js";

const router= Router();

router.post('/register',registerUserController);
router.post('/verify-email',verifyEmailController);
router.post('/login',loginController);

router.get('/logout',auth,logoutController);  
  
router.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatar);
router.put('/update-user',auth,updateUserDetails);

router.put('/forgot-password',forgotPasswordController);
router.put('/verify-forgot-password-otp',verifyForgotPasswordOtp);
router.put('/reset-password',resetPassword);

router.post('/refrsh-token',refreshToken);

router.get('/user-details',auth,loginUserDetails);

export default router













