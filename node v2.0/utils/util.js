const bycrypt = require("bcryptjs");

const response = (success, message, data) => {
  return {
    success,
    message,
    data,
  };
};

const generateSalt = async (userPassword) => {
  const salt = await bycrypt.genSalt(10);
  const bycrypt_password = await bycrypt.hash(userPassword, salt);

  return bycrypt_password;
};

module.exports = {
  response,
  generateSalt,
};
