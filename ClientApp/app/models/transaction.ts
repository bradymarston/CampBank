import { TransactionType } from "./transactionType";

export interface Transaction {
    id: number;
    type: TransactionType;
    amount: number;
    kidId: number;
    userName: string;
    timeStamp: Date;
}

export interface SaveTransaction {
    type: TransactionType;
    amount: number;
    kidId: number;
}