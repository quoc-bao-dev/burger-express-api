import ApiError from '../core/ApiError';
import CategoryDTO from '../DTO/category.dto';
import { updateOrderNumber } from '../utils/changeOrderNumber';
import Category from './../models/category.schema';
import SubCategory from './../models/subCategory.schema';
import Dish from './../models/dish.schema';
import {
    CreateCategoryInput,
    UpdateCategoryInput,
} from './../models/interfaces/category.interface';
import _ from 'lodash';

const CategoryServivce = {
    getAll: async () => {
        const categories = await Category.find().sort('orderNumber');
        return categories.map((category) => new CategoryDTO(category));
    },
    create: async (payload: CreateCategoryInput) => {
        const slug = _.kebabCase(payload.name);

        const findCategory = await Category.findOne({ slug });
        if (findCategory) {
            throw new Error('Category already exist');
        }

        const orderNumber = (await Category.countDocuments()) + 1;

        const categoryData = {
            name: payload.name,
            slug,
            orderNumber,
        };
        const category = await Category.create(categoryData);

        return new CategoryDTO(category);
    },
    update: async (id: string, payload: UpdateCategoryInput) => {
        const findCategory = await Category.findById(id);
        if (!findCategory) {
            throw ApiError.notFound('Category not found');
        }

        const slug = payload.name
            ? _.kebabCase(payload.name)
            : findCategory.slug;

        if (payload.name) {
            const existCategory = await Category.findOne({ slug });
            if (existCategory) {
                throw new Error('Category already exist');
            }
        }

        if (payload.orderNumber) {
            await updateOrderNumber(Category, id, payload.orderNumber);
        }

        const category = await Category.findByIdAndUpdate(
            id,
            { name: payload.name, slug },
            { new: true }
        );
        console.log(category);

        return new CategoryDTO(category);
    },
    delete: async (id: string) => {
        const category = await Category.findById(id);
        if (!category) {
            throw ApiError.notFound('Category not found');
        }

        const subCategories = await SubCategory.find({
            category: category._id,
        });
        if (subCategories.length > 0) {
            throw new Error('Category is used in a subCategory');
        }

        const dishes = await Dish.find({ category: category._id });
        if (dishes.length > 0) {
            throw new Error('Category is used in a dish');
        }

        await category.deleteOne();
        return new CategoryDTO(category);
    },
};

export default CategoryServivce;
