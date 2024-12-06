export interface ComboDataDTO {
    _id: string;
    name: string;
    slug: string;
    image: string;
    price: number;
    items: {
        dish: {
            _id: string;
            name: string;
            slug: string;
            category: string;
            subCategory: string;
            description: string;
            price: number;
            image: string;
            orderNumber: number;
            sizes: {
                size: 'small' | 'medium' | 'large';
                additionalPrice: number;
                _id: string;
            }[];
            available: boolean;
            __v: number;
        };
        quantity: number;
        _id: string;
    }[];
    description: string;
    timeRange: {
        timeStart: Date;
        timeEnd: Date;
        _id: string;
    };
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export class ComboDTO {
    id: string;
    name: string;
    slug: string;
    image: string;
    price: number;
    orderNumber: number;
    items: {
        dish: {
            name: string;
            image: string;
        };
        quantity: number;
    }[];
    description: string;
    isPermanent: boolean;
    timeRange: {
        timeStart: Date;
        timeEnd: Date;
    };
    constructor(payload: any) {
        this.id = payload._id;
        this.name = payload.name;
        this.slug = payload.slug;
        this.image = payload.image;
        this.price = payload.price;
        this.orderNumber = payload.orderNumber;
        this.items = payload.items?.map((item: any) => ({
            name: item.dish.name,
            image: item.dish.image,
            quantity: item.quantity,
        }));
        this.description = payload.description;
        this.isPermanent = payload.isPermanent;
        this.timeRange = payload?.timeRange && {
            timeStart: payload?.timeRange.timeStart,
            timeEnd: payload?.timeRange.timeEnd,
        };
    }
}
