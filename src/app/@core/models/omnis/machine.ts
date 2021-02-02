/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Time } from "@angular/common";

export class OmnisMachine {
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
    uuidLastModification: Time;
    authorizedLastModification: Time;
    hostnameLastModification: Time;
    labelLastModification: Time;
    descriptionLastModification: Time;
    virtualizationSystemLastModification: Time;
    serialNumberLastModification: Time;
    machineTypeLastModification: Time;
    perimeterIdLastModification: Time;
    locationIdLastModification: Time;
    operatingSystemIdLastModification: Time;
    omnisVersionLastModification: Time;
}
