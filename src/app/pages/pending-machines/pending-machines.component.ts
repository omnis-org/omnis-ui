/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Component } from '@angular/core';
import { AlertService } from '@core/services/utils';
import { AccountService } from '@core/services/admin';
import { MachineService } from '@core/services/omnis';
import { first } from 'rxjs/operators';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-pending-machines',
  styleUrls: ['./pending-machines.component.scss'],
  templateUrl: './pending-machines.component.html',
})
export class PendingMachinesComponent {
  settings = {
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'authorize', title: '<i class="nb-checkmark-circle"></i>' },
        { name: 'unauthorize', title: '<i class="nb-trash"></i>' }
      ],
      position: 'right'
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable: false,
        addable: false
      },
      uuid: {
        title: 'UUID',
        type: 'string',
        editable: false,
        addable: false
      },
      hostname: {
        title: 'Hostname',
        type: 'string',
        editable: false,
        addable: false
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();


  constructor(public accountService: AccountService, private machineService: MachineService, private alertService: AlertService) { }

  ngOnInit() {
    // only with activated when implemented
    this.machineService.getPendingMachines()
      .pipe(first())
      .subscribe(pendingMachines => {
        this.source.load(pendingMachines);
      }
      );
  }

  custom(event: any) {
    if (event.action === 'authorize') {
      this.authorizeMachine(event.data);
    } else {
      this.unauthorizeMachine(event.data);
    }
  }

  authorizeMachine(data: any) {
    this.machineService.authorize(data.id)
      .subscribe({
        next: () => {
          this.source.remove(data);
          this.alertService.success('Authorized successful');
        },
        error: error => {
          this.alertService.error(error);
        }
      });
  }

  unauthorizeMachine(data: any) {
    this.machineService.unauthorize(data.id)
      .subscribe({
        next: () => {
          this.source.remove(data);
          this.alertService.success('Unauthorized successful');
        },
        error: error => {
          this.alertService.error(error);
        }
      });
  }
}
