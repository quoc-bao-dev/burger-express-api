import { DishDocument } from '../models/dish.schema';

export class ToppingDTO {
    id: string;
    name: string;
    slug: string;
    image: string;
    price: number;
    applicableTo: string[] | DishDocument[];
    orderNumber: number;

    constructor(payload: any) {
        this.id = payload._id;
        this.name = payload.name;
        this.slug = payload.slug;
        this.image = payload.image;
        this.price = payload.price;
        this.applicableTo = payload.applicableTo;
        this.orderNumber = payload.orderNumber;
    }
    toGetAllResponse() {
        return {
            id: this.id,
            name: this.name,
            slug: this.slug,
            image: this.image,
            price: this.price,
            applicableTo: (this.applicableTo as DishDocument[]).map(
                (dish: DishDocument) => ({
                    id: dish.id,
                    name: dish.name,
                    image: dish.image,
                })
            ),
            orderNumber: this.orderNumber,
        };
    }
}
