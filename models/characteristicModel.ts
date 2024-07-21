export class CharacteristicModel {
    name: string;
    value: string;
    id?: number;
    isVisible?: boolean;
    isActived?: boolean;

    constructor(
        name: string,
        value: string,
        id?: number,
        isVisible?: boolean,
        isActived?: boolean
    ) {
        this.name = name;
        this.value = value;
        this.id = id;
        this.isVisible = isVisible;
        this.isActived = isActived;
    }
}