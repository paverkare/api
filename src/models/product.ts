import mongoose, {Schema, Document} from 'mongoose';
import {ICategory} from "./category";

export interface IProduct extends Document{
    name: string,
    type: ICategory['_id'],
    size: number,
    color: string,
    image: string
}

const productSchema = new Schema({
    name: {type: String, required: true, unique: true},
    type: {type: Schema.Types.ObjectId, required: true},
    size: {type: Number, required: false},
    color: {type: String, required: false},
    image: {type: String, required: true, unique: true}
});


export default mongoose.model<IProduct>('Product', productSchema);
