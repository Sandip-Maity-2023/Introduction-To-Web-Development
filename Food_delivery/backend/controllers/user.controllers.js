import User from "../models/user.model.js";

export const getCurrentUser = async (res, req) => {
  try {
    const userId = req.userId;
    if (!userId)
      return res.status(400).json({ message: "userId is not found" });

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(400).json({ message: "user is not found" });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: `get current user error ${err}` });
  }
};
