import { Types } from "mongoose";

export enum ERole {
    USER = "user",
    ADMIN = "admin",
    SELLER = "seller",
    GEST = "gest",
}

export interface IAddress {
  address: string;
  postcode: string;
}

export interface IRegisteringUser {
    name: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    role: ERole,
}

export interface IUser extends IRegisteringUser {
  _id: Types.ObjectId;
  addresses: IAddress[];
  isEmailVerified: boolean,
  isPhoneVerified: boolean
}