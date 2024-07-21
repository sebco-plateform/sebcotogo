export class OrderModel {
    totalPrice: number;
    status: string;
    user_id: number;
    delivery_id: number;
    id?: number;

    constructor(
        totalPrice: number,
        status: string,
        user_id: number,
        delivery_id: number,
    ) {
        this.totalPrice = totalPrice;
        this.status = status;
        this.user_id = user_id;
        this.delivery_id = delivery_id;
    }


}
