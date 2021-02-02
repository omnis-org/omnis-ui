/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Time } from "@angular/common";

export class OmnisOperatingSystem {
    id: number;
    name: string;
    platform: string;
    platformFamily: string;
    platformVersion: string;
    kernelVersion: string;
    nameLastModification: Time;
    platformLastModification: Time;
    platformFamilyLastModification: Time;
    platformVersionLastModification: Time;
    kernelVersionLastModification: Time;
}
