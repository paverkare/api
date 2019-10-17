import {DocumentQuery, Schema} from "mongoose";
import * as mongoose from "mongoose";
import user, {IUser} from "../models/user";
import {UserModel} from "../models";


class OrderController{

    getOrder(id: mongoose.Types.ObjectId) {
        return UserModel.findById(id,'order').populate('order').then((data:any) => {
            if(!data)
                return null;
            return data.order;
        });
    }

    async addToOrder(user_id: mongoose.Types.ObjectId, custom_id:string){
        await UserModel.findByIdAndUpdate(user_id, {$push: {order: custom_id}});
        return UserModel.findById(user_id);
    }
}

export default new OrderController();
