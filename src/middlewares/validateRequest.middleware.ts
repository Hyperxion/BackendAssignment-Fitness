import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

/**
 * Middleware to validate request data using Joi schema.
 *
 * @param schema - The Joi schema to validate against.
 * @param source - The source of the data (e.g., 'body', 'query', 'params').
 */
export const validateRequest = (
  schema: Joi.ObjectSchema,
  source: 'body' | 'query' | 'params' = 'body',
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false, // Show all errors at once
      allowUnknown: true,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.details.map((detail) => detail.message),
      });
    }

    // Replace the original data with the validated data
    req[source] = value;
    next();
  };
};
