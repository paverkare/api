import express from 'express';
import passport from '../passport';
import WishlistController from "../controllers/WishlistController";
import CartController from "../controllers/CartController";
import OrderController from "../controllers/OrderController";
var mongoose = require('mongoose');


const router = express.Router();
const passportJwt = passport.authenticate('jwt', {session: false});

router.get('/me', passportJwt, (req, res) => {

    if(!req.user)

        return res.status(400).json({message: "No user found"});

    return res.status(200).json({user: req.user});
});

router.get('/:user_id/wishlist', async (req, res) => {
    try {
        const wishlist = await WishlistController.getUserWishlist(mongoose.Types.ObjectId(req.params.user_id))
        if(!wishlist)
            res.status(404).end();
        res.json(wishlist);
    } catch (e) {
        console.log(e)
        res.status(500).end();
    }
});

router.delete('/:user_id/wishlist/:custom_id', async (req, res) => {
    try {
        const wishlist = await WishlistController.delete(mongoose.Types.ObjectId(req.params.user_id), req.params.custom_id)
        res.json(wishlist);
    } catch (e) {
        res.status(500).end();
    }
});

router.post('/:user_id/wishlist', async (req, res) => {
    try {
        const wishlist = await WishlistController.addToWishList(mongoose.Types.ObjectId(req.params.user_id), req.body.custom_id)
        res.json(wishlist);
    } catch (e) {
        res.status(500).end();
    }
});

router.get('/:user_id/cart', async (req, res) => {
    try {
        const cart = await CartController.getUserCart(mongoose.Types.ObjectId(req.params.user_id))
        if(!cart)
            res.status(404).end();
        res.json(cart);
    } catch (e) {
        console.log(e)
        res.status(500).end();
    }
});

router.delete('/:user_id/cart/:custom_id', async (req, res) => {
    try {
        const cart = await CartController.delete(mongoose.Types.ObjectId(req.params.user_id), req.params.custom_id)
        res.json(cart);
    } catch (e) {
        res.status(500).end();
    }
});

router.post('/:user_id/cart', async (req, res) => {
    try {
        const cart = await CartController.addToCart(mongoose.Types.ObjectId(req.params.user_id), req.body.custom_id)
        res.json(cart);
    } catch (e) {
        res.status(500).end();
    }
});

router.get('/:user_id/order', async (req, res) => {
    try {
        const order = await OrderController.getOrder(mongoose.Types.ObjectId(req.params.user_id))
        console.log(order)
        if(!order)
            res.status(404).end();
        res.json(order);
    } catch (e) {
        console.log(e)
        res.status(500).end();
    }
});

router.post('/:user_id/order', async (req, res) => {
    try {
        const cart = await OrderController.addToOrder(mongoose.Types.ObjectId(req.params.user_id), req.body.custom_id)
        res.json(cart);
    } catch (e) {
        res.status(500).end();
    }
});

export default router;