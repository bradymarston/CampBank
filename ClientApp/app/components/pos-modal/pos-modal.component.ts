import { Component } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from "angular2-modal";
import { Kid } from "../../models/kid";


import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

export class PosModalContext extends BSModalContext {
    public kid: Kid;
}


@Component({
    selector: 'pos-modal',
    templateUrl: './pos-modal.component.html'
})
export class PosModalComponent implements CloseGuard, ModalComponent<PosModalContext> {
    addends: Addend[] = [];

    constructor(public dialog: DialogRef<PosModalContext>) { }

    get total(): number {
        let sum = 0;

        for (let i = 0; i < this.addends.length; i++)
            sum += this.addends[i].amount;

        return sum;
    }

    get kid(): Kid {
        return this.dialog.context.kid;
    }

    addAddend(amount: number) {
        const newId = this.addends.length === 0 ? 0 : this.addends[this.addends.length - 1].id + 1;
        this.addends.push({
            id: newId,
            amount: amount
        });
    }

    removeAddend(id: number) {
        const indexToRemove = this.addends.findIndex(a => a.id === id);

        this.addends.splice(indexToRemove, 1);
    }

    submit() {
        this.dialog.close(this.total);
    }

    cancel() {
        this.dialog.dismiss();
    }
}

interface Addend {
    id: number;
    amount: number;
}