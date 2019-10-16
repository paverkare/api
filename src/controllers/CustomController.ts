import {CustomModel} from "../models";
import {DocumentQuery, Schema} from "mongoose";
import * as mongoose from "mongoose";
import {ICustom} from "../models/custom";

class CustomController{

    getAll(): DocumentQuery<ICustom[], ICustom> {
        return CustomModel.find();
    }

    getById(id: mongoose.Types.ObjectId): DocumentQuery<ICustom | null, ICustom> {
        return CustomModel.findOne({_id: id});
    }

    create(name: string, type: String[], price: number, image: string) {
        return CustomModel.create({
            name, type, price, image
        });
    }

     delete(id: mongoose.Types.ObjectId) {
        let deleteCustom = this.getById(id);
        return CustomModel.deleteOne(deleteCustom);
    }

}

export default new CustomController();
