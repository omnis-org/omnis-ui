/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Serializable } from '../serializable';
import { verifDateOutdated } from "@core/utils/date";
export class OmnisInterface extends Serializable {
    id: number;
    name: string;
    ipv4: string;
    ipv4Mask: number;
    mac: string;
    interfaceType: string;
    machineId: number;
    networkId: number;
    nameLastModification: Date;
    ipv4LastModification: Date;
    ipv4MaskLastModification: Date;
    macLastModification: Date;
    interfaceTypeLastModification: Date;
    machineIdLastModification: Date;
    networkIdLastModification: Date;

    getOutdatedAttribute(day: number) {
        var outdatedAttributes = [];

        if (verifDateOutdated(day, this.nameLastModification)) {
            outdatedAttributes.push({ name: "name", value: this.name, date: this.nameLastModification });
        }
        if (verifDateOutdated(day, this.ipv4LastModification)) {
            outdatedAttributes.push({ name: "ipv4", value: this.ipv4, date: this.ipv4LastModification });
        }
        if (verifDateOutdated(day, this.ipv4MaskLastModification)) {
            outdatedAttributes.push({ name: "ipv4Mask", value: this.ipv4Mask, date: this.ipv4MaskLastModification });
        }
        if (verifDateOutdated(day, this.macLastModification)) {
            outdatedAttributes.push({ name: "mac", value: this.mac, date: this.macLastModification });
        }
        if (verifDateOutdated(day, this.interfaceTypeLastModification)) {
            outdatedAttributes.push({ name: "interfaceType", value: this.interfaceType, date: this.interfaceTypeLastModification });
        }
        if (verifDateOutdated(day, this.networkIdLastModification)) {
            outdatedAttributes.push({ name: "networkId", value: this.networkId, date: this.networkIdLastModification });
        }

        return outdatedAttributes;
    }
}
