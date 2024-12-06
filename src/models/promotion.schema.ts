import { model, ObjectId, Schema } from 'mongoose';

export interface PromotionDocument extends Document {
    name: string;
    banner?: string;
    description?: string;
    type: 'dish' | 'combo' | 'order';
    typeDiscount: 'fixed' | 'percentage';
    targetCombos?: ObjectId[];
    targetDishs?: ObjectId[];
    getDishs?: { productId: string; quantity: number }[];
    condition: {
        minOrderValue?: number;
        days?: (
            | 'Monday'
            | 'Tuesday'
            | 'Wednesday'
            | 'Thursday'
            | 'Friday'
            | 'Saturday'
            | 'Sunday'
        )[];
    };
    discountValue?: number;
    discountPercentage?: number;
    timeStart: Date;
    timeEnd: Date;
    isActive: boolean;
}

const promotionSchema = new Schema(
    {
        name: { type: String, required: true, trim: true }, // Tên chương trình
        banner: { type: String, trim: true },
        description: { type: String, trim: true }, // Mô tả chương trình
        type: {
            type: String,
            required: true,
            enum: ['dish', 'combo', 'order'],
            default: 'dish',
        },
        typeDiscount: {
            type: String,
            required: true,
            enum: ['fixed', 'percentage'],
            default: 'percentage',
        },
        targetCombos: {
            // Combo áp dụng khuyến mái
            type: [Schema.Types.ObjectId],
            default: undefined,
            ref: 'Combo',
        },
        targetDishs: {
            // Sản phẩm áp dụng khuyến mãi
            type: [Schema.Types.ObjectId],
            default: undefined,
            ref: 'Dish',
        },
        getDishs: {
            type: [{ productId: Schema.Types.ObjectId, quantity: Number }],
            default: undefined,
            ref: 'Dish',
        },
        condition: {
            // Điều kiện áp dụng cho đơn hàng
            minOrderValue: { type: Number, min: 0 }, // Giá trị tối thiểu của đơn hàng
            days: {
                // Chỉ áp dụng vào ngày cụ thể
                type: [String],
                enum: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                ],
                default: undefined,
            },
        },
        discountValue: {
            // Giá trị giảm cố định (nếu áp dụng cho toàn bộ hóa đơn)
            type: Number,
            min: 0,
        },
        discountPercentage: {
            // Phần trăm giảm (nếu áp dụng)
            type: Number,
            min: 0,
            max: 100,
        },
        timeStart: { type: Date, required: true }, // Ngày bắt đầu
        timeEnd: { type: Date, required: true }, // Ngày kết thúc
        isActive: { type: Boolean, default: true }, // Trạng thái hoạt động
    },
    { timestamps: true }
);

export default model('Promotion', promotionSchema);
