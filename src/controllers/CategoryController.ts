import {CategoryModel} from "../models";
import {DocumentQuery, Schema} from "mongoose";
import * as mongoose from "mongoose";
import {ICategory} from "../models/category";

class CategoryController{

    getAll(): DocumentQuery<ICategory[], ICategory> {
        return CategoryModel.find();
    }

    getById(id: mongoose.Types.ObjectId): DocumentQuery<ICategory | null, ICategory> {
        return CategoryModel.findOne({_id: id});
    }

    delete(id: string) {
        return CategoryModel.deleteOne({
            _id: id
        })
    }

    create(name: string): Promise<ICategory>{
        return CategoryModel.create({
            name
        });
    }

    update(id: string, category: ICategory): DocumentQuery<ICategory | null, ICategory> {
        return CategoryModel.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: category
            }, {
                new: true
            }
        );
    }

}

export default new CategoryController();
