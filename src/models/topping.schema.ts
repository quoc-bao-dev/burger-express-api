import { Document, model, Schema } from 'mongoose';

export interface ToppingDocument extends Document {
    name: string;
    slug: string;
    image: string;
    price: number;
    applicableTo: string[];
    orderNumber: number;
}

const toppingSchema = new Schema<ToppingDocument>({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    applicableTo: [{ type: String, required: true, ref: 'Dish' }],
    orderNumber: { type: Number, required: true },
});

export default model<ToppingDocument>('Topping', toppingSchema);
