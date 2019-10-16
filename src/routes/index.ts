import express from 'express';
import authRouter from './auth.router';
import productRouter from'./product.router'
import customRouter from'./custom.router'


class Router {

    public router: express.Router;

    constructor(){

        this.router = express.Router();
        this.build();
    }

    private build(): void {
        this.router.use('/auth', authRouter);
        this.router.use('/product', productRouter);
        this.router.use('/custom', customRouter);
    }
}

export default new Router().router;
