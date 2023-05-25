import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from "../models/userModel.js"
import { userLoginValidator } from "../validators/userValidator.js"
import { BadUserRequestError, NotFoundError } from "../error/error.js"

export default class UserController {
    static async loginUser(req, res) {
    const { error } = loginUserValidator.validate(req.body)
    if (error) throw error
    if (!req.body?.email && !req.body?.password) throw new BadUserRequestError("Please provide a username and email before you can login.")
    const user = await User.findOne({
      $or: [
        {
          email: req.body?.email,
        },{
          username: req.body?.password,
        }
      ]
    })
    if(!user) throw new BadUserRequestError(" email, password does not exist")
    const hash = bcrypt.compareSync(req.body.password, user.password)
    if(!hash) throw new BadUserRequestError("username, email or password is wrong!")
    res.status(200).json({
      message: "User login successfully",
      status: "Success",
    })
  }
};