import express from 'express';
import {schema, validateBody} from "../helpers";
import CustomController from "../controllers/CustomController";
import mongoose from "mongoose";


const router = express.Router();

router.get('/', async (req, res) => {
        try {
            const customProducts = await CustomController.getAll();
            res.json(customProducts);
        } catch (e) {
            res.status(500).end();
        }
    }
).get('/:id', async (req, res) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const customProduct = await CustomController.getById(id);
        res.json(customProduct);
    } catch (e) {
        res.status(404).end();
    }
});

router.post('/', validateBody(schema.customSchema), async (req, res) => {
    try {
        const customProduct = req.body;
        console.log(customProduct.type);
        const result = await CustomController
            .create(customProduct.name, customProduct.type, customProduct.price, customProduct.image);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const customProduct = await CustomController.delete(id);
        res.json(customProduct);
    } catch (e) {
        res.status(404).end();
    }

});





export default router;
