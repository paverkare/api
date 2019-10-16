import express from 'express';
import authRouter from './auth.router';
import productRouter from'./product.router'


class Router {

    public router: express.Router;

    constructor(){

        this.router = express.Router();
        this.build();
    }

    private build(): void {

        //this.router.use('/test', testRouter);
        this.router.use('/auth', authRouter);
        this.router.use('/product', productRouter);
    }
}

export default new Router().router;
