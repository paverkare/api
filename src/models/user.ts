import mongoose, {Schema, Document} from 'mongoose';
const bcrypt = require('mongoose-bcrypt');

export interface IUser extends Document{

    email: string,
    firstName: string,
    lastName: string
}

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true, bcrypt: true},
});

userSchema.plugin(bcrypt);

export default mongoose.model<IUser>('User', userSchema);