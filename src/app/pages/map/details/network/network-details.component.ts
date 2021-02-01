import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService, AlertService } from '@app/@core/services';
import { OmnisMachine } from '@core/models/omnis';
import { NetworkService } from '@core/services';

@Component({
    selector: 'app-network-details',
    styleUrls: ['./network-details.component.scss'],
    templateUrl: './network-details.component.html',
})
export class NetworkDetailsComponent implements OnInit, OnChanges {
    @Input() network: OmnisMachine;
    @Output() delete = new EventEmitter<boolean>();
    form: FormGroup;
    loading = false;
    loading2 = false;
    submitted = false;


    constructor(public accountService: AccountService,
        private formBuilder: FormBuilder,
        private networkService: NetworkService,
        private alertService: AlertService) { }

    get f() { return this.form.controls; }

    ngOnInit() {
        if (this.network !== undefined) {
            this.form = this.formBuilder.group({
                id: ['', Validators.nullValidator],
                name: ['', Validators.nullValidator],
                ipv4: ['', Validators.nullValidator],
                ipv4Mask: ['', Validators.nullValidator],
                isDmz: ['', Validators.nullValidator],
                hasWifi: ['', Validators.nullValidator]
            });

            this.form.patchValue(this.network);
        }
    }

    ngOnChanges() {
        if (this.form != null) {
            this.form.patchValue(this.network);
        }
    }

    onSave() {
        if (this.network !== undefined) {
            this.submitted = true;

            // stop here if form is invalid
            if (this.form.invalid) {
                return;
            }

            this.loading = true;
            //Subscription to the machine update function observable
            this.networkService.update(this.form.value)
                .subscribe({
                    //when a new value is updated in the observable object, the alertService displays an alert
                    next: () => {
                        this.alertService.success('Modification successful');
                        this.loading = false;
                    },
                    //if anithing goes wrong, an error alert is displayed
                    error: error => {
                        this.alertService.error(error);
                        this.loading = false;
                    }
                });
        }
    }


    onDelete() {
        if (this.network !== undefined) {
            this.loading2 = true;
            this.networkService.delete(this.network.id)
                .subscribe({
                    next: () => {
                        this.alertService.success('Delete successful');
                        this.delete.emit(true);
                        this.loading2 = false;
                    },
                    error: error => {
                        this.alertService.error(error);
                        this.loading2 = false;
                    }
                });
        }
    }
}
