const Joi = require('joi');

const validateTodo = Joi.object().keys({
    author: Joi.string().min(3).max(25).required(),
    user: Joi.string().min(3).max(25).required(),
    description: Joi.string().min(2).max(160).required(),
    priority: Joi.number().min(1).max(5).required(),
    deadline: Joi.string().min(10).max(30),
    done: Joi.boolean().required()
});

const validateUser = Joi.object().keys({
    nick: Joi.string().min(3).max(25).required(),
    password: Joi.string().min(8).max(30).required(),
    email: Joi.string().min(8).max(40).email({ minDomainAtoms: 2 }),
    accountCreated: Joi.string().min(10).max(30)
})

module.exports = { validateTodo, validateUser }