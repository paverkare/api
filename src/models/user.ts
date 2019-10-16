import mongoose, {Schema, Document} from 'mongoose';
import {ICustom} from "./custom";
const bcrypt = require('mongoose-bcrypt');

export interface IUser extends Document{

    email: string,
    firstName: string,
    lastName: string,
    verifyPassword: (password: string ) => boolean,
    wishList: ICustom['id'][],
    cart: ICustom['id'][]
}

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true, bcrypt: true},
    wishList: [{type: Schema.Types.ObjectId, ref:'Custom', required: true}],
    cart: [{type: Schema.Types.ObjectId, ref:'Custom', required: true}]
});

userSchema.plugin(bcrypt);

export default mongoose.model<IUser>('User', userSchema);