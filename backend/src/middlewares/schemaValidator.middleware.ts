import { NextFunction, Request, Response } from 'express';

import { AnySchema } from 'yup';
import { GlobalError } from '../errors';

const schemaValidator =
  (shape: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const data = { ...req.body };

    return await shape
      .validate(data, {
        abortEarly: false,
        stripUnknown: true
      })
      .then((value) => {
        req.newInput = value;

        return next();
      })
      .catch((err) => {
        throw new GlobalError(err.errors, 400);
      });
  };

export default schemaValidator;
