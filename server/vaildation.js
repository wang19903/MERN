//驗證要寫進資料庫的資料
const Joi = require("joi");

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

const courseValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(6).max(50).required(),
    description: Joi.string().min(6).max(50).required(),
    price: Joi.number().min(10).max(9999).required()
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginVaildation = loginVaildation;
module.exports.courseValidation = courseValidation;
