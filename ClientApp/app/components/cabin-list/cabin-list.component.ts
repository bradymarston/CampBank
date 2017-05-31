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

    editCabin(id) {
        var index = this.cabins.findIndex(c => c.id == id);
        var oldName = this.cabins[index].name;
        this.modal.prompt()
            .title("Edit " + oldName)
            .defaultValue(oldName)
            .message("Enter a new name for " + oldName + ":")
            .open().then(dialog => dialog.result.then(result => {
                index = this.cabins.findIndex(c => c.id == id);
                this.cabins[index].name = result;
                this.cabinsService.update({ id: id, name: result }).first().subscribe(
                    null,
                    () => {
                        index = this.cabins.findIndex(c => c.id == id);
                        this.cabins[index].name = oldName;
                    }
                )
            }, cancel => cancel));
    }

    deleteCabin(id) {
        var index = this.cabins.findIndex(c => c.id == id);
        var oldName = this.cabins[index].name;
        this.modal.confirm()
            .title("Confirm Delete")
            .message("Are you sure you want to delete " + oldName + "?")
            .open().then(dialog => dialog.result.then(result => {
                index = this.cabins.findIndex(c => c.id == id);
                var oldCabin = this.cabins.splice(index, 1);
                this.cabinsService.delete(id).first().subscribe(
                    null,
                    () => {
                        console.log(index);
                        console.log(oldCabin);
                        console.log(this.cabins.length);
                        this.cabins.splice(index, 0, oldCabin[0]);
                    }
                )
            }, cancel => cancel));
    }

    addCabin()
    {
        this.modal.prompt()
            .title("Add Cabin")
            .defaultValue("New Cabin")
            .message("Enter a new name for the new cabin:")
            .open().then(dialog => dialog.result.then(result => {
                var newCabin = {id: 0, name: result, kids: []}
                this.cabins.push(newCabin);
                this.cabinsService.create({ id: newCabin.id, name: newCabin.name }).first().subscribe(
                    res => newCabin.id = res.id,
                    () => {
                        var index = this.cabins.findIndex(c => c.id == 0 && c.name == result);
                        this.cabins.splice(index, 1);
                    }
                )
            }, cancel => cancel));
    }
}