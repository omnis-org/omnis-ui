/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Serializable } from '../serializable';
import { verifDateOutdated } from "@core/utils/date";
export class OmnisSoftware extends Serializable {
    id: number;
    name: string;
    version: string;
    isIntern: boolean;
    nameLastModification: Date;
    versionLastModification: Date;
    isInternLastModification: Date;

    getOutdatedAttribute(day: number) {
        var outdatedAttributes = [];

        if (verifDateOutdated(day, this.nameLastModification)) {
            outdatedAttributes.push({ name: "name", value: this.name, date: this.nameLastModification });
        }
        if (verifDateOutdated(day, this.versionLastModification)) {
            outdatedAttributes.push({ name: "version", value: this.version, date: this.versionLastModification });
        }
        if (verifDateOutdated(day, this.isInternLastModification)) {
            outdatedAttributes.push({ name: "isIntern", value: this.isIntern, date: this.isInternLastModification });
        }

        return outdatedAttributes;
    }
}
