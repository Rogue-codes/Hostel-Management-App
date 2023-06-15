import Admin from "../models/adminModel.js";
import { genToken } from "../utils/genToken.js";

export const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "name, email and password are required",
      });
    }

    const alreadyExistingUser = await Admin.findOne({email})
    if(alreadyExistingUser) {
        res.status(400).json({
            status: "failed",
            message: "User already exists"
        })
    }

    const admin = await Admin.create({
      name,
      email,
      password,
    });

    genToken(res, admin._id)

    res.status(201).json({
      status: "success",
      message: "Account created successfully",
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({
        status: "failed",
        message: "Both email and password are required",
      });
      return;
    }
    const admin = await Admin.findOne({ email });
    if (admin && (await admin.matchPassword(password))) {
      genToken(res, admin._id);
      res.status(200).json({
        status: "success",
        message: "login successfull",
        data: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
        },
      });
    }
    res.status(401).json({
      status: "failed",
      message: "login failed invalid credentials",
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: error.message,
    });
  }
};

// Admin logout
export const logout = (req, res) => {
  res.cookie("access_token", "");

  res.status(200).json({
    status: "success",
    message: "User logged out",
  });
};
