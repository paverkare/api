import {DocumentQuery, Schema} from "mongoose";
import * as mongoose from "mongoose";
import user, {IUser} from "../models/user";
import {UserModel} from "../models";


class CartController{

    getUserCart(id: mongoose.Types.ObjectId) {
        return UserModel.findById(id,'cart').populate('cart').then((data:any) => {
            return data.cart;
        });
    }

    async delete(user_id: mongoose.Types.ObjectId, custom_id:string) {
        const value = await UserModel.findById(user_id).then((returnvalue: any) =>{
            for( let i = 0; i < returnvalue.cart.length;i++){
                if(returnvalue.cart[i] == custom_id)
                    returnvalue.cart.splice(i,1);
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
