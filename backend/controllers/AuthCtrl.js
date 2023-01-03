import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const auth = async (req, res) => {
  try {
    const userLogin = req.body.login;
    const password = req.body.password;

    const user = await UserModel.findOne( {login: userLogin} );

    if (!user || userLogin!== 'admin1' || password !== 'admin2') {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const isValidPass = await bcrypt.compare(password, user._doc.passwordWithHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'User with this login or password not found'
      })
    }

    const token = jwt.sign({
      _id: user._id
    }, 'secret-posts', {
      expiresIn: '24h',
    })

    const { passwordWithHash, login } = user._doc;

    res.status(200).json({
      login,
      token,
    });

  }
  catch(err) {
    console.log('Authorization request error', err);
    res.status(500).json(
      {
        success: false,
        message: 'Auth server error'
      }
    )
  }
}


export const getUserInfo = async (req, res) => {
  try {

    if (!req.userId) {
      return res.status(400).json({
        userData: {},
        message: 'No user id'
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        userData: {},
        message: 'No user with this id'
      });
    }

    const {passwordWithHash, ...userData} = user._doc;

    res.status(200).json({
      ...userData,
    });
  }
  catch (err) {
    console.log('Bad request for user getting', err);
    res.status(500).json(
      {
        success: false,
        message: 'Get user error, no access'
      }
    )
  }
}