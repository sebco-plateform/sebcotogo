export class PromotionModel {
    beginDate: string;
    endDate: string;
    description: string;

    constructor(
        beginDate: string,
    endDate: string,
    description: string,
    ) {
        this.description = description;
        this.endDate = endDate;
        this.beginDate = beginDate;
    }
}