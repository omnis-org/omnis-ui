/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Serializable } from '../serializable';
import { verifDateOutdated } from "@core/utils/date";
export class OmnisNetwork extends Serializable {
    id: number;
    name: string;
    ipv4: string;
    ipv4Mask: number;
    isDmz: boolean;
    hasWifi: boolean;
    perimeterId: number;
    nameLastModification: Date;
    ipv4LastModification: Date;
    ipv4MaskLastModification: Date;
    isDmzLastModification: Date;
    hasWifiLastModification: Date;
    perimeterIdLastModification: Date;

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
        if (verifDateOutdated(day, this.isDmzLastModification)) {
            outdatedAttributes.push({ name: "isDmz", value: this.isDmz, date: this.isDmzLastModification });
        }
        if (verifDateOutdated(day, this.hasWifiLastModification)) {
            outdatedAttributes.push({ name: "hasWifi", value: this.hasWifi, date: this.hasWifiLastModification });
        }
        if (verifDateOutdated(day, this.perimeterIdLastModification)) {
            outdatedAttributes.push({ name: "perimeterId", value: this.perimeterId, date: this.perimeterIdLastModification });
        }

        return outdatedAttributes;
    }
}
