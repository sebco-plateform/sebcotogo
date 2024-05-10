export class CharacteristicModel {
    charactName: string;
    value: string;
    id?: any;

    constructor(
        charactName: string,
    value: string,
    ) {
        this.charactName = charactName;
        this.value = value;
    }
}