/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Serializable } from '../serializable';
import { verifDateOutdated } from "@core/utils/date";

export class OmnisMachine extends Serializable {
    id: number;
    uuid: string;
    authorized: boolean;
    hostname: string;
    label: string;
    description: string;
    virtualizationSystem: string;
    serialNumber: string;
    machineType: string;
    perimeterId: number;
    locationId: number;
    operatingSystemId: number;
    omnisVersion: string;
    uuidLastModification: Date;
    authorizedLastModification: Date;
    hostnameLastModification: Date;
    labelLastModification: Date;
    descriptionLastModification: Date;
    virtualizationSystemLastModification: Date;
    serialNumberLastModification: Date;
    machineTypeLastModification: Date;
    perimeterIdLastModification: Date;
    locationIdLastModification: Date;
    operatingSystemIdLastModification: Date;
    omnisVersionLastModification: Date;

    getOutdatedAttribute(day: number) {
        var outdatedAttributes = [];

        if (verifDateOutdated(day, this.uuidLastModification)) {
            outdatedAttributes.push({ name: "uuid", value: this.uuid, date: this.uuidLastModification });
        }
        if (verifDateOutdated(day, this.authorizedLastModification)) {
            outdatedAttributes.push({ name: "authorized", value: this.authorized, date: this.authorizedLastModification });
        }
        if (verifDateOutdated(day, this.hostnameLastModification)) {
            outdatedAttributes.push({ name: "hostname", value: this.hostname, date: this.hostnameLastModification });
        }
        if (verifDateOutdated(day, this.labelLastModification)) {
            outdatedAttributes.push({ name: "label", value: this.label, date: this.labelLastModification });
        }
        if (verifDateOutdated(day, this.descriptionLastModification)) {
            outdatedAttributes.push({ name: "description", value: this.description, date: this.descriptionLastModification });
        }
        if (verifDateOutdated(day, this.virtualizationSystemLastModification)) {
            outdatedAttributes.push({ name: "virtualizationSystem", value: this.virtualizationSystem, date: this.virtualizationSystemLastModification });
        }
        if (verifDateOutdated(day, this.serialNumberLastModification)) {
            outdatedAttributes.push({ name: "serialNumber", value: this.serialNumber, date: this.serialNumberLastModification });
        }
        if (verifDateOutdated(day, this.machineTypeLastModification)) {
            outdatedAttributes.push({ name: "machineType", value: this.machineType, date: this.machineTypeLastModification });
        }
        if (verifDateOutdated(day, this.perimeterIdLastModification)) {
            outdatedAttributes.push({ name: "perimeterId", value: this.perimeterId, date: this.perimeterIdLastModification });
        }
        if (verifDateOutdated(day, this.locationIdLastModification)) {
            outdatedAttributes.push({ name: "locationId", value: this.locationId, date: this.locationIdLastModification });
        }
        if (verifDateOutdated(day, this.operatingSystemIdLastModification)) {
            outdatedAttributes.push({ name: "operatingSystemId", value: this.operatingSystemId, date: this.operatingSystemIdLastModification });
        }
        if (verifDateOutdated(day, this.omnisVersionLastModification)) {
            outdatedAttributes.push({ name: "omnisVersion", value: this.omnisVersion, date: this.omnisVersionLastModification });
        }

        return outdatedAttributes;
    }
}
