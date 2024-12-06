import { ToppingDocument } from '../topping.schema';

export interface CreateToppingInput
    extends Pick<
        ToppingDocument,
        'name' | 'image' | 'price' | 'applicableTo'
    > {}
