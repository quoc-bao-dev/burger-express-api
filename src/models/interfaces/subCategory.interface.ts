import { SubCategoryDocument } from '../subCategory.schema';

export interface CreateSubCategoryInput
    extends Pick<SubCategoryDocument, 'name' | 'image'> {
    category: string;
}

export interface UpdateSubCategoryInput
    extends Partial<CreateSubCategoryInput> {
    orderNumber?: number;
}
