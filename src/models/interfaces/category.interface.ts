import { CategoryDocument } from '../category.schema';

export interface CreateCategoryInput extends Pick<CategoryDocument, 'name'> {}

export interface UpdateCategoryInput extends Partial<CreateCategoryInput> {
    orderNumber?: number;
}
