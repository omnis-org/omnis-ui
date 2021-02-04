/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Component } from '@angular/core';
import { MachineService, GatewayService, InstalledSoftwareService, InterfaceService, LocationService, NetworkService, OperatingSystemService, PerimeterService, SoftwareService, TagService, TaggedMachineService } from '@core/services/omnis';
import { first } from 'rxjs/operators';
import { AlertService } from '@core/services/utils';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-notifications',
  styleUrls: ['./notifications.component.scss'],
  templateUrl: './notifications.component.html',
})
export class NotificationsComponent {
  settings = {
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true
    },
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: true,
      delete: false,
      position: 'right'
    },
    columns: {
      machineType: {
        title: 'Type',
        type: 'string',
        editable: false,
        addable: false
      },
      label: {
        title: 'Label',
        type: 'string',
        editable: false,
        addable: false
      },
      outdatedName: {
        title: 'Attribute',
        type: 'string',
        editable: false,
        addable: false
      },
      outdatedDate: {
        title: 'Last modification date',
        type: 'Date',
        editable: false,
        addable: false
      },
      outdatedValue: {
        title: 'Value',
        type: 'string',
        editable: true,
        addable: false
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private alertService: AlertService,
    private machineService: MachineService,
    private gatewayService: GatewayService,
    private installedSoftwareService: InstalledSoftwareService,
    private interfaceService: InterfaceService,
    private locationService: LocationService,
    private networkService: NetworkService,
    private operatingSystemService: OperatingSystemService,
    private perimeterService: PerimeterService,
    private softwareService: SoftwareService,
    private tagService: TagService,
    private taggedMachineService: TaggedMachineService
  ) { }

  ngOnInit() {
    this.machineService.getOutdateds(30).pipe(first()).subscribe(outdateds => {
      this.buildOutdatedItems(outdateds).forEach(outdatedItem => {
        outdatedItem.serviceName = "machineService";
        this.source.append(outdatedItem);
      });
    });
    this.gatewayService.getOutdateds(30).pipe(first()).subscribe(outdateds => {
      this.buildOutdatedItems(outdateds).forEach(outdatedItem => {
        outdatedItem.serviceName = "gatewayService";
        this.source.append(outdatedItem);
      });
    });
    this.installedSoftwareService.getOutdateds(30).pipe(first()).subscribe(outdateds => {
      this.buildOutdatedItems(outdateds).forEach(outdatedItem => {
        outdatedItem.serviceName = "installedSoftwareService";
        this.source.append(outdatedItem);
      });
    });
    this.interfaceService.getOutdateds(30).pipe(first()).subscribe(outdateds => {
      this.buildOutdatedItems(outdateds).forEach(outdatedItem => {
        outdatedItem.serviceName = "interfaceService";
        this.source.append(outdatedItem);
      });
    });
    this.locationService.getOutdateds(30).pipe(first()).subscribe(outdateds => {
      this.buildOutdatedItems(outdateds).forEach(outdatedItem => {
        outdatedItem.serviceName = "locationService";
        this.source.append(outdatedItem);
      });
    });
    this.networkService.getOutdateds(30).pipe(first()).subscribe(outdateds => {
      this.buildOutdatedItems(outdateds).forEach(outdatedItem => {
        outdatedItem.serviceName = "networkService";
        this.source.append(outdatedItem);
      });
    });
    this.operatingSystemService.getOutdateds(30).pipe(first()).subscribe(outdateds => {
      this.buildOutdatedItems(outdateds).forEach(outdatedItem => {
        outdatedItem.serviceName = "operatingSystemService";
        this.source.append(outdatedItem);
      });
    });
    this.perimeterService.getOutdateds(30).pipe(first()).subscribe(outdateds => {
      this.buildOutdatedItems(outdateds).forEach(outdatedItem => {
        outdatedItem.serviceName = "perimeterService";
        this.source.append(outdatedItem);
      });
    });
    this.softwareService.getOutdateds(30).pipe(first()).subscribe(outdateds => {
      this.buildOutdatedItems(outdateds).forEach(outdatedItem => {
        outdatedItem.serviceName = "softwareService";
        this.source.append(outdatedItem);
      });
    });
    this.tagService.getOutdateds(30).pipe(first()).subscribe(outdateds => {
      this.buildOutdatedItems(outdateds).forEach(outdatedItem => {
        outdatedItem.serviceName = "tagService";
        this.source.append(outdatedItem);
      });
    });
    this.taggedMachineService.getOutdateds(30).pipe(first()).subscribe(outdateds => {
      this.buildOutdatedItems(outdateds).forEach(outdatedItem => {
        outdatedItem.serviceName = "taggedMachineService";
        this.source.append(outdatedItem);
      });
    });
  }

  buildOutdatedItems(outdateds: any) {
    var outdatedItems = [];
    outdateds?.forEach((outdated: any) => {
      outdated.getOutdatedAttribute(30).forEach(outdatedItem => {
        var item = outdated;
        item.outdatedName = outdatedItem.name;
        item.outdatedValue = outdatedItem.value;
        item.outdatedDate = new Date(outdatedItem.date).toLocaleDateString("en-US");
        outdatedItems.push(item);
      });
    });
    return outdatedItems;
  }

  onEditConfirm(event): void {
    const old_data = event.data.outdatedValue;
    const new_data = event.newData.outdatedValue;

    if (old_data === new_data) {
      event.confirm.resolve(event.data);
      this.alertService.error("No changes made");
    } else {
      var item = event.newData;
      // update object with new value
      item[item.outdatedName] = item.outdatedValue;
      // retrieve object service name
      const service = item.serviceName;
      // delete added attributes
      delete item.outdatedName;
      delete item.outdatedValue;
      delete item.outdatedDate;
      delete item.serviceName;

      // call object service et update with new object
      this[service].update(item)
        .subscribe({
          next: () => {
            this.source.remove(event.data);
            this.alertService.success('Modification successful');
          },
          error: error => {
            event.confirm.resolve(event.data);
            this.alertService.error(error);
          }
        });
    }
  }
}
