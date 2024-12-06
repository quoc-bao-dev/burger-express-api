import { ComboDocument } from '../combo.schema';

export interface CreateComboInput
    extends Pick<ComboDocument, 'name' | 'price' | 'image' | 'description'> {
    items: { dishId: string; quantity: number; options: string }[];
    timeRange?: {
        timeStart: Date;
        timeEnd: Date;
    };
    promotion?: null;
}

export interface UpdateComboInput
    extends Partial<Omit<CreateComboInput, 'items'>> {
    orderNumber?: number;
}
