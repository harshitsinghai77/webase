const mongoose = require('mongoose');
const JOI = require('joi');
const PasswordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');

const validateRegister = (user) => {
    const schemaRegister = {
        name: JOI.string().min(5).max(50).required(),
        email: JOI.string().min(5).max(255).required().email({minDomainAtoms: 2}),
        password: new PasswordComplexity()
    }
    return JOI.validate(user, schemaRegister)
}

const validatePassword = (password) => {
    return JOI.validate({password}, {password: new PasswordComplexity()})
}

const validateLogin = (user) => {
    const schemaLogin = {
        email: JOI.string().min(5).max(255).required().email(),
        password: JOI.string().min(5).max(50).required()
    }
    return JOI.validate(user, schemaLogin)
}

const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }, 
    username: {
        type: String,
        maxlength: 30,
        default: ''
    },
    isVerified: { type: Boolean, default: false },
    designation: {
        type: String,
        enum: ['None','Student', 'Professional', 'Business', 'Freelance', 'good_for_nothing'],
        default: 'None'
    },
    aboutme: {
        type: String,
        maxlength: 500,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    gender: {
        type: String,
        enum: ['-','Male', 'Female', 'Other'],
        default: '-'
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
})

UserSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({name: this.name, id: this._id}, process.env.jwtSecretKey)
    return token;
}

const tokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 21600 }
});

const User = new mongoose.model('User', UserSchema);
const Token = new mongoose.model('Token', tokenSchema);

module.exports.validateRegister = validateRegister;
module.exports.validateLogin = validateLogin;
module.exports.validatePassword = validatePassword;
module.exports.Token = Token;
module.exports.User = User;

