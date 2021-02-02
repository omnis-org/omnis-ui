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

    const machines = this.machineService.machines$.subscribe(machines => {
      if (machines) {
        var perimsId = machines.map(m => m.perimeterId);
        this.single = [];
        const i = 0;
        perimsId.forEach(perimId => {
          const objA = this.single.filter(obj => obj.name == perimId.toString())
          if (objA.length != 0) {
            objA[0].value += 1;
          } else {
            this.single.push({ name: perimId.toString(), value: 1 });
          }
        });


        this.perimeterService.perimeters$.subscribe(perimeters => {
          if (perimeters) {
            this.single.forEach(obj => {
              console.log("perimeters");
              obj.name = perimeters.filter(p => p.id.toString() === obj.name)[0].name;
            });
            this.pieIsLoaded = true;
          }
        });
      }
    })

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
  }

}
