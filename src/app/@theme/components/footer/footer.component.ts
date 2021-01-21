/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
  <span class="created-by">
  Created with ♥ by <b><a href="https://github.com/orgs/omnis-org/people" target="_blank">OmnIS</a></b> 2021
  </span>
  <div class="socials">
    <a href="https://github.com/omnis-org" target="_blank" class="ion ion-social-github"></a>
  </div>
  `,
})
export class FooterComponent {
}
