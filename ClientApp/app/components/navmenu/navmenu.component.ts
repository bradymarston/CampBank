import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    linkClicked() {
        console.log($(".navbar-collapse").collapse("hide"));
    }
}
