import express from 'express';
import {schema, validateBody} from "../helpers";

const router = express.Router();

router.route('/login')
    .post(validateBody(schema.loginSchema), (req, res) => {
        res.json(['test'])
    }
);

export default router;