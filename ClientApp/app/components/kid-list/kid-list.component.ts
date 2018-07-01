import { Component, OnInit } from "@angular/core";
import { KidsService } from "../../services/kids.service";
import { CabinsService } from "../../services/cabins.service";
import { Cabin } from "../../models/cabin";
import { Kid } from "../../models/kid";
import { Modal } from "angular2-modal/plugins/bootstrap";
import { ToastyService } from "ng2-toasty";

@Component({
    templateUrl: 'kid-list.component.html',
    styleUrls: ['kid-list.component.css']
})
export class KidListComponent implements OnInit {
    cabins: Cabin[] = [];
    selectedCabin: Cabin;
    kids: Kid[] = [];

    constructor(
        private kidsService: KidsService,
        private cabinsService: CabinsService,
        private toastyService: ToastyService,
        private modal: Modal
    ) { }

    ngOnInit() {
        this.cabinsService.getCabins(true).first().subscribe(c => {
            this.cabins = c;
            this.cabinSelected(c[0]);
        },
            () => {
                this.toastyService.error({
                    title: "Error",
                    msg: "Cannot retrieve kids from server.",
                    theme: "bootstrap",
                    showClose: true,
                    timeout: 5000
                });
            }
        );
    }

    cabinSelected(cabin: Cabin) {
        this.selectedCabin = cabin;
        this.kids = this.selectedCabin.kids;
    }

    addKid() {
        this.modal.prompt()
            .title("Add Kid to " + this.selectedCabin.name)
            .message("Please enter a name for the new kid:")
            .defaultValue("")
            .open().then(dialog => dialog.result.then(result => {
                if (result) {
                    var newKid = { id: 0, name: result, balance: 0, cabinId: this.selectedCabin.id, cabin: null, transactions: [] }
                    this.kids.push(newKid);
                    this.kidsService.create({ id: newKid.id, name: newKid.name, cabinId: newKid.cabinId }).first().subscribe(
                        res => {
                            newKid.id = res.id;
                            newKid.cabin = res.cabin;
                            this.makeDeposit(newKid, true);
                        },
                        () => {
                            this.toastyService.error({
                                title: "Error",
                                msg: "Something went wrong on the server trying to add " + newKid.name + ".",
                                theme: "bootstrap",
                                showClose: true,
                                timeout: 5000
                            });
                            var cabin = this.cabins.find(c => c.id == newKid.cabinId);
                            var index = cabin.kids.findIndex(k => k.id == 0 && k.name == result);
                            cabin.kids.splice(index, 1);
                        }
                    )
                }
            }, cancel => cancel));
    }

    editKid(kid: Kid) {
        var oldName = kid.name;
        this.modal.prompt()
            .title("Edit " + oldName)
            .defaultValue(oldName)
            .message("Enter a new name for " + oldName + ":")
            .open().then(dialog => dialog.result.then(result => {
                kid.name = result;
                this.kidsService.update({ id: kid.id, name: result, cabinId: kid.cabinId }).first().subscribe(
                    null,
                    () => {
                        this.toastyService.error({
                            title: "Error",
                            msg: "Something went wrong on the server trying to rename " + oldName + " to " + kid.name + ".",
                            theme: "bootstrap",
                            showClose: true,
                            timeout: 5000
                        });
                        kid.name = oldName;
                    }
                )
            }, cancel => cancel));
    }

    deleteKid(kid: Kid) {
        this.modal.confirm()
            .title("Confirm Delete")
            .message("Are you sure you want to delete " + kid.name + "?")
            .open().then(dialog => dialog.result.then(result => {
                var index = this.kids.indexOf(kid);
                this.kids.splice(index, 1);
                this.kidsService.delete(kid.id).first().subscribe(
                    null,
                    () => {
                        this.toastyService.error({
                            title: "Error",
                            msg: "Something went wrong on the server trying to delete " + kid.name + ".",
                            theme: "bootstrap",
                            showClose: true,
                            timeout: 5000
                        });

                        var cabin = this.cabins.find(c => c.id == kid.cabinId);
                        cabin.kids.splice(index, 0, kid);
                    }
                )
            }, cancel => cancel));
    }

    makeDeposit(kid: Kid, initial = false) {
        this.modal.prompt()
            .title("Make " + (initial ? "Initial " : "") + "Deposit for " + kid.name)
            .message("Enter deposit amount without $: (Current balance: $" + kid.balance.toFixed(2) + ")")
            .defaultValue("")
            .open().then(dialog => dialog.result.then(result => {
                if (+result != NaN) {
                    var oldBalance = kid.balance;
                    kid.balance += +result;
                    this.kidsService.setBalance(kid.id, kid.balance).first().subscribe(
                        null,
                        () => {
                            this.toastyService.error({
                                title: "Error",
                                msg: "Something went wrong on the server trying to deposit into " + kid.name + "'s account.",
                                theme: "bootstrap",
                                showClose: true,
                                timeout: 5000
                            });
                            kid.balance = oldBalance;
                        }
                    )
                }
            }, cancel => cancel));
    }

    makeWithdrawl(kid: Kid) {
        this.kidsService.getKid(kid.id).first().subscribe(freshKid => {
            this.modal.prompt()
                .title("Make Withdrawl for " + kid.name)
                .message("Enter withdrawl amount without $: (Current balance: $" + kid.balance.toFixed(2) + ")")
                .defaultValue("")
                .open().then(dialog => dialog.result.then(result => {
                    if (+result != NaN) {
                        var oldBalance = kid.balance;
                        kid.balance -= +result;
                        this.kidsService.setBalance(kid.id, kid.balance).first().subscribe(
                            null,
                            () => {
                                this.toastyService.error({
                                    title: "Error",
                                    msg: "Something went wrong on the server trying to withdraw from " + kid.name + "'s account.",
                                    theme: "bootstrap",
                                    showClose: true,
                                    timeout: 5000
                                });
                                kid.balance = oldBalance;
                            }
                        )
                    }
                }, cancel => cancel));
        },
            () => {
                this.toastyService.error({
                    title: "Error",
                    msg: "Cannot retrieve " + kid.name + "'s updated balance from the server.",
                    theme: "bootstrap",
                    showClose: true,
                    timeout: 5000
                });
            }
        );
    }

    moveKid(kid: Kid, newCabin: Cabin) {
        this.modal.confirm()
            .title("Confirm Move")
            .message("Are you sure you want to move " + kid.name + " to " + newCabin.name + "?")
            .open().then(dialog => dialog.result.then(result => {
                var oldCabin = this.cabins.find(c => c.id == kid.cabinId);
                var oldIndex = this.kids.indexOf(kid);
     
                kid.cabinId = newCabin.id;
                oldCabin.kids.splice(oldIndex, 1);
                newCabin.kids.push(kid);

                this.kidsService.update({ id: kid.id, name: kid.name, cabinId: kid.cabinId }).first().subscribe(
                    null,
                    () => {
                        this.toastyService.error({
                            title: "Error",
                            msg: "Something went wrong on the server trying to move " + kid.name + " from " + oldCabin.name + " to " + newCabin.name + ".",
                            theme: "bootstrap",
                            showClose: true,
                            timeout: 5000
                        });
                        var newIndex = newCabin.kids.indexOf(kid);
                        newCabin.kids.splice(newIndex, 1);
                        kid.cabinId = oldCabin.id;
                        oldCabin.kids.splice(oldIndex, 0, kid);
                    }
                )
            }, cancel => cancel));

    }
}