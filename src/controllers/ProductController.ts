import {IProduct} from "../models/product";
import {ProductModel} from "../models";
import {DocumentQuery, Mongoose, Schema} from "mongoose";

class ProductController {

    getAll(): DocumentQuery<IProduct[], IProduct> {
        return ProductModel.find();
    }

    getById(id: Schema.Types.ObjectId): DocumentQuery<IProduct | null, IProduct> {
        return ProductModel.findOne({_id: id});
    }
}
