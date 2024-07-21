class CartModel {
    id: string;
    name: string;
    image: string;
    price: number;
    priceTotal: number;
    quantity: number;

    constructor(
        id: string,
    name: string,
    image: string,
    price: number,
    priceTotal: number,
    quantity: number,
    ) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.priceTotal = priceTotal;
        this.quantity = quantity;
    }
}

export default CartModel;
