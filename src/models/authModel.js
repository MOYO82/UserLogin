const user = require("../models/userModel.js")
const { BadRequest, UnauthenticatedError } = require("../error/error.js");

const register = async (req, res) => {
const {username, email, password} = req.body
if(!username || !email || !password){
    throw new BadRequest('Please provide username, email and paaword')
}

const User = await user.create({...req.body});
const token = user.createJWT();
res.status(statusCodes.CREATED).json({ user: {username: user.username }, token});
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        throw new BadRequest('Please provide email and password');
    }

    const user = await user.findOne({ email});
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials'); 
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials'); 
    }

    const token = user.createJWT();
    res.status(statusCodes.OK).json({ user: {username: user.username}, token });
};

module.exports = {
    register,
    login,
};
