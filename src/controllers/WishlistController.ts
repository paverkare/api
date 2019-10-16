import {DocumentQuery, Schema} from "mongoose";
import * as mongoose from "mongoose";
import {IUser} from "../models/user";
import {UserModel} from "../models";


class WishlistController{

    getUserWishlist(id: mongoose.Types.ObjectId): DocumentQuery<IUser | null, IUser> {
        return UserModel.findById(id,'wishList');
    }

    delete(user_id: mongoose.Types.ObjectId, custom_id:mongoose.Types.ObjectId ) {
        return UserModel.updateOne({ _id: user_id },{ $pull:{wishList :{ $in: ["5da709a86a1c320a7855cb29"]} }});
    }

    create(name: string): Promise<IUser>{
        return UserModel.create({
            name
        });
    }
}

export default new WishlistController();
