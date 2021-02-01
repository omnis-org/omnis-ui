import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService, AlertService } from '@app/@core/services';
import { OmnisMachine } from '@core/models/omnis';
import { MachineService } from '@core/services';

@Component({
    selector: 'app-machine-details',
    styleUrls: ['./machine-details.component.scss'],
    templateUrl: './machine-details.component.html',
})
export class MachineDetailsComponent implements OnInit, OnChanges {
    @Input() machine: OmnisMachine;
    @Output() delete = new EventEmitter<boolean>();
    form: FormGroup;
    loading = false;
    loading2 = false;
    submitted = false;


    constructor(public accountService: AccountService,
        private formBuilder: FormBuilder,
        private machineService: MachineService,
        private alertService: AlertService) { }

    get f() { return this.form.controls; }

    ngOnInit() {
        if (this.machine !== undefined) {
            this.form = this.formBuilder.group({
                id: ['', Validators.nullValidator],
                uuid: [{ value: '', disabled: true }, Validators.required],
                serialNumber: [{ value: '', disabled: true }, Validators.nullValidator],
                hostname: ['', Validators.nullValidator],
                label: ['', Validators.required],
                description: ['', Validators.nullValidator],
                virtualizationSystem: ['', Validators.nullValidator],
                perimeterId: ['', Validators.nullValidator],
                locationId: ['', Validators.nullValidator],
                operatingSystemId: ['', Validators.nullValidator],
                machineType: ['', Validators.nullValidator],
                omnisVersion: ['', Validators.nullValidator]
            });

            this.form.patchValue(this.machine);
        }
    }

    ngOnChanges() {
        if (this.form != null) {
            this.form.patchValue(this.machine);
        }
    }

    onSave() {
        if (this.machine !== undefined) {
            this.submitted = true;

            // stop here if form is invalid
            if (this.form.invalid) {
                return;
            }

            this.loading = true;
            //Subscription to the machine update function observable
            this.machineService.update(this.form.value)
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
        if (this.machine !== undefined) {
            this.loading2 = true;
            //Subscription to the machine delete function observable
            this.machineService.delete(this.machine.id)
                .subscribe({
                    //when a new value is deleted in the observable object, the alertService displays an alert
                    next: () => {
                        this.alertService.success('Delete successful');
                        this.delete.emit(true);
                        this.loading2 = false;
                    },
                    //if anithing goes wrong, an error alert is displayed
                    error: error => {
                        this.alertService.error(error);
                        this.loading2 = false;
                    }
                });
        }
    }
}
