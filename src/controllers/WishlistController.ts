import {DocumentQuery, Schema} from "mongoose";
import * as mongoose from "mongoose";
import user, {IUser} from "../models/user";
import {UserModel} from "../models";


class WishlistController{

    getUserWishlist(id: mongoose.Types.ObjectId): DocumentQuery<IUser | null, IUser> {
        return UserModel.findById(id,'wishList');
    }

    async delete(user_id: mongoose.Types.ObjectId, custom_id:string) {
        console.log(custom_id)
        //return UserModel.update({ _id: user_id },{ $pull: { wishList :{ $in : "sida"} }});
        const value = await UserModel.findById(user_id).then((returnvalue: any) =>{
            for( let i in returnvalue.wishList){
                if(returnvalue.wishList[i] == custom_id)
                    returnvalue.wishList.pop(i);
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

    create(name: string): Promise<IUser>{
        return UserModel.create({
            name
        });
    }
}

export default new WishlistController();
