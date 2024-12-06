import _ from 'lodash';
import DishDTO from '../DTO/dish.dto';
import Category from '../models/category.schema';
import Dish, { DishDocument } from '../models/dish.schema';
import Combo from '../models/combo.schema';
import Topping from '../models/topping.schema';
import {
    CreateDishInput,
    UpdateDishInput,
} from '../models/interfaces/dish.interface';
import SubCategory from '../models/subCategory.schema';
import {
    updateOrderNumber,
    updateOrderNumbers,
} from '../utils/changeOrderNumber';
import ApiError from '../core/ApiError';
import { PromotionDocument } from '../models/promotion.schema';

const DishService = {
    getAll: async () => {
        const dishes = await Dish.find<DishDocument>()
            .populate([
                'category',
                'subCategory',
                'sizes',
                'promotion',
                'listPromotion',
            ])
            .sort('orderNumber');

        await Promise.all(
            dishes.map(async (_dish) => {
                const dish = await Dish.findById(_dish.id).populate(
                    'listPromotion'
                );

                if (!dish) return;

                if (
                    dish.listPromotion &&
                    dish.listPromotion.length > 0 &&
                    dish.promotion
                ) {
                    const promotion = dish.promotion as PromotionDocument;

                    if (new Date() > new Date(promotion.timeEnd)) {
                        //qua han
                        dish.promotion = undefined;
                        const ls = dish.listPromotion as PromotionDocument[];
                        for (const _promotion of ls) {
                            if (new Date() < new Date(_promotion.timeEnd)) {
                                dish.promotion = _promotion;
                            }
                        }
                    }
                } else if (
                    dish.listPromotion &&
                    dish.listPromotion.length > 0 &&
                    !dish.promotion
                ) {
                    const ls = dish.listPromotion as PromotionDocument[];

                    for (const _promotion of ls) {
                        if (new Date() < new Date(_promotion.timeEnd)) {
                            dish.promotion = _promotion;
                        }
                    }
                }
                await dish.save();
            })
        );

        const dishsResults = await Dish.find<DishDocument>()
            .populate([
                'category',
                'subCategory',
                'sizes',
                'promotion',
                'listPromotion',
            ])
            .sort('orderNumber');

        return dishes.map((dish) => new DishDTO(dish));
    },

    getDishDetail: async (slug: string) => {
        const dish = await Dish.findOne({ slug }).populate([
            'category',
            'subCategory',
            'sizes',
        ]);

        if (!dish) {
            throw ApiError.notFound('Dish not found');
        }

        const toppings = await Topping.find({ applicableTo: dish._id });
        return new DishDTO(dish).toDetailResponse({ toppings });
    },
    create: async (payload: CreateDishInput) => {
        const findCategory = await Category.findOne({ slug: payload.category });
        if (!findCategory) {
            throw ApiError.notFound('Category not found');
        }

        const findSubCategory = await SubCategory.findOne({
            slug: payload.subCategory,
        });
        if (!findSubCategory) {
            throw ApiError.notFound('SubCategory not found');
        }

        const slug = _.kebabCase(payload.name);
        const findDish = await Dish.findOne({ slug });
        if (findDish) {
            throw new Error('Dish already exist');
        }

        const orderNumber = (await Dish.countDocuments()) + 1;

        const dishData = {
            name: payload.name,
            slug,
            category: findCategory._id,
            subCategory: findSubCategory._id,
            description: payload.description,
            price: payload.price,
            image: payload.image,
            orderNumber,
            sizes: payload.sizes,
        };

        const dish = await (
            await Dish.create(dishData)
        ).populate('category subCategory');

        return new DishDTO(dish);
    },

    update: async (id: string, payload: UpdateDishInput) => {
        const findDish = await Dish.findById(id);

        if (!findDish) {
            throw ApiError.notFound('Dish not found');
        }

        if (payload.name) {
            findDish.slug = _.kebabCase(payload.name);
            const existDish = await Dish.findOne({ slug: findDish.slug });
            if (existDish) {
                throw new Error('Dish already exist');
            }
        }

        const slug = payload.name ? _.kebabCase(payload.name) : findDish.slug;

        const dishData = {
            name: payload.name,
            slug: slug,
            category: findDish.category,
            subCategory: findDish.subCategory,
            description: payload.description,
            price: payload.price,
            image: payload.image,
            sizes: payload.sizes,
            available: payload.available,
        };
        const dish = await Dish.findByIdAndUpdate(id, dishData, {
            new: true,
        }).populate('category subCategory');

        return new DishDTO(dish);
    },

    changeOrder: async (id: string, orderNumber: number) => {
        const findDish = await Dish.findById(id);
        if (!findDish) {
            throw ApiError.notFound('Dish not found');
        }
        await updateOrderNumber(Dish, id, orderNumber);

        const newDish = await Dish.findById(id);
        return new DishDTO(newDish);
    },

    delete: async (id: string) => {
        const findDish = await Dish.findById(id);
        if (!findDish) {
            throw ApiError.notFound('Dish not found');
        }

        const combo = await Combo.findOne({
            items: { $elemMatch: { dish: id } },
        });
        if (combo) {
            throw new Error('Dish is used in a combo');
        }

        await findDish.deleteOne();

        await updateOrderNumbers(Dish);

        return new DishDTO(findDish);
    },
};

export default DishService;
