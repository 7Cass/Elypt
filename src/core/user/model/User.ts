import Wallet from "../../wallet/model/Wallet";

export default interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    wallet?: Wallet;
    createdAt: Date;
    updatedAt: Date;
}