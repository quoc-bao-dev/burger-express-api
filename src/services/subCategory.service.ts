import _ from 'lodash';
import SubCategoryDTO from '../DTO/subCategory.dto';
import {
    CreateSubCategoryInput,
    UpdateSubCategoryInput,
} from '../models/interfaces/subCategory.interface';
import Category from './../models/category.schema';
import Dish from './../models/dish.schema';
import SubCategory from './../models/subCategory.schema';
import { updateOrderNumber } from '../utils/changeOrderNumber';

const SubCategoryService = {
    getAll: async () => {
        const subCategories = await SubCategory.find().populate('category');
        return subCategories.map(
            (subCategory) => new SubCategoryDTO(subCategory)
        );
    },
    create: async (payload: CreateSubCategoryInput) => {
        const findCategory = await Category.findOne({ slug: payload.category });
        if (!findCategory) {
            throw new Error('Category not found');
        }

        const slug = _.kebabCase(payload.name);
        const findSubCategory = await SubCategory.findOne({ slug });
        if (findSubCategory) {
            throw new Error('SubCategory already exist');
        }

        const orderNumber = (await SubCategory.countDocuments()) + 1;

        const subCategoryData = {
            name: payload.name,
            slug,
            image: payload.image,
            orderNumber,
            category: findCategory._id,
        };

        const subCategory = await (
            await SubCategory.create(subCategoryData)
        ).populate('category');

        return new SubCategoryDTO(subCategory);
    },
    update: async (id: string, payload: UpdateSubCategoryInput) => {
        const findSubCategory = await SubCategory.findById(id);
        if (!findSubCategory) {
            throw new Error('SubCategory not found');
        }
        const slug = payload.name
            ? _.kebabCase(payload.name)
            : findSubCategory.slug;

        if (payload.name) {
            const existSubCategory = await SubCategory.findOne({ slug });
            if (existSubCategory) {
                throw new Error('SubCategory already exist');
            }
        }

        if (payload.orderNumber) {
            await updateOrderNumber(SubCategory, id, payload.orderNumber);
        }

        const subCategoryData = {
            name: payload.name,
            slug,
            image: payload.image,
            orderNumber: payload.orderNumber,
        };

        const subCategory = await SubCategory.findOneAndUpdate(
            { _id: id },
            subCategoryData,
            { new: true }
        ).populate('category');

        return new SubCategoryDTO(subCategory);
    },
    delete: async (id: string) => {
        const findSubCategory = await SubCategory.findById(id);
        if (!findSubCategory) {
            throw new Error('SubCategory not found');
        }

        const dish = await Dish.findOne({
            subCategory: id,
        });
        if (dish) {
            throw new Error('SubCategory is used in a dish');
        }

        await findSubCategory.deleteOne();

        return new SubCategoryDTO(findSubCategory);
    },
};

export default SubCategoryService;
