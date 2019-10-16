import {IProduct} from "../models/product";
import {ProductModel} from "../models";
import {DocumentQuery, Schema} from "mongoose";
import * as mongoose from "mongoose";

class ProductController {

    getAll(): DocumentQuery<IProduct[], IProduct> {
        return ProductModel.find();
    }

    getById(id: mongoose.Types.ObjectId): DocumentQuery<IProduct | null, IProduct> {
        return ProductModel.findOne({_id: id});
    }

    create(name: string, type: mongoose.Types.ObjectId, size: number, color: string, image: string): Promise<IProduct>{
        return ProductModel.create({
            name, type, size, color, image
        });
    }

    update(id: string, product: IProduct): DocumentQuery<IProduct | null, IProduct> {
        return ProductModel.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: product
            }, {
                new: true
            }
        );
    }


    delete(id: string) {
        return ProductModel.deleteOne({
            _id: id
        })
    }

}

export default new ProductController();
