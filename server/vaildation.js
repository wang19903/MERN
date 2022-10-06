const Joi = require("joi");
//describe your data using a simple, intuitive, and readable language.

//register vaildation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(8).max(255).required(),
    role: Joi.string().required().valid("student", "instructor")
  });

  return schema.validate(data);
};

const loginVaildation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(8).max(255).required()
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginVaildation = loginVaildation;
