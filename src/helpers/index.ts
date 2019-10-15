import Joi, {ArraySchema, ObjectSchema} from '@hapi/joi'
import {NextFunction} from 'express';

export function validateBody(schema: ObjectSchema | ArraySchema) {
    return (req: Request | any, res: any, next: NextFunction): void | Response => {
        const result = schema.validate(req.body, { abortEarly: false });

        console.log(result);

        if (result.error) {

            return res.status(400).json({
                message: 'Données invalides.',
                details: result.error.details
            });
        }
        if (!req.value) { req.value = {}; }
        req.value.body = result.value;
        next();
    }
}

export const schema =  {
    loginSchema: Joi.object().keys({
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(4).required(),
    })
};