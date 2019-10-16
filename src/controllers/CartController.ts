import {DocumentQuery, Schema} from "mongoose";
import * as mongoose from "mongoose";
import user, {IUser} from "../models/user";
import {UserModel} from "../models";


class CartController{

    getUserCart(id: mongoose.Types.ObjectId): DocumentQuery<IUser | null, IUser> {
        return UserModel.findById(id,'cart');
    }

    async delete(user_id: mongoose.Types.ObjectId, custom_id:string) {
        const value = await UserModel.findById(user_id).then((returnvalue: any) =>{
            for( let i = 0; i < returnvalue.cart.length;i++){
                if(returnvalue.cart[i] == custom_id)
                    returnvalue.cart.pop(i);
                    break;
            }
            return returnvalue;
        })
        return await UserModel.findOneAndUpdate(
            {
                _id: user_id
            },
            {
                $set: value
            }, {
                new: true
            }
        );
    }

    async addToCart(user_id: mongoose.Types.ObjectId, custom_id:string){
        await UserModel.findByIdAndUpdate(user_id, {$push: {cart: custom_id}});
        return UserModel.findById(user_id);
    }
}

export default new CartController();
