/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

export function toInt(s) {
    if (typeof (s) === 'string') {
        if (s === "") {
            return 0;
        } else {
            return parseInt(s, 10);
        }
    }
    return s;
}
