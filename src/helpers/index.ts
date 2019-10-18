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
    }),
    productSchema: Joi.object().keys({
        name: Joi.string().trim().required(),
        type: Joi.string().trim().required(),
        size: Joi.number(),
        color: Joi.string().trim(),
        image: Joi.string().trim().uri().required()
    }),
    customSchema: Joi.object().keys({
        name: Joi.string().trim().required(),
        type: Joi.array().items(Joi.string()).required(),
        price: Joi.number(),
        image: Joi.string().trim().uri().required()
    }),
    categorySchema: Joi.object().keys({
        name: Joi.string().trim().required()
    }),
    registerSchema: Joi.object().keys({
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(4).required(),
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required()
    })
};
