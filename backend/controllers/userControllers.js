import Admin from "../models/adminModel.js";

export const getUserProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id).select("-password");
    if (admin) {
      res.status(200).json({
        status: "success",
        message: "admin info retrieved",
        data: { admin },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

// update profile
export const updateUserProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    const updatedUser = await Admin.findByIdAndUpdate(
      req.user._id,
      { name: name, email: email },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Admin profile updated",
      data: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: error.message,
    });
  }
};


