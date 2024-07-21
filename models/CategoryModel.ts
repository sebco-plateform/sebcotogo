export class CategoryModel {
    name: string;
    description?: string;
    imageUrl: string;
    id?: number;
    isVisible?: boolean;
    isActived?: boolean;

    constructor(
        name: string,
        imageUrl: string,
        description?: string,
        id?: number,
        isVisible?: boolean,
        isActived?: boolean
    ) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.id = id;
        this.isVisible = isVisible;
        this.isActived = isActived;
    }
}