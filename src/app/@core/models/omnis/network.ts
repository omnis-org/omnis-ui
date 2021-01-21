/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

export class OmnisNetwork {
    id: number;
    name: string;
    ipv4: string;
    ipv4Mask: number;
    isDmz: boolean;
    hasWifi: boolean;
    perimeterId: number;
}
