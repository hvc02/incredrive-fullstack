const Joi = require("@hapi/joi");

// Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
    phoneNumber: Joi.string()
      .trim()
      .regex(/^[0-9]{10}$/)
      .required()
      .label("Phone Number"),
  });

  return schema.validate(data);
};

module.exports = registerValidation;
