/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Time } from "@angular/common";

export class OmnisInstalledSoftware {
    id: number;
    softwareId: number;
    machineId: number;
    softwareIdLastModification: Time;
    machineIdLastModification: Time;
}
