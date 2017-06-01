import { Component, OnInit } from "@angular/core";
import { CabinsService } from "../../services/cabins.service";
import { Kid } from "../../models/kid";
import 'rxjs/add/operator/first';
import { Cabin } from "../../models/cabin";
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
    templateUrl: './cabin-list.component.html',
    styleUrls: ['./cabin-list.component.css']
})
export class CabinListComponent implements OnInit {
    cabins: Cabin[] = [];

    constructor(
        private modal: Modal,
        private cabinsService: CabinsService) { }

    ngOnInit() {
        this.cabinsService.getCabins().first().subscribe(c => this.cabins = c);
    }

    editCabin(cabin: Cabin) {
        var oldName = cabin.name;
        this.modal.prompt()
            .title("Edit " + oldName)
            .defaultValue(oldName)
            .message("Enter a new name for " + oldName + ":")
            .open().then(dialog => dialog.result.then(result => {
                cabin.name = result;
                this.cabinsService.update({ id: cabin.id, name: result }).first().subscribe(
                    null,
                    () => {
                        cabin.name = oldName;
                    }
                )
            }, cancel => cancel));
    }

    deleteCabin(cabin: Cabin) {
        this.modal.confirm()
            .title("Confirm Delete")
            .message("Are you sure you want to delete " + cabin.name + "?")
            .open().then(dialog => dialog.result.then(result => {
                var index = this.cabins.indexOf(cabin);
                this.cabins.splice(index, 1);
                this.cabinsService.delete(cabin.id).first().subscribe(
                    null,
                    () => {
                        this.cabins.splice(index, 0, cabin);
                    }
                )
            }, cancel => cancel));
    }

    addCabin() {
        this.modal.prompt()
            .title("Add Cabin")
            .defaultValue("")
            .message("Enter a new name for the new cabin:")
            .open().then(dialog => dialog.result.then(result => {
                if (result) {
                    var newCabin = { id: 0, name: result, kids: [] }
                    this.cabins.push(newCabin);
                    this.cabinsService.create({ id: newCabin.id, name: newCabin.name }).first().subscribe(
                        res => newCabin.id = res.id,
                        () => {
                            var index = this.cabins.findIndex(c => c.id == 0 && c.name == result);
                            this.cabins.splice(index, 1);
                        }
                    )
                }
            }, cancel => cancel));
    }
}