import { Request, Response } from 'express';
import { UpdateComboInput } from '../models/interfaces/combo.interface';
import ComboService from '../services/combo.service';
import { createResponse } from '../utils/response';

class ComboController {
    async getAll(req: Request, res: Response) {
        const combos = await ComboService.getAll();

        const respone = createResponse({
            statusCode: 200,
            message: 'Get all combos successful!',
            data: combos,
        });

        res.status(respone.statusCode).json(respone);
    }

    async getComboDetail(req: Request, res: Response) {
        const { slug } = req.params;
        const combo = await ComboService.getDetail(slug);

        const respone = createResponse({
            statusCode: 200,
            message: 'Get combo detail successful!',
            data: combo,
        });

        res.status(respone.statusCode).json(respone);
    }
    async create(req: Request, res: Response) {
        const { name, image, items, description, price, timeRange } = req.body;

        const combo = await ComboService.create({
            name,
            image,
            items,
            description,
            price,
            timeRange,
        });

        const respone = createResponse({
            statusCode: 200,
            message: 'Create combo successful!',
            data: combo,
        });

        res.status(respone.statusCode).json(respone);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const {
            name,
            image,
            description,
            price,
            timeRange,
            orderNumber,
        }: UpdateComboInput = req.body;

        const combo = await ComboService.update(id, {
            name,
            image,
            description,
            price,
            timeRange,
            orderNumber,
        });

        const respone = createResponse({
            statusCode: 200,
            message: 'Update combo successful!',
            data: combo,
        });

        res.status(respone.statusCode).json(respone);
    }

    async addDish(req: Request, res: Response) {
        const { comboId } = req.params;
        const { dishId, quantity } = req.body;
        const combo = await ComboService.addDishToCombo(comboId, {
            dishId,
            quantity,
        });

        const respone = createResponse({
            statusCode: 200,
            message: 'Add dish to combo successful!',
            data: combo,
        });

        res.status(respone.statusCode).json(respone);
    }

    async removeDish(req: Request, res: Response) {
        const { comboId, dishId } = req.params;
        const combo = await ComboService.removeDishFromCombo(comboId, dishId);

        const respone = createResponse({
            statusCode: 200,
            message: 'Remove dish from combo successful!',
            data: combo,
        });

        res.status(respone.statusCode).json(respone);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const combo = await ComboService.delete(id);

        const respone = createResponse({
            statusCode: 200,
            message: 'Delete combo successful!',
            data: combo,
        });

        res.status(respone.statusCode).json(respone);
    }
}

export default new ComboController();
