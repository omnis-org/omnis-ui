import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-omnis-version',
  templateUrl: './omnis-version.component.html',
  styleUrls: ['./omnis-version.component.scss']
})
export class OmnisVersionComponent implements OnInit {
  @Input() omnisVersion: string;
  constructor() { }
  omnisImage = 'assets/img/omnis.png'
  ngOnInit(): void {
  }

}
