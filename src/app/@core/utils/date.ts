/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

export function verifDateOutdated(day: number, attribute: Date) {
    if ((attribute == null) || (day == null)) return false;

    const attributeDate = new Date(attribute);

    var liveline = new Date();
    liveline.setDate(liveline.getDate() - day);

    if (attributeDate < liveline) return true;
    return false;
}