export class CustomerModel {
    phone: number;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    id?: number;

    constructor(
         phone: number,
         password: string,
         email: string,
         firstName: string,
         lastName: string,
         role: string,
    ) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.phone = phone;
        this.role = role;
    }


}