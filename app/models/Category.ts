export class CategoryModel {
    catName: string;
    description: string;
    imageUrl: string;
    id ?: number;

    constructor(
        catName: string,
    description: string,
        imageUrl: string,
        id ?: number,
    ) {
        this.catName = catName;
        this.description = description;
        this.imageUrl = imageUrl;
        this.id = id;
    }
}