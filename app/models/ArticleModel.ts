export class ArticleModel {
    articleName: string;
    description: string;
    price: number;
    tax: number;
    id?: number;
    constructor(
        articleName: string,
description: string,
price: number,
tax: number,
    ) {
        this.articleName = articleName;
        this.description = description;
        this.price = price;
        this.tax = tax;
    }
}