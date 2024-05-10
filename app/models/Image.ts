
export class ImageModel {
    imageName: string;
    imageUrl: string;
    article_id ?: any;
    id?: string;

    constructor(
        imageName: string,
    imageUrl: string,
    article_id ?: any,
    ) {
        this.imageUrl = imageUrl;
        this.imageName = imageName;
        this.article_id = article_id;
    }
}