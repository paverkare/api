import express from 'express';
import authRouter from './auth.router';
import userRouter from './user.router';
import productRouter from'./product.router'
import instaRouter from './insta.router';


class Router {

    public router: express.Router;

    constructor(){

        this.router = express.Router();
        this.build();
    }

    private build(): void {

        this.router.use('/auth', authRouter);
        this.router.use('/user', userRouter);
        this.router.use('/product', productRouter);
        this.router.use('/insta', instaRouter);
    }
}

export default new Router().router;
