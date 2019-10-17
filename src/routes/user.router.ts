import express from 'express';
import passport from '../passport'
import {schema, validateBody} from "../helpers";
import WishlistController from "../controllers/WishlistController";
import CartController from "../controllers/CartController";
import {IUser} from "../models/user";
import mongoose from 'mongoose'


const router = express.Router();
const passportJwt = passport.authenticate('jwt', {session: false});

router.get('/me', passportJwt, (req, res) => {

    if(!req.user)

        return res.status(400).json({message: "No user found"});

    return res.status(200).json({user: req.user});
});

router.get('/wishlist', passportJwt, async (req, res) => {
    try {

        const wishlist = await WishlistController.getUserWishlist(mongoose.Types.ObjectId((req.user as IUser).id));
        if(!wishlist)
            res.status(404).end();
        res.json(wishlist);
    } catch (e) {
        console.log(e)
        res.status(500).end();
    }
});

router.delete('/wishlist/:custom_id', passportJwt,async (req, res) => {
    try {
        const wishlist = await WishlistController.delete(mongoose.Types.ObjectId((req.user as IUser).id), req.params.custom_id);
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

export default router;