import Joi from 'joi';

export const filterValidationSchema = Joi.object({
  search: Joi.string().min(3).optional().label('Search'),
  difficulty: Joi.string()
    .valid('EASY', 'MEDIUM', 'HARD')
    .optional()
    .label('Difficulty'),
  programId: Joi.string().guid().optional().label('Program ID'),
  role: Joi.string().valid('ADMIN', 'USER').optional().label('Role'),
  age: Joi.number().integer().min(1).optional().label('Age'),
  page: Joi.number().integer().min(1).default(1).label('Page'),
  limit: Joi.number().integer().min(1).default(10).label('Limit'),
});
