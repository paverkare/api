import envConf from 'dotenv';
envConf.config();

import express  from 'express';
import router from './routes';
import mongoCo from './config/mongoConnection';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from "body-parser";
import * as mongoose from "mongoose";
import {ProductModel, CategoryModel} from "./models";


mongoCo.then( db => {
    console.log("Successfully logged to database");

    return db;
});

const app  = express();
if (process.env.NODE_ENV !== 'test') {

    app.use(morgan('dev'));
}
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use('/api', router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${ port }`);
});
