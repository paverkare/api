import mongoose, {Schema, Document} from 'mongoose';
import {IProduct} from "./product";

export interface ICustom extends Document{
    name: string,
    type: IProduct['id'][],
    price: number,
    image: String,
}

const customSchema = new Schema({
    name: {type: String, required: true, unique: true},
    type: [{ type: Schema.Types.ObjectId, ref: 'Product'}],
    price: {type: Number, required: true},
    image: {type: String, required: true, unique: true},
});


export default mongoose.model<ICustom>('Custom', customSchema);
