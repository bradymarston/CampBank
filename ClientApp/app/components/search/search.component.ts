import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debouncetime';


@Component({
    selector: 'search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
    @Output() onChanged = new EventEmitter();
    @Input() debounceInterval = 400;
    form: FormGroup;
    subscription;

    constructor(fb: FormBuilder) {
        this.form = fb.group({
            searchText: ['']
        })
    }

    ngOnInit() {
        this.subscription = this.form.controls["searchText"].valueChanges
            .debounceTime(this.debounceInterval)
            .subscribe(() => {
                console.log(this.form.controls["searchText"].value);
                this.onChanged.emit({ searchText: this.form.controls["searchText"].value });
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}