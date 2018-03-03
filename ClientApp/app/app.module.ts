import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { CabinsService } from "./services/cabins.service";
import { CabinListComponent } from "./components/cabin-list/cabin-list.component";
import { HttpModule, JsonpModule } from "@angular/http";
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { CabinSelectorComponent } from "./components/cabin-selector/cabin-selector.component";
import { KidListComponent } from "./components/kid-list/kid-list.component";
import { KidsService } from "./services/kids.service";
import { SortArrayByNamePipe } from "./services/sort-array-by-name.pipe";
import { DummyPipe } from "./services/dummy.pipe";
import { UserService } from "./services/user.service";
import { PosComponent } from "./components/pos/pos.component";
import { ToastyModule } from "ng2-toasty";
import { TransactionsService } from "./services/transactions.service";
import { TransactionListComponent } from "./components/transaction-list/transaction-list.component";
import { SearchComponent } from "./components/search/search.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CabinSelectorComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        SortArrayByNamePipe,
        DummyPipe,
        CabinListComponent,
        KidListComponent,
        PosComponent,
        SearchComponent,
        TransactionListComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        ModalModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        BootstrapModalModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'pos', pathMatch: 'full' },
            { path: 'cabins', component: CabinListComponent },
            { path: 'kids', component: KidListComponent },
            { path: 'pos', component: PosComponent },
            { path: '**', redirectTo: 'pos' }
        ])
    ],
    providers: [
        CabinsService,
        KidsService,
        TransactionsService,
        UserService
    ]
})
export class AppModule {
}
