import jwt from "jsonwebtoken";

export const genToken = (res, userID) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("access_token", token, {
    httpOnly: true,
  });
};
