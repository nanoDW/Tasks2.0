const Joi = require("joi");

const validateTodo = todo => {
  const schema = {
    author: Joi.string()
      .min(3)
      .max(25)
      .required()
      .trim(),
    user: Joi.string()
      .min(3)
      .max(25)
      .required()
      .trim(),
    description: Joi.string()
      .min(2)
      .max(160)
      .required(),
    priority: Joi.number()
      .min(1)
      .max(5)
      .required(),
    deadline: Joi.string()
      .min(10)
      .max(30),
    done: Joi.boolean().required()
  };
  return Joi.validate(todo, schema);
};

const validateUser = user => {
  const schema = {
    nick: Joi.string()
      .min(3)
      .max(25)
      .required()
      .trim(),
    password: Joi.string()
      .min(8)
      .max(30)
      .required()
      .trim(),
    email: Joi.string()
      .min(8)
      .max(40)
      .email({ minDomainAtoms: 2 })
      .required()
      .trim(),
    accountCreated: Joi.string()
      .min(10)
      .max(30)
  };
  return Joi.validate(user, schema);
};

const validatePasswordAndEmail = data => {
  const schema = {
    password: Joi.string()
      .min(8)
      .max(30)
      .trim(),
    email: Joi.string()
      .min(8)
      .max(40)
      .email({ minDomainAtoms: 2 })
      .trim()
  };
  return Joi.validate(data, schema);
};

const validateLogAndPass = data => {
  const schema = {
    nick: Joi.string()
      .min(3)
      .max(15)
      .alphanum()
      .required()
      .trim(),
    password: Joi.string()
      .min(8)
      .max(20)
      .required()
      .trim()
  };
  return Joi.validate(data, schema);
};

module.exports = {
  validateTodo,
  validateUser,
  validatePasswordAndEmail,
  validateLogAndPass
};
