import Joi from 'joi';

export const userValidationSchema = Joi.object({
  name: Joi.string().required().label('Name'),
  surname: Joi.string().required().label('Surname'),
  nickName: Joi.string().required().label('Nickname'),
  email: Joi.string().email().required().label('Email'),
  password: Joi.string()
    .min(6)
    .regex(/[!@#$%^&*(),.?":{}|<>]/)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long.',
      'string.pattern.base':
        'Password must contain at least one special character.',
    }),
  age: Joi.number().integer().min(1).required().label('Age'),
  role: Joi.string().valid('ADMIN', 'USER').default('USER').label('Role'),
});
