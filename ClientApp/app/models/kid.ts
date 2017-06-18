import { Cabin } from "./cabin";
import { Transaction } from "./transaction";

export interface Kid {
    id: number;
    name: string;
    balance: number;
    cabinId: number;
    cabin: Cabin;
    transactions: Transaction[];
}

export interface SaveKid {
    id: number;
    name: string;
    cabinId: number;
}