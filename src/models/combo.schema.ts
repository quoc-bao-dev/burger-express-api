import { Document, model, ObjectId, Schema } from 'mongoose';

export interface ComboDocument extends Document {
    name: string;
    slug: string;
    image: string;
    price: number;
    items: { dish: ObjectId; quantity: number; options: string }[];
    description: string;
    promotion: null;
    isPermanent: boolean;
    timeRange: {
        timeStart: Date;
        timeEnd: Date;
    };
    orderNumber: number;
}

const comboSchema = new Schema<ComboDocument>(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        items: [
            {
                dish: {
                    type: Schema.Types.ObjectId,
                    ref: 'Dish',
                    required: true,
                },
                quantity: { type: Number, required: true },
                options: { type: String },
            },
        ],
        isPermanent: { type: Boolean, default: false },
        description: { type: String, required: true },
        timeRange: {
            type: {
                timeStart: { type: Date, required: true },
                timeEnd: { type: Date, required: true },
            },
        },
        orderNumber: { type: Number, required: true },
    },
    { timestamps: true }
);

export default model('Combo', comboSchema);
