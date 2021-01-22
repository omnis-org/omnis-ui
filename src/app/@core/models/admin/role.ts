/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */


import { Injectable } from '@angular/core';
import { Serializable } from '../serializable';

@Injectable({ providedIn: 'root' })
export class Role extends Serializable {
    id: number;
    name: string;
    omnisPermissions: number;
    rolesPermissions: number;
    usersPermissions: number;
    pendingMachinesPermissions: number;



    /// PERMISSIONS GETTER ///
    get oneAdminReadPermision() {
        return (this.omnisPermissions !== 0 || this.usersPermissions !== 0 ||
            this.rolesPermissions !== 0 || this.pendingMachinesPermissions !== 0);
    }

    get omnisReadPermission() {
        return (this.omnisPermissions & 1) === 1;
    }

    get omnisInsertPermission() {
        return (this.omnisPermissions >> 1 & 1) === 1;
    }

    get omnisUpdatePermission() {
        return (this.omnisPermissions >> 2 & 1) === 1;
    }

    get omnisDeletePermission() {
        return (this.omnisPermissions >> 3 & 1) === 1;
    }

    get pendingMachinesReadPermission() {
        return (this.pendingMachinesPermissions & 1) === 1;
    }

    get pendingMachinesInsertPermission() {
        return (this.pendingMachinesPermissions >> 1 & 1) === 1;
    }

    get pendingMachinesUpdatePermission() {
        return (this.pendingMachinesPermissions >> 2 & 1) === 1;
    }

    get pendingMachinesDeletePermission() {
        return (this.pendingMachinesPermissions >> 3 & 1) === 1;
    }

    get usersReadPermission() {
        return (this.usersPermissions & 1) === 1;
    }

    get usersInsertPermission() {
        return (this.usersPermissions >> 1 & 1) === 1;
    }

    get usersUpdatePermission() {
        return (this.usersPermissions >> 2 & 1) === 1;
    }

    get usersDeletePermission() {
        return (this.usersPermissions >> 3 & 1) === 1;
    }


    get rolesReadPermission() {
        return (this.rolesPermissions & 1) === 1;
    }

    get rolesInsertPermission() {
        return (this.rolesPermissions >> 1 & 1) === 1;
    }

    get rolesUpdatePermission() {
        return (this.rolesPermissions >> 2 & 1) === 1;
    }

    get rolesDeletePermission() {
        return (this.rolesPermissions >> 3 & 1) === 1;
    }

}


