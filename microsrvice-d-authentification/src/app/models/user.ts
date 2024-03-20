import { Role } from "./enum/role";

export interface User {
    id : number;
    userName : string;
    email : string;
    password : string;
    role : Role;
}
