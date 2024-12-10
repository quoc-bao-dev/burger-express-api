import { CreateToppingInput } from '../models/interfaces/topping.interface';
import ToppingService from '../services/topping.service';
import { createResponse } from '../utils/response';
import { Request, Response } from 'express';

class ToppingController {
    async getAll(req: Request, res: Response) {
        const toppings = await ToppingService.getAll();
        const response = createResponse({
            statusCode: 200,
            message: 'Get all toppings successfully!',
            data: toppings,
        });
        res.status(response.statusCode).json(response);
    }
    async create(req: Request, res: Response) {
        const { name, image, price, applicableTo }: CreateToppingInput =
            req.body;

        const topping = await ToppingService.create({
            name,
            image,
            price,
            applicableTo,
        });
        const response = createResponse({
            statusCode: 200,
            message: 'Create topping successfully!',
            data: topping,
        });

        res.status(response.statusCode).json(response);
    }

    async addDish(req: Request, res: Response) {
        const { toppingId } = req.params;
        const { dishId } = req.body;
        const topping = await ToppingService.addDishToTopping(
            toppingId,
            dishId
        );
        const response = createResponse({
            statusCode: 200,
            message: 'Add dish to topping successfully!',
            data: topping,
        });

        res.status(response.statusCode).json(response);
    }

    async removeDish(req: Request, res: Response) {
        const { toppingId, dishId } = req.params;
        const topping = await ToppingService.removeDishFromTopping(
            toppingId,
            dishId
        );
        const response = createResponse({
            statusCode: 200,
            message: 'Remove dish from topping successfully!',
            data: topping,
        });

        res.status(response.statusCode).json(response);
    }
}

export default new ToppingController();
