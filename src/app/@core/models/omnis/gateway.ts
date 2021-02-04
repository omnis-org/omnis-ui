/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Serializable } from '../serializable';
import { verifDateOutdated } from "@core/utils/date";

export class OmnisGateway extends Serializable {
    id: number;
    ipv4: string;
    ipv4Mask: number;
    interfaceId: number;
    ipv4LastModification: Date;
    ipv4MaskLastModification: Date;
    interfaceIdLastModification: Date;

    getOutdatedAttribute(day: number) {
        var outdatedAttributes = [];

        if (verifDateOutdated(day, this.ipv4LastModification)) {
            outdatedAttributes.push({ name: "ipv4", value: this.ipv4, date: this.ipv4LastModification });
        }
        if (verifDateOutdated(day, this.ipv4MaskLastModification)) {
            outdatedAttributes.push({ name: "ipv4Mask", value: this.ipv4Mask, date: this.ipv4MaskLastModification });
        }
        if (verifDateOutdated(day, this.interfaceIdLastModification)) {
            outdatedAttributes.push({ name: "interfaceId", value: this.interfaceId, date: this.interfaceIdLastModification });
        }

        return outdatedAttributes;
    }
}
