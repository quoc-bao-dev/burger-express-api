import _, { add } from 'lodash';
import ApiError from '../core/ApiError';
import { ComboDTO } from '../DTO/combo.dto';
import Combo from '../models/combo.schema';
import Dish from '../models/dish.schema';
import {
    CreateComboInput,
    UpdateComboInput,
} from '../models/interfaces/combo.interface';
import {
    updateOrderNumber,
    updateOrderNumbers,
} from '../utils/changeOrderNumber';

const ComboService = {
    getAll: async () => {
        const combos = await Combo.find()
            .populate('items.dish')
            .sort('orderNumber');
        return combos.map((combo) => new ComboDTO(combo));
    },
    getDetail: async (slug: string) => {
        const combo = await Combo.findOne({ slug }).populate('items.dish');
        if (!combo) {
            throw ApiError.notFound('Combo not found');
        }
        return new ComboDTO(combo);
    },
    create: async (payload: CreateComboInput) => {
        const items = await Promise.all(
            payload.items.map(async (item) => {
                const dish = await Dish.findById(item.dishId);
                if (!dish) {
                    throw new Error('Dish not found: ' + item.dishId);
                }

                return {
                    dish: dish._id,
                    quantity: item.quantity,
                    options: item.options,
                };
            })
        );

        const slug = _.kebabCase(payload.name);
        const findCombo = await Combo.findOne({ slug });
        if (findCombo) {
            throw new Error('Combo already exist');
        }

        const orderNumber = (await Combo.countDocuments()) + 1;

        const comboData = {
            name: payload.name,
            slug: slug,
            image: payload.image,
            price: payload.price,
            items: items,
            description: payload.description,
            isPermanent: !payload.timeRange,
            timeRange: payload.timeRange,
            orderNumber,
        };

        const combo = await (
            await Combo.create(comboData)
        ).populate('items.dish');

        return new ComboDTO(combo);
    },

    update: async (id: string, payload: UpdateComboInput) => {
        const findCombo = await Combo.findById(id);
        if (!findCombo) {
            throw ApiError.notFound('Combo not found');
        }
        const slug = payload.name ? _.kebabCase(payload.name) : findCombo.slug;

        if (payload.name) {
            const existCombo = await Combo.findOne({ slug });
            if (existCombo) {
                throw new Error('Combo already exist');
            }
        }

        // const items = payload.items
        //     ? await Promise.all(
        //           payload.items.map(async (item: any) => {
        //               const dish = await Dish.findById(item.dishId);
        //               if (!dish) {
        //                   throw new Error('Dish not found: ' + item.dishId);
        //               }

        //               return {
        //                   dish: dish.id,
        //                   quantity: item.quantity,
        //                   options: item.options,
        //               };
        //           })
        //       )
        //     : findCombo.items;

        if (payload.orderNumber) {
            await updateOrderNumber(Combo, id, payload.orderNumber);
        }

        const comboData = {
            name: payload.name,
            slug: slug,
            image: payload.image,
            description: payload.description,
            price: payload.price,
            isPermanent: !payload.timeRange,
            timeRange: payload.timeRange,
        };
        const combo = await (
            await Combo.findByIdAndUpdate(id, comboData, {
                new: true,
            })
        )?.populate('items.dish');
        return new ComboDTO(combo);
    },

    addDishToCombo: async (
        comboId: string,
        { dishId, quantity }: { dishId: string; quantity: number }
    ) => {
        const findCombo = await Combo.findById(comboId);
        if (!findCombo) {
            throw ApiError.notFound('Combo not found');
        }

        const findDish = await Dish.findById(dishId);
        if (!findDish) {
            throw ApiError.notFound('Dish not found');
        }

        if (findCombo.items.some((item) => item.dish.toString() === dishId)) {
            throw new Error('Dish already exist in combo');
        }

        const items = [
            ...findCombo.items,
            { dish: dishId, quantity: quantity },
        ];

        const combo = await (
            await Combo.findByIdAndUpdate(comboId, { items }, { new: true })
        )?.populate('items.dish');
        return new ComboDTO(combo);
    },

    removeDishFromCombo: async (comboId: string, dishId: string) => {
        const findCombo = await Combo.findById(comboId);
        if (!findCombo) {
            throw ApiError.notFound('Combo not found');
        }

        const findDish = await Dish.findById(dishId);
        if (!findDish) {
            throw ApiError.notFound('Dish not found');
        }

        if (!findCombo.items.some((item) => item.dish.toString() === dishId)) {
            throw new Error('Dish not exist in combo');
        }

        const items = findCombo.items.filter(
            (item) => item.dish.toString() !== dishId
        );

        const combo = await (
            await Combo.findByIdAndUpdate(comboId, { items }, { new: true })
        )?.populate('items.dish');
        return new ComboDTO(combo);
    },
    delete: async (id: string) => {
        const findCombo = await Combo.findById(id);
        if (!findCombo) {
            throw ApiError.notFound('Combo not found');
        }
        await findCombo.deleteOne();
        await updateOrderNumbers(Combo);
        return new ComboDTO(findCombo);
    },
};

export default ComboService;
