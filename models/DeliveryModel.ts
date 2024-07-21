export class DeliveryModel {
    city: string;
    quarter: string;
    deliveryDate: string;
    deliveryHoures: string;
    codePromo: string;
    indiqueName: string;
    indiqueNumber: number;
    longitude: string;
    latitude: string;
    description: string;
    user_id: number;

    constructor(
        city: string,
        quarter: string,
        deliveryDate: string,
        deliveryHoures: string,
        codePromo: string,
        indiqueName: string,
        indiqueNumber: number,
        longitude: string,
        latitude: string,
        description: string,
        user_id: number,
    ) {
        this.city = city;
        this.quarter = quarter;
        this.deliveryDate = deliveryDate;
        this.deliveryHoures = deliveryHoures;
        this.codePromo = codePromo;
        this.indiqueName = indiqueName;
        this.indiqueNumber = indiqueNumber;
        this.longitude = longitude;
        this.latitude = latitude;
        this.description = description;
        this.user_id = user_id;
    }
}