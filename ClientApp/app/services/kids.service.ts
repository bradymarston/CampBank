import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import { Kid, SaveKid } from "../models/kid";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

@Injectable()
export class KidsService {
    apiUrl = "api/kids"

    constructor(private http: Http) { }

    getKids(): Observable<Kid[]> {
        return this.http.get(this.apiUrl)
            .map(res => res.json());
    }

    getKid(id: Number): Observable<Kid> {
        return this.http.get(this.apiUrl + "/" + id)
            .map(res => res.json());
    }

    create(kid: SaveKid) {
        return this.http.post(this.apiUrl, kid)
            .map(res => res.json());
    }

    setBalance(id, balance) {
        return this.http.put(this.apiUrl + "/" + id + "/balance/" + balance, {});
    }

    update(kid: SaveKid) {
        return this.http.put(this.apiUrl + "/" + kid.id, kid);
    }

    delete(id) {
        return this.http.delete(this.apiUrl + "/" + id);
    }

    exists(id) {
        return this.http.delete(this.apiUrl + "/" + id);
    }
}