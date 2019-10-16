import express from 'express';
import {schema, validateBody} from "../helpers";

const router = express.Router();

router.get('', (req, res) => {
            res.json(['test'])
        }
    );

export default router;
