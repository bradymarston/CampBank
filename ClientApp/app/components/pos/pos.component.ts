import {
    Component,
    OnInit,
    OnDestroy,
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
import { Transaction } from "../../models/transaction";
import { UserService } from "../../services/user.service";
import { ToastyService } from "ng2-toasty";
import { PosModalComponent } from "../pos-modal/pos-modal.component";
import { overlayConfigFactory } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';


@Component({
    templateUrl: 'pos.component.html'
})
export class PosComponent implements OnInit, OnDestroy {
    cabins: Cabin[] = [];
    selectedCabin: Cabin;
    kids: Kid[] = [];
    filteredKids: Kid[] = [];
    searchText = '';
    activeKidId = 0;
    transactions: Transaction[] = [];
    userName: string;
    timerId: any;

    constructor(
        private cabinsService: CabinsService,
        private kidsService: KidsService,
        private transactionsService: TransactionsService,
        private userService: UserService,
        private toastyService: ToastyService,
        private modal: Modal
    ) { }

    ngOnInit() {
        this.selectedCabin = null;
        this.retrieveCabins();
        this.timerId = setInterval(() => this.retrieveCabins(), 20000);
        this.userName = this.userService.getUserName();
    }

    ngOnDestroy() {
        clearInterval(this.timerId);
    }

    retrieveCabins() {
        this.cabinsService.getCabins(true).first().subscribe(res => {
            var newCabinList = res;
            var allCabin = { id: 0, name: "- All Cabins -", kids: [] }
            newCabinList.push(allCabin);
            this.cabins = newCabinList;

            if (this.selectedCabin == null)
                this.cabinSelected(allCabin);
            else
                this.cabinSelected(this.cabins.find(searchCabin => searchCabin.id == this.selectedCabin.id));
        },
            () => {
                this.toastyService.error({
                    title: "Error",
                    msg: "Could not retrieve kids from server.",
                    theme: "bootstrap",
                    showClose: true,
                    timeout: 5000
                });
            }
        );
    }

    cabinSelected(cabin: Cabin) {
        this.selectedCabin = cabin;
        if (cabin.id > 0)
            this.kids = cabin.kids;
        else {
            this.kids = [];
            this.cabins.forEach(c => {
                this.kids = this.kids.concat(c.kids);
            });
        }
        this.filterKids();
    }

    makePurchase(kid: Kid) {
        this.modal.open(PosModalComponent, overlayConfigFactory({ kid: kid }, BSModalContext))
                .then(dialog => dialog.result.then(result => {
                if (+result != NaN) {
                    kid = this.kids.find(searchKid => searchKid.id == kid.id);
                    kid.balance -= +result;
                    this.transactionsService.create({ amount: +result * -1, type: TransactionType.Purchase, kidId: kid.id }).first().subscribe(
                        updatedKid => {
                            kid = this.kids.find(searchKid => searchKid.id == kid.id);
                            kid.balance = updatedKid.balance;
                        },
                        () => {
                            this.toastyService.error({
                                title: "Error",
                                msg: "Something went wrong on the server trying process " + kid.name + "'s purcahse.",
                                theme: "bootstrap",
                                showClose: true,
                                timeout: 5000
                            });
                            kid = this.kids.find(searchKid => searchKid.id == kid.id);
                            kid.balance += +result;
                        }
                    )
                }
            }, cancel => cancel));
    }

    updateSearch(text) {
        this.searchText = text.searchText;
        this.filterKids();
    }

    filterKids() {
        this.filteredKids = this.kids.filter(kid => kid.name.toUpperCase().includes(this.searchText.toUpperCase()));
    }

    activateKid(kidId: number) {
        if (this.activeKidId == kidId) {
            this.activeKidId = 0;
            this.transactions = [];
        } else {
            this.transactions = [];
            this.activeKidId = kidId;
            this.kidsService.getKid(kidId).first().subscribe(
                kid => this.transactions = kid.transactions.sort((a, b) => b.id - a.id),
                () => {
                    this.toastyService.error({
                        title: "Error",
                        msg: "Cannot retrieve transactions from the server.",
                        theme: "bootstrap",
                        showClose: true,
                        timeout: 5000
                    });
                }
            );
        }
    }

    isKidActive(kidId: number): boolean {
        if (this.activeKidId == kidId)
            return true;

        return false;
    }

    reverseTransaction(transaction: Transaction) {
        var transactionType = "";

        switch (transaction.type) {
            case TransactionType.Withdrawl:
                transactionType = "witdrawl";
                break;
            case TransactionType.Deposit:
                transactionType = "deposit";
                break;
            case TransactionType.Purchase:
                transactionType = "purchase";
                break;
            default:
                transactionType = "correction";
        }

        console.log(transaction);

        this.modal.confirm()
            .title("Reverse Transaction")
            .message("Are you sure you want to reverse this $" + Math.abs(transaction.amount).toFixed(2) + " " + transactionType + "?")
            .open().then(dialog => dialog.result.then(result => {
                var newTransaction = {
                    amount: transaction.amount * -1,
                    type: transaction.type < 3 ? transaction.type + 3 : transaction.type,
                    kidId: this.activeKidId
                };
                var fillInTransaction = {
                    id: 0,
                    type: <TransactionType>newTransaction.type,
                    amount: newTransaction.amount,
                    kidId: newTransaction.kidId,
                    userName: this.userName,
                    timeStamp: new Date()
                }
                this.kids.find(k => k.id == newTransaction.kidId).balance += newTransaction.amount;
                this.transactions.unshift(fillInTransaction);
                this.transactionsService.create(newTransaction).first().subscribe(updatedKid => {
                    this.kids.find(k => k.id == newTransaction.kidId).balance = updatedKid.balance;
                    this.transactions = updatedKid.transactions.sort((a, b) => b.id - a.id);
                },
                    error => {
                        this.toastyService.error({
                            title: "Error",
                            msg: "Something went wrong on the server trying to reverse that transaction.",
                            theme: "bootstrap",
                            showClose: true,
                            timeout: 5000
                        });
                        this.transactions.splice(0, 1);
                        this.kids.find(k => k.id == newTransaction.kidId).balance -= newTransaction.amount;
                    }
                )
            }, cancel => cancel));
;
    }
}