import { model, ObjectId, Schema } from 'mongoose';
import { PromotionDocument } from './promotion.schema';

export interface DishDocument {
    id: string;
    name: string;
    slug: string;
    category: ObjectId;
    subCategory: ObjectId;
    description: string;
    price: number;
    image: string;
    orderNumber: number;
    sizes: {
        size: 'small' | 'medium' | 'large';
        additionalPrice: number;
    }[];
    promotion?: ObjectId | PromotionDocument;
    listPromotion?: ObjectId[] | PromotionDocument[];
    available: boolean;
}

const dishSchema = new Schema<DishDocument>({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    orderNumber: { type: Number, required: true },
    sizes: {
        type: [
            {
                size: {
                    type: String,
                    enum: ['small', 'medium', 'large'],
                    required: true,
                },
                additionalPrice: { type: Number, required: true },
            },
        ],
    },
    promotion: {
        type: Schema.Types.ObjectId,
        default: undefined,
        ref: 'Promotion',
    },
    listPromotion: [
        { type: Schema.Types.ObjectId, default: undefined, ref: 'Promotion' },
    ],
    available: { type: Boolean, required: true, default: true },
});

export default model('Dish', dishSchema);
