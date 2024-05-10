export  class PromotionArticleModel {
    price: number;
    description: string;
    article_id: number;
    promotion_id: number;

    constructor(
        price: number,
    description: string,
    article_id: number,
    promotion_id: number,
    ) {
        this.article_id = article_id;
        this.description = description;
        this.promotion_id = promotion_id;
        this.price = price;
    }
}