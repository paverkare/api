import envConf from 'dotenv';
envConf.config();

import express  from 'express';
import router from './routes';
import mongoCo from './config/mongoConnection';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from "body-parser";
import {CustomModel, ProductModel, UserModel} from "./models";
import category from "./models/category";
import * as mongoose from "mongoose";


mongoCo.then( db => {
    console.log("Successfully logged to database");

    return db;
});

const app  = express();

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use('/api', router);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${ port }`);
});

var customProduct = new CustomModel({name: 'test', type:'5da6dc93e322643c887444d0', price: 59, image: 'test' });

customProduct.save(function (err) {
    if (err) { throw err; }
    console.log('Commentaire ajouté avec succès !');
    // On se déconnecte de MongoDB maintenant
   // mongoose.connection.close();
});
