import { Cabin } from "./cabin";

export interface Kid {
    id: number;
    name: string;
    balance: number;
    cabinId: number;
    cabin: Cabin;
}

export interface SaveKid {
    id: number;
    name: string;
    cabinId: number;
}