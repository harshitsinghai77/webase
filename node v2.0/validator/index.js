const JOI = require("joi");
const passwordComplexity = require("joi-password-complexity");

const ValidateRegister = (user) => {
  const validateRegisterSchema = JOI.object({
    name: JOI.string().min(5).max(50).required(),
    email: JOI.string().min(5).max(255).required().email(),
    password: passwordComplexity(),
  });
  return validateRegisterSchema.validate(user);
};

const ValidatePassword = (password) => {
  const validatePasswordSchema = JOI.object({
    password: passwordComplexity(),
  });
  return validatePasswordSchema.validate({ password });
};

const ValidateLogin = (user) => {
  const validateLoginSchema = JOI.object({
    email: JOI.string().min(5).max(255).required().email(),
    password: JOI.string().min(5).max(50).required(),
  });
  return validateLoginSchema.validate(user);
};

module.exports = {
  ValidateRegister,
  ValidatePassword,
  ValidateLogin,
};
