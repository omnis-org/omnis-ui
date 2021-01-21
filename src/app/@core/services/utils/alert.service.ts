/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Injectable } from '@angular/core';
import { NbComponentStatus, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';


@Injectable({ providedIn: 'root' })
export class AlertService {

    constructor(private toastrService: NbToastrService) { }

    success(message: string) {
        this.alert("success", "Success", message);
    }

    error(message: string) {
        this.alert("danger", "Error", message);
    }

    info(message: string) {
        this.alert("info", "Information", message);
    }

    warn(message: string) {
        this.alert("warning", "Warning", message);
    }

    alert(type: NbComponentStatus, title: string, body: string) {
        const config = {
            status: type,
            destroyByClick: true,
            duration: 3000,
            hasIcon: true,
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            preventDuplicates: true,
        };

        this.toastrService.show(body, title, config);
    }
}
