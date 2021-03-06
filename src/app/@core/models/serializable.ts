/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */


export class Serializable {

    fromJSON(json) {
        for (const n in json) {
            this[n] = json[n];
        }
        return this;
    }

}
