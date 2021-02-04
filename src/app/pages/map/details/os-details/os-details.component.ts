import { Component, Input, OnInit } from '@angular/core';
import { OmnisOperatingSystem } from '@app/@core/models';
import { OperatingSystemService } from '@app/@core/services';

@Component({
  selector: 'app-os-details',
  templateUrl: './os-details.component.html',
  styleUrls: ['./os-details.component.scss']
})
export class OsDetailsComponent implements OnInit {
  private _osId: number;
  @Input() set osId(value: number){
    this._osId = value;
    this.changeLogo(this._osId);
  };
  unknownImagePath = 'assets/img/unknown.png'
  linuxImagePath = 'assets/img/linux.png';
  windowsImagePath = 'assets/img/windows.png';
  displayedImagePath = this.unknownImagePath
  osType: String;
  osDisplayed: OmnisOperatingSystem;
  inputOS: OmnisOperatingSystem[];
  localOperatingSystems: OmnisOperatingSystem[];
  constructor(private operatingSystemService: OperatingSystemService) { }

  ngOnInit(): void {
  }

  changeLogo(osId: number){
    console.log(osId)
    console.log("CHANGING LOGO")
    this.localOperatingSystems = this.operatingSystemService.operatingSystems;
    console.log(this.localOperatingSystems);
    this.inputOS = this.localOperatingSystems.filter(os => os.id === osId);
    console.log(this.inputOS);
    if(this.inputOS.length === 1){
      this.osDisplayed = this.inputOS[0]
      this.osType = this.inputOS[0].platform;
    }else{
      this.osType = undefined;
    }
    if(this.osType !== undefined){
      if(this.osType === 'ubuntu'){
        this.displayedImagePath = this.linuxImagePath
      }else if(this.osType === 'windows'){
        this.displayedImagePath = this.windowsImagePath
      }
    }else{
      this.displayedImagePath = this.unknownImagePath
    }
  }

}
