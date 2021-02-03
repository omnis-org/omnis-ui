import { Component, OnInit } from '@angular/core';
import { MachineService, PerimeterService } from '@app/@core/services';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  pieIsLoaded = false;
  view: any[] = [600, 300];

  single: { name: string, value: number }[] = [];

  colorScheme: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService, private machineService: MachineService, private perimeterService: PerimeterService) {

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.warningLight, colors.dangerLight, colors.successLight, colors.infoLight],
      };
    });

  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    const machines = this.machineService.machines;

    if (!machines || machines.length == 0) {
      console.log("No machines found");
      return;
    }

    machines.map(m => m.perimeterId).forEach(perimId => {
      const objA = this.single.filter(obj => obj.name == perimId.toString())
      if (objA.length != 0) {
        objA[0].value += 1;
      } else {
        this.single.push({ name: perimId.toString(), value: 1 });
      }
    });

    const perimeters = this.perimeterService.perimeters;
    if (perimeters.length == 0) {
      console.log("No perimeters found");
      return;
    }

    this.single.forEach(obj => {
      const perim = perimeters.filter(p => p.id.toString() === obj.name);
      if (perim.length != 0) {
        obj.name = perim[0].name;
      }
    });

    this.pieIsLoaded = true;
  }
}