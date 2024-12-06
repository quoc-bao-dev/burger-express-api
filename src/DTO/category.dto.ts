class CategoryDTO {
    id: string;
    name: string;
    slug: string;
    orderNumber: number;
    constructor(payload: any) {
        this.id = payload._id;
        this.name = payload.name;
        this.slug = payload.slug;
        this.orderNumber = payload.orderNumber;
    }
}

export default CategoryDTO;
