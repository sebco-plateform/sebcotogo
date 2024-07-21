export class CommentModel {
    message: string;
    date: string;
    user_id: number;
    promotionArticle_id?: number;
    order_id?: number;
    article_id?: number;
    person_id?: number;

    constructor(
        message: string,
    date: string,
        user_id: number,
    promotionArticle_id?: number,
    order_id?: number,
    article_id?: number,
    person_id?: number,
    ) {
        this.message = message;
        this.date = date;
        this.promotionArticle_id = promotionArticle_id;
        this.user_id = user_id;
        this.order_id = order_id;
        this.article_id = article_id;
        this.person_id = person_id;
    }
}