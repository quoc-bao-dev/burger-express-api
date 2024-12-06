import { PromotionDocument } from '../promotion.schema';

export type CreateDishPromotionInput = Pick<
    PromotionDocument,
    | 'name'
    | 'typeDiscount'
    | 'description'
    | 'targetDishs'
    | 'discountValue'
    | 'discountPercentage'
    | 'timeStart'
    | 'timeEnd'
> & {
    type: 'dish';
};

export type CreateComboPromotionInput = Pick<
    PromotionDocument,
    | 'name'
    | 'description'
    | 'typeDiscount'
    | 'targetCombos'
    | 'discountValue'
    | 'discountPercentage'
    | 'timeStart'
    | 'timeEnd'
> & {
    type: 'combo';
};

export type CreatePromotionInput =
    | CreateComboPromotionInput
    | CreateDishPromotionInput;
