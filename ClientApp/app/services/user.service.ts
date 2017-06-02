import { Injectable } from "@angular/core";

@Injectable()
export class UserService {
    getUserName(): string {
        return document.getElementById("user-name-paragraph").innerText;
    }
}