import UserModel from "../models/User.js";
import bcrypt from "bcrypt";

export const setAdmin = async (req, res, next) => {
  try {

    const isUser = await UserModel.countDocuments({}).exec() > 0;

    if (!isUser) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash('admin2', salt);

      const doc = new UserModel({
        login: 'admin1',
        passwordWithHash: hash,
      });

      await doc.save();
    }

    next();

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Can not register',
      error: err
    });
  }
}