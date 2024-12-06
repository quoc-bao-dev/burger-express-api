import { Request, Response } from 'express';
import CategoryServivce from '../services/category.service';
import { createResponse } from '../utils/response';

class CategoryController {
    async getAll(req: Request, res: Response) {
        const categories = await CategoryServivce.getAll();

        const respone = createResponse({
            statusCode: 200,
            message: 'Get all categories successful!',
            data: categories,
        });

        res.status(respone.statusCode).json(respone);
    }
    async create(req: Request, res: Response) {
        const { name } = req.body;
        const category = await CategoryServivce.create({ name });

        const respone = createResponse({
            statusCode: 200,
            message: 'Create category successful!',
            data: category,
        });

        res.status(respone.statusCode).json(respone);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, orderNumber } = req.body;
        const category = await CategoryServivce.update(id, {
            name,
            orderNumber,
        });

        const respone = createResponse({
            statusCode: 200,
            message: 'Update category successful!',
            data: category,
        });

        res.status(respone.statusCode).json(respone);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const category = await CategoryServivce.delete(id);

        const respone = createResponse({
            statusCode: 200,
            message: 'Delete category successful!',
            data: category,
        });

        res.status(respone.statusCode).json(respone);
    }
}

export default new CategoryController();
