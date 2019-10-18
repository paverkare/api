import express from 'express';
import {schema, validateBody} from "../helpers";
import ProductController from "../controllers/ProductController";
import {mongo, Schema} from "mongoose";
import mongoose from "mongoose";


const router = express.Router();

router.get('', async (req, res) => {
        try {
            const products = await ProductController.getAll();
            res.json(products);
        } catch (e) {
            res.status(500).end();
        }
    }
).get('/:id', async (req, res) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const product = await ProductController.getById(id);
        res.json(product);
    } catch (e) {
        res.status(404).end();
    }
});

router.post('/', validateBody(schema.productSchema), async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await ProductController
            .create(product.name, mongoose.Types.ObjectId(product.type), product.size, product.color, product.image);
        res.json(newProduct);
    } catch (e) {
        res.status(500).end();
    }
});

router.put('/:id', async (req, res) => {
    try {
        const product = await ProductController
            .update(req.params.id, req.body);

        res.json(product);
    } catch (e) {
        res.status(404).end();
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const oldProduct = await ProductController.delete(req.params.id);
        res.status(201).end();
    } catch (e) {
        res.status(404).end();
    }
});

export default router;
