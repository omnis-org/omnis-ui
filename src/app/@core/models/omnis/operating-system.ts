/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Serializable } from '../serializable';
import { verifDateOutdated } from "@core/utils/date";
export class OmnisOperatingSystem extends Serializable {
    id: number;
    name: string;
    platform: string;
    platformFamily: string;
    platformVersion: string;
    kernelVersion: string;
    nameLastModification: Date;
    platformLastModification: Date;
    platformFamilyLastModification: Date;
    platformVersionLastModification: Date;
    kernelVersionLastModification: Date;

    getOutdatedAttribute(day: number) {
        var outdatedAttributes = [];

        if (verifDateOutdated(day, this.nameLastModification)) {
            outdatedAttributes.push({ name: "name", value: this.name, date: this.nameLastModification });
        }
        if (verifDateOutdated(day, this.platformLastModification)) {
            outdatedAttributes.push({ name: "platform", value: this.platform, date: this.platformLastModification });
        }
        if (verifDateOutdated(day, this.platformFamilyLastModification)) {
            outdatedAttributes.push({ name: "platformFamily", value: this.platformFamily, date: this.platformFamilyLastModification });
        }
        if (verifDateOutdated(day, this.platformVersionLastModification)) {
            outdatedAttributes.push({ name: "platformVersion", value: this.platformVersion, date: this.platformVersionLastModification });
        }
        if (verifDateOutdated(day, this.kernelVersionLastModification)) {
            outdatedAttributes.push({ name: "kernelVersion", value: this.kernelVersion, date: this.kernelVersionLastModification });
        }

        return outdatedAttributes;
    }
}
