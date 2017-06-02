import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from "../../services/user.service";
import { Http } from "@angular/http";
import { Router } from "@angular/router";

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnInit {
    userName: string;

    constructor(private userService: UserService, private http: Http, private router: Router) {}

    linkClicked() {
        console.log($(".navbar-collapse").collapse("hide"));
    }

    ngOnInit() {
        this.userName = this.userService.getUserName();
    }

    logOut() {
        this.http.post("/account/logout", {}).first().subscribe(() => this.router.navigateByUrl("/account/login"));
    }
}
