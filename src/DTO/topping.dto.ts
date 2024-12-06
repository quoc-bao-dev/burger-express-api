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

// {
//             "_id": "674fc20d77cbb9d53476cb78",
//             "name": "chees 2",
//             "slug": "chees-2",
//             "image": "chees.jpg",
//             "price": 100,
//             "applicableTo": [
//                 {
//                     "_id": "674dce1de547e684c6e589aa",
//                     "name": "burger beef 6",
//                     "slug": "burger-beef-6",
//                     "category": "674dbc64af63670c311d5d3d",
//                     "subCategory": "674dbc70af63670c311d5d42",
//                     "description": "wonderful food",
//                     "price": 1000,
//                     "image": "hinh-anh.jpg",
//                     "orderNumber": 1,
//                     "sizes": [
//                         {
//                             "size": "small",
//                             "additionalPrice": 222,
//                             "_id": "674dce1de547e684c6e589ab"
//                         }
//                     ],
//                     "available": true,
//                     "__v": 0
//                 }
//             ],
//             "orderNumber": 2,
//             "__v": 8
//         }
