import Joi from 'joi'

export const createUserValidator = Joi.object({
    username:Joi.string().optional(),
    email:Joi.string().optional(),
    password: Joi.string().required()
  }).strict()

export const loginUserValidator = Joi.object({
  username:Joi.string().optional(),
  email:Joi.string().optional(),
  password: Joi.string().required()
}).strict()