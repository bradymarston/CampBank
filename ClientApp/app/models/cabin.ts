import { Kid } from './kid';

export interface Cabin {
    id: number;
    name: string;
    kids: Kid[];
}

export interface SaveCabin {
    id: number;
    name: string;
}