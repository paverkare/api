import mongoose, {Schema, Document} from 'mongoose';
import {ICustom} from "./custom";
import Bcrypt from 'bcryptjs'

export interface IUser extends Document{

    email: string,
    firstName: string,
    lastName: string,
    password: string,
    verifyPassword: (password: string ) => boolean,
    wishList: ICustom['id'][],
    cart: ICustom['id'][]
}

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    wishList: [{type: Schema.Types.ObjectId, ref:'Custom', required: true}],
    cart: [{type: Schema.Types.ObjectId, ref:'Custom', required: true}]
});

userSchema.pre('save', function(this: IUser, next) {

    if(!this.isModified("password")) {
        return next();
    }
    this.password = Bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.methods.verifyPassword = function(this: IUser, password: string){

    return Bcrypt.compareSync(password, this.password);
};



export default mongoose.model<IUser>('User', userSchema);