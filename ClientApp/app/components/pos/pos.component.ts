import {
    Component,
    OnInit,
    trigger,
    state,
    style,
    animate,
    transition
} from "@angular/core";
import { CabinsService } from "../../services/cabins.service";
import { Cabin } from "../../models/cabin";
import { Kid } from "../../models/kid";
import { KidsService } from "../../services/kids.service";
import { Modal } from "angular2-modal/plugins/bootstrap";
import { TransactionsService } from "../../services/transactions.service";
import { TransactionType } from "../../models/transactionType";

@Component({
    templateUrl: 'pos.component.html',
    animations: [
        trigger('collapsable', [
            state('shown', style({ height: '*', overflow: 'hidden' })),
            state('hidden', style({ height: '0', overflow: 'hidden'  })),
            transition('hidden => shown', animate('100ms ease-in')),
            transition('shown => hidden', animate('100ms ease-out'))
        ])
    ]
})
export class PosComponent implements OnInit {
    cabins: Cabin[] = [];
    selectedCabin: Cabin;
    kids: Kid[] = [];
    activeKidId = 0;

    constructor(
        private cabinsService: CabinsService,
        private kidsService: KidsService,
        private transactionsService: TransactionsService,
        private modal: Modal
    ) { }

    ngOnInit() {
        this.cabinsService.getCabins().first().subscribe(res => {
            this.cabins = res;
            var allCabin = { id: 0, name: "- All Cabins -", kids: [] }
            this.selectedCabin = allCabin;
            this.cabins.push(allCabin);
        });
    }

    cabinSelected(cabin) {
        console.log("You randg?");
        this.kidsService.getKids().first().subscribe(res => {
            this.kids = res;
            console.log(res);
        });
    }

    makePurchase(kid: Kid) {
        console.log("makePurchase");
        this.modal.prompt()
            .title("Purchase")
            .message("Enter purchase amount (without $):")
            .defaultValue("")
            .open().then(dialog => dialog.result.then(result => {
                if (+result != NaN) {
                    kid.balance -= +result;
                    this.transactionsService.create({ amount: +result * -1, type: TransactionType.Purchase, kidId: kid.id }).first().subscribe(
                        null,
                        () => {
                            kid.balance += +result;
                        }
                    )
                }
            }, cancel => cancel));
    }

    activateKid(kidId: number) {
        if (this.activeKidId == kidId) {
            this.activeKidId = 0;
        } else {
            this.activeKidId = kidId;
        }
        console.log(this.activeKidId);
    }

    isKidActive(kidId: number): string {
        if (this.activeKidId == kidId)
            return 'shown';

        return 'hidden';
    }
}