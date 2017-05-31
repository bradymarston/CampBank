import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import { Cabin, SaveCabin } from "../models/cabin";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

@Injectable()
export class CabinsService {
    apiUrl = "api/cabins"

    constructor(private http: Http) { }

    getCabins(): Observable<Cabin[]> {
        return this.http.get(this.apiUrl)
            .map(res => res.json());
    }

    getCabin(id: Number) {
        return this.http.get(this.apiUrl + "/" + id)
            .map(res => res.json());
    }

    create(cabin: SaveCabin) {
        return this.http.post(this.apiUrl, cabin)
            .map(res => res.json());
    }

    update(cabin: SaveCabin) {
        return this.http.put(this.apiUrl + "/" + cabin.id, cabin);
    }

    delete(id) {
        return this.http.delete(this.apiUrl + "/" + id);
    }

    exists(id) {
        return this.http.delete(this.apiUrl + "/" + id);
    }
}