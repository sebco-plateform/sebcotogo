export class UserModel {
    phone: number;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    id?: number;
    isVisible?: boolean;
    isActived?: boolean;

    constructor(
        phone: number,
        password: string,
        email: string,
        firstName: string,
        lastName: string,
        role: string,
        id?: number,
        isVisible?: boolean,
        isActived?: boolean
    ) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.phone = phone;
        this.role = role;
        this.id = id;
        this.isVisible = isVisible;
        this.isActived = isActived;
    }


}