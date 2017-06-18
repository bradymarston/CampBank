import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import { Transaction, SaveTransaction } from "../models/transaction";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

@Injectable()
export class TransactionsService {
    apiUrl = "api/transactions"

    constructor(private http: Http) { }

    getTransactions(kidId = 0): Observable<Transaction[]> {
        return this.http.get(this.apiUrl + "?kidId=" + kidId)
            .map(res => res.json());
    }

    getTransaction(id: Number) {
        return this.http.get(this.apiUrl + "/" + id)
            .map(res => res.json());
    }

    create(transaction: SaveTransaction) {
        return this.http.post(this.apiUrl, transaction)
            .map(res => res.json());
    }

    exists(id) {
        return this.http.delete(this.apiUrl + "/" + id);
    }
}