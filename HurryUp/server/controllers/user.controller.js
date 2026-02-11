import UserModel from "../models/user.model";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
import { update } from "lodash";
import { send } from "vite";

export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide email,name,password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.json({
        message: "Already register email",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new UserModel(payload);
    const save = await newUser.save();

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify email from HurryUp",
      html: verifyEmailTemplate({
        name,
        url: VerifyEmailUrl,
      }),
    });

    return res.json({
      message: "User register successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      err: true,
      success: false,
    });
  }
}

export async function verifyEmailController(req, res) {
  try {
    const { code } = req.body;

    const user = await UserModel.findOne({ _id: code });

    if (!user) {
      return res.status(400).json({
        message: "Invalid code",
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.updateOne(
      { _id: code },
      { verify_email: true },
    );

    return res.json({
      message: "Email verified successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      err: true,
      success: false,
    });
  }
}

//login conroller
export async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Provide email and password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        error: true,
        success: false,
      });
    }
    if (user.status !== "Active") {
      return res.status(400).json({
        message: `Your account is ${user.status}, Please contact to support team`,
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "Invalid email or password",
        error: true,
        success: false,
      });
    }

    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.json({
      message: "Login successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      err: true,
      success: false,
    });
  }
}

//logout controller
export async function logoutController(req, res) {
  try {
    const userid = req.userid;

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });

    return res.json({
      message: "Logout successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      err: true,
      success: false,
    });
  }
}

//upload user avatar
export async function uploadAvatar(req, res) {
  try {
    const userId = req.userId;
    const image = req.file;

    const upload = await uploadImageCloudinary(image);
    const updateUser = await uploadModel.findByIdAndUpdate(userId, {
      avatar: image.url,
    });

    return res.json({
      message: "Avatar uploaded successfully",
      success: true,
      error: false,
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      err: true,
      success: false,
    });
  }
}

//update user details
export async function updateUserDetails(req, res) {
  try {
    const userId = req.userId;
    const { name, email, mobile, password } = req.body;

    let hashPassword;

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    }

    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashPassword }),
      },
    );

    return res.json({
      message: "User details updated successfully",
      success: true,
      error: false,
      data: updateUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      err: true,
      success: false,
    });
  }
}

//forgot password
export async function forgotPasswordController(req, res) {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email",
        error: true,
        success: false,
      });
    }

    const otp = generateOtp();
    const expireTime = new Date() + 60 * 60 * 1000; //otp expire time 1 hour

    const update = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expireTime).toISOString(),
    });

    await sendEmail({
      sendTo: email,
      subject: "Forgot password OTP from HurryUp",
      html: forgotPasswordTemplate({
        name: user.name,
        otp: otp,
      }),
    });

    return res.json({
      message: "OTP sent to email successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      err: true,
      success: false,
    });
  }
}

//verify forgot password otp
export async function verifyForgotPasswordOtp(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Provide email and otp",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }
    const currTime = new Date().toISOString();

    if (user.forgot_password_expiry < currTime) {
      return res.status(400).json({
        message: "OTP expired",
        error: true,
        success: false,
      });
    }

    if (otp !== user.forgot_password_otp) {
      return res.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: "",
      forgot_password_expiry: "",
    });

    return res.json({
      message: "OTP verified successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      err: true,
      success: false,
    });
  }
}

//reset password
export async function resetPassword(req, res) {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Provide email,new password and confirm password",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "New password and confirm password must be same",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);

    update = await UserModel.findByIdAndUpdate(user._id, {
      password: hashPassword,
    });

    return res.json({
      message: "Password reset successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      err: true,
      success: false,
    });
  }
}

//refresh token controller
export async function refreshTokenController(req, res) {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];

    if (!refreshToken) {
      return res.status(401).json({
        message: "Invalid token",
        error: true,
        success: false,
      });
    }

    const verifyToken = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_TOKEN,
    );

    if (!verifyToken) {
      return res.status(401).json({
        message: "Invalid token",
        error: true,
        success: false,
      });
    }

    const userId = verifyToken?._id;

    const newAccessToken = await generatedAccessToken(userId);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", newAccessToken, cookieOptions);

    return res.json({
      message: "Access token refreshed successfully",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      err: true,
      success: false,
    });
  }
}

//login user details
export async function loginUserDetails(req, res) {
  try {
    const userId = req.userId;
    console.log("userId", userId);

    const user = await UserModel.findById(userId).select(
      "-password -refresh_token",
    );

    return res.json({
      message: "User details fetched successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      err: true,
      success: false,
    });
  }
}
