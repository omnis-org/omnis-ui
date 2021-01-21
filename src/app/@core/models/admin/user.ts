/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */


export class User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  roleId: number;
}

export class UserToken {
  token: string;
  expireAt: number;
}
