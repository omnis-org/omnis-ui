/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Serializable } from '../serializable';
import { verifDateOutdated } from "@core/utils/date";
export class OmnisPerimeter extends Serializable {
    id: number;
    name: string;
    description: string;
    nameLastModification: Date;
    descriptionLastModification: Date;

    getOutdatedAttribute(day: number) {
        var outdatedAttributes = [];

        if (verifDateOutdated(day, this.nameLastModification)) {
            outdatedAttributes.push({ name: "name", value: this.name, date: this.nameLastModification });
        }
        if (verifDateOutdated(day, this.descriptionLastModification)) {
            outdatedAttributes.push({ name: "description", value: this.description, date: this.descriptionLastModification });
        }

        return outdatedAttributes;
    }
}
