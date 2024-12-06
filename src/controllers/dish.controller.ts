import { Request, Response } from 'express';
import DishService from '../services/dish.service';
import { createResponse } from '../utils/response';

class DishController {
    async getAll(req: Request, res: Response) {
        const dishes = await DishService.getAll();

        const respone = createResponse({
            statusCode: 200,
            message: 'Get all dishes successful!',
            data: dishes,
        });

        res.status(respone.statusCode).json(respone);
    }
    async getDishDetail(req: Request, res: Response) {
        const { slug } = req.params;
        const dish = await DishService.getDishDetail(slug);

        const respone = createResponse({
            statusCode: 200,
            message: 'Get dish detail successful!',
            data: dish,
        });

        res.status(respone.statusCode).json(respone);
    }
    async create(req: Request, res: Response) {
        const {
            name,
            category,
            subCategory,
            description,
            price,
            image,
            sizes,
        } = req.body;

        const dish = await DishService.create({
            name,
            category,
            subCategory,
            description,
            price,
            image,
            sizes,
        });

        const respone = createResponse({
            statusCode: 200,
            message: 'Create dish successful!',
            data: dish,
        });

        res.status(respone.statusCode).json(respone);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const {
            name,
            category,
            subCategory,
            description,
            price,
            image,
            sizes,
            available,
        } = req.body;
        const dish = await DishService.update(id, {
            name,
            category,
            subCategory,
            description,
            price,
            image,
            sizes,
            available,
        });

        const respone = createResponse({
            statusCode: 200,
            message: 'Update dish successful!',
            data: dish,
        });

        res.status(respone.statusCode).json(respone);
    }

    async changeOrder(req: Request, res: Response) {
        const { id } = req.params;
        const { orderNumber } = req.body;
        const dish = await DishService.changeOrder(id, orderNumber);

        const respone = createResponse({
            statusCode: 200,
            message: 'Change order number successful!',
            data: dish,
        });

        res.status(respone.statusCode).json(respone);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const dish = await DishService.delete(id);
        const respone = createResponse({
            statusCode: 200,
            message: 'Delete dish successful!',
            data: dish,
        });

        res.status(respone.statusCode).json(respone);
    }
}

export default new DishController();
