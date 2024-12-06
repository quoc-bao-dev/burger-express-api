import { Request, Response } from 'express';
import SubCategoryService from '../services/subCategory.service';
import { createResponse } from '../utils/response';

class SubCategoryController {
    async getAll(req: Request, res: Response) {
        const subCategories = await SubCategoryService.getAll();

        const respone = createResponse({
            statusCode: 200,
            message: 'Get all subCategories successful!',
            data: subCategories,
        });

        res.status(respone.statusCode).json(respone);
    }
    async create(req: Request, res: Response) {
        const { name, category, image } = req.body;
        const subCategory = await SubCategoryService.create({
            name,
            category,
            image,
        });

        const respone = createResponse({
            statusCode: 200,
            message: 'Create subCategory successful!',
            data: subCategory,
        });

        res.status(respone.statusCode).json(respone);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, category, image } = req.body;
        const subCategory = await SubCategoryService.update(id, {
            name,
            category,
            image,
        });

        const respone = createResponse({
            statusCode: 200,
            message: 'Update subCategory successful!',
            data: subCategory,
        });

        res.status(respone.statusCode).json(respone);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const subCategory = await SubCategoryService.delete(id);

        const respone = createResponse({
            statusCode: 200,
            message: 'Delete subCategory successful!',
            data: subCategory,
        });

        res.status(respone.statusCode).json(respone);
    }
}

export default new SubCategoryController();
