/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Serializable } from '../serializable';
import { verifDateOutdated } from "@core/utils/date";
export class OmnisTaggedMachine extends Serializable {
    id: number;
    tagId: number;
    machineId: number;
    tagIdLastModification: Date;
    machineIdLastModification: Date;

    getOutdatedAttribute(day: number) {
        var outdatedAttributes = [];

        if (verifDateOutdated(day, this.tagIdLastModification)) {
            outdatedAttributes.push({ name: "tagId", value: this.tagId, date: this.tagIdLastModification });
        }
        if (verifDateOutdated(day, this.machineIdLastModification)) {
            outdatedAttributes.push({ name: "machineId", value: this.machineId, date: this.machineIdLastModification });
        }

        return outdatedAttributes;
    }
}
