import { model, Schema } from 'mongoose';

export interface CategoryDocument extends Document {
    name: string;
    slug: string;
    orderNumber: number;
}
const categorySchema = new Schema<CategoryDocument>({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    orderNumber: { type: Number, required: true },
});

export default model('Category', categorySchema);
