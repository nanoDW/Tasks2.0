const Joi = require("joi");

const validateTodo = todo => {
  const schema = {
    author: Joi.string()
      .min(3)
      .max(25)
      .required(),
    user: Joi.string()
      .min(3)
      .max(25)
      .required(),
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
      .required(),
    password: Joi.string()
      .min(8)
      .max(30)
      .required(),
    email: Joi.string()
      .min(8)
      .max(40)
      .email({ minDomainAtoms: 2 })
      .required(),
    accountCreated: Joi.string()
      .min(10)
      .max(30)
  };
  return Joi.validate(user, schema);
};

module.exports = { validateTodo, validateUser };
