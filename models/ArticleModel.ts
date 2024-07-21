
export class ArticleModel {
  name: string;
  price: number;
  description: string;
  imageUrl: string[];
  categoryId: number;
  tax?: number;
  id?: number;
  isVisible?: boolean;
  isActived?: boolean;

  constructor(
    name: string,
    price: number,
    description: string,
    imageUrl: string[],
    categoryId: number,
    tax?: number,
    id?: number,
    isVisible?: boolean,
    isActived?: boolean
  ) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.categoryId = categoryId;
    this.imageUrl = imageUrl;
    this.tax = tax;
    this.id = id;
    this.isVisible = isVisible;
    this.isActived = isActived;

  }
}