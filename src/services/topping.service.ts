import _, { add, get } from 'lodash';
import Topping from '../models/topping.schema';
import Dish from '../models/dish.schema';
import { ToppingDTO } from '../DTO/topping.dto';
import { CreateToppingInput } from '../models/interfaces/topping.interface';
const ToppingService = {
    getAll: async () => {
        const toppings = await Topping.find()
            .sort('orderNumber')
            .populate('applicableTo');
        // return toppings;
        return toppings.map((topping) =>
            new ToppingDTO(topping).toGetAllResponse()
        );
    },
    create: async (payload: CreateToppingInput) => {
        const slug = _.kebabCase(payload.name);
        const findTopping = await Topping.findOne({ slug });
        if (findTopping) {
            throw new Error('Topping already exist');
        }

        // check dishes
        await Promise.all(
            payload.applicableTo.map(async (_idDish: string) => {
                const dish = await Topping.findById(_idDish);
                if (!dish) {
                    throw new Error('Topping not found: ' + _idDish);
                }
            })
        );

        const orderNumber = (await Topping.countDocuments()) + 1;

        const toppingData = {
            name: payload.name,
            slug,
            image: payload.image,
            price: payload.price,
            applicableTo: payload.applicableTo,
            orderNumber,
        };
        const topping = await Topping.create(toppingData);
        return new ToppingDTO(topping);
    },

    async addDishToTopping(toppingId: string, dishId: string) {
        const dish = await Dish.findById(dishId);
        if (!dish) {
            throw new Error('Dish not found');
        }
        const topping = await Topping.findById(toppingId);
        if (!topping) {
            throw new Error('Topping not found');
        }

        if (topping.applicableTo.includes(dishId)) {
            throw new Error('Dish already exist');
        }

        topping.applicableTo.push(dishId);
        await topping.save();
        return new ToppingDTO(topping);
    },

    async removeDishFromTopping(toppingId: string, dishId: string) {
        const dish = await Dish.findById(dishId);
        if (!dish) {
            throw new Error('Dish not found');
        }
        const topping = await Topping.findById(toppingId);
        if (!topping) {
            throw new Error('Topping not found');
        }

        if (!topping.applicableTo.includes(dishId)) {
            throw new Error('Dish not found');
        }

        topping.applicableTo = topping.applicableTo.filter(
            (id: string) => id !== dishId
        );
        await topping.save();
        return new ToppingDTO(topping);
    },
};

export default ToppingService;
