import { DishDocument } from '../dish.schema';

export interface CreateDishInput
    extends Pick<
        DishDocument,
        'name' | 'image' | 'description' | 'price' | 'sizes'
    > {
    category: string;
    subCategory: string;
}

export interface UpdateDishInput extends Partial<CreateDishInput> {
    available?: boolean;
    orderNumber?: number;
}
