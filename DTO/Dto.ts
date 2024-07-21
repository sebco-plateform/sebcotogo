import Joi from "joi";


export class Dto {
    static userDto() {
        const schema = Joi.object({
// Suggested code may be subject to a license. Learn more: ~LicenseLog:87073855.
            phone: Joi.number().required(),
            password: Joi.string().required(),
            email: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            role: Joi.string().required(),
            id: Joi.number().optional(),
            isVisible: Joi.boolean().optional(),
            isActived: Joi.boolean().optional()
        });
        return schema;
    }

    static characteristicDto() {
        const schema = Joi.object({
            name: Joi.string().required(),
            value: Joi.string().required(),
            id: Joi.number().optional(),
            isVisible: Joi.boolean().optional(),
            isActived: Joi.boolean().optional()
        });

        return schema;
    }

    static categoryDto() {
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().optional(),
            imageUrl: Joi.string().required(),
            id: Joi.number().optional(),
            isVisible: Joi.boolean().optional(),
            isActived: Joi.boolean().optional()
        });

        return schema;
    }

    static productDto() {
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            imageUrl: Joi.string().required(),
            price: Joi.number().required(),
            tax: Joi.number().optional(),
            categoryId: Joi.number().required(),
            id: Joi.number().optional(),
            isVisible: Joi.boolean().optional(),
            isActived: Joi.boolean().optional()
        });

        return schema;
    }
}