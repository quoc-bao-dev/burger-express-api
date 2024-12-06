import { ToppingDocument } from './../models/topping.schema';
class DishDTO {
    id: string;
    name: string;
    slug: string;
    price: number;
    currentPrice: number;
    image: string;
    category: {
        name: string;
        slug: string;
    };
    subCategory: {
        name: string;
        slug: string;
        image: string;
    };
    description: string;
    orderNumber: number;
    sizes: {
        size: 'small' | 'medium' | 'large';
        additionalPrice: number;
    }[];
    available: boolean;
    discount?: {
        type: 'fixed' | 'percentage';
        discountValue?: number;
        discountPercent?: number;
    };

    constructor(payload: any) {
        const currentPrice = payload.promotion
            ? payload.promotion.typeDiscount === 'fixed'
                ? payload.price - payload.promotion.discountValue
                : (payload.price *
                      (100 - payload.promotion.discountPercentage)) /
                  100
            : payload.price;

        this.id = payload._id;
        this.name = payload.name;
        this.slug = payload.slug;
        this.price = payload.price;
        this.currentPrice = currentPrice;
        this.image = payload.image;
        this.discount = payload.promotion && {
            type: payload?.promotion?.typeDiscount,
            discountValue: payload?.promotion?.discountValue,
            discountPercent: payload?.promotion?.discountPercentage,
        };
        this.category = {
            name: payload.category.name,
            slug: payload.category.slug,
        };
        this.subCategory = {
            name: payload.subCategory.name,
            slug: payload.subCategory.slug,
            image: payload.subCategory.image,
        };
        this.description = payload.description;

        this.orderNumber = payload.orderNumber;
        this.sizes = payload.sizes.map(
            ({
                size,
                additionalPrice,
            }: {
                size: string;
                additionalPrice: number;
            }) => ({ size, additionalPrice })
        );
        this.available = payload.available;
    }

    toRespone() {}

    toDetailResponse({ toppings }: { toppings: ToppingDocument[] }) {
        const toppingsResponse = toppings.map((topping) => ({
            id: topping.id,
            name: topping.name,
            price: topping.price,
            image: topping.image,
        }));
        return {
            ...this,
            toppings: toppingsResponse,
        };
    }

    toSearchResponse() {
        return {
            name: this.name,
            price: this.price,
            image: this.image,
            category: this.category.name,
            subCategory: this.subCategory.name,
            available: this.available,
        };
    }
    toTestResponse() {
        return {
            id: this.id,
            name: this.name,
            orderNumber: this.orderNumber,
        };
    }
}

export default DishDTO;
