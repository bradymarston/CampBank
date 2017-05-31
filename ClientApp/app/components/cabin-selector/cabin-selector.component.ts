import { Component, Input, EventEmitter, Output } from "@angular/core";
import { CabinsService } from "../../services/cabins.service";
import { Cabin } from "../../models/cabin";

@Component({
    selector: 'cabin-selector',
    templateUrl: 'cabin-selector.component.html'
})
export class CabinSelectorComponent {
    @Input() cabins: Cabin[];
    @Input() selectedCabin: Cabin;
    @Output() selectionChanged = new EventEmitter();
    constructor(private cabinsService: CabinsService) { }

    cabinSelected(cabin: Cabin) {
        this.selectedCabin = cabin;

        this.selectionChanged.emit(cabin);
    }
}