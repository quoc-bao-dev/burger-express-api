import { model, ObjectId, Schema } from 'mongoose';

export interface SubCategoryDocument extends Document {
    name: string;
    slug: string;
    image: string;
    orderNumber: number;
    category: ObjectId;
}

const subCategorySchema = new Schema<SubCategoryDocument>({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true, default: '' },
    orderNumber: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

export default model('SubCategory', subCategorySchema);
