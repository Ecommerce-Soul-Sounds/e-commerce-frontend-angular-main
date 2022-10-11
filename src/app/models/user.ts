import { Address } from "./address";


export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: Address;
    picture: string;


    constructor (id: number, firstName: string, lastName: string, email: string, password: string, address: Address, picture:string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.address = address;
        this.picture = picture;
    }
}