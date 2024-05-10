export class CharacteristicArticleModel {
    description: string;
    article_id: number;
    characteristic_id: number;

    constructor(
        description: string,
    article_id: number,
    characteristic_id: number,
    ) {
        this.article_id =  article_id;
        this.characteristic_id = characteristic_id;
        this.description = description;
    }
}