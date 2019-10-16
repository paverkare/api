import express from 'express';
import authRouter from './auth.router';
import userRouter from './user.router';


class Router {

    public router: express.Router;

    constructor(){

        this.router = express.Router();
        this.build();
    }

    private build(): void {

        this.router.use('/auth', authRouter);
        this.router.use('/user', userRouter);
    }
}

export default new Router().router;