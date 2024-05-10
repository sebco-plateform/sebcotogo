
export class ArticleModel {
    articleName: string;
    price: number;
    description: string;
    tax?: number;
    category_id: number;
    id ? : any;

    constructor(
      articleName: string,
    price: number,
    description: string,
    category_id: number,
      tax ?: number,
    ) {
        this.articleName = articleName;
        this.price = price;
        this.description = description;
        this.category_id = category_id;
        this.tax = tax;
        this.id = null;

    }
}