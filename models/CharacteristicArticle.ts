export class CharacteristicArticleModel {
    productId: number;
    characteristicId: number;
    id?: number

    constructor(
        productId: number,
        characteristicId: number,
        id?: number
    ) {
        this.productId = productId;
        this.characteristicId = characteristicId;
        this.id = id;
    }
}