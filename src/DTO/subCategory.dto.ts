class SubCategoryDTO {
    id: string;
    name: string;
    slug: string;
    image: string;
    orderNumber: number;
    category: {
        name: string;
        slug: string;
    };

    constructor(payload: any) {
        this.id = payload._id;
        this.name = payload.name;
        this.slug = payload.slug;
        this.image = payload.image;
        this.orderNumber = payload.orderNumber;
        this.category = {
            name: payload.category.name,
            slug: payload.category.slug,
        };
    }
}

export default SubCategoryDTO;
