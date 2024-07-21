export class OrderArticleModel {
    quantity: number;
    price: number;
    article_id: number;
    order_id: number;

    constructor(
        quantity: number,
        price: number,
        article_id: number,
        order_id: number,
    ) {
        this.quantity = quantity;
        this.price = price;
        this.article_id = article_id;
        this.order_id = order_id;
    }
}