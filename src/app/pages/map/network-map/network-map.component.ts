/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Component, EventEmitter, Output } from '@angular/core';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { OmnisMachine, OmnisNetwork, OmnisInterface, OmnisPerimeter, OmnisLocation } from '@core/models/omnis';
import { MachineService, InterfaceService, NetworkService, GatewayService, PerimeterService, LocationService } from '@core/services/omnis';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-network-map',
  styleUrls: ['./network-map.component.scss'],
  templateUrl: './network-map.component.html'
})
export class NetworkMapComponent {
  //////////////// MAP ////////////////
  @ViewChild('networkMap') nwEl: ElementRef;
  private networkMap: any;

  //////////////// OUTPUT ////////////////
  @Output() objectEvent = new EventEmitter<any>(); // select object
  @Output() typeObjectEvent = new EventEmitter<string>(); // select type object

  //////////////// LOCAL DATA ////////////////
  machines: OmnisMachine[];
  networks: OmnisNetwork[];
  perimeters: OmnisPerimeter[];
  locations: OmnisLocation[];

  //////////////// SELECTED ////////////////
  public selectedPerimeters: number[] = [];
  public selectedLocations: number[] = [];

  constructor(
    private machineService: MachineService,
    private networkService: NetworkService,
    private interfaceService: InterfaceService,
    private gatewayService: GatewayService,
    public perimeterService: PerimeterService,
    public locationService: LocationService
  ) {
    this.perimeters = this.perimeterService.perimeters;
    this.locations = this.locationService.locations;
    this.selectedPerimeters = [1];
    this.selectedLocations = [1];
  }


  updateMap() {
    this.updateNodes(this.machineService.machines, 'client');
    this.updateEdges(this.interfaceService.interfaces);
    this.updateNodes(this.networkService.networks, 'network');
  }

  ngAfterViewInit(): void {
    this.networkMap = new Network(
      this.nwEl.nativeElement, null, this.initOptions()
    );

    this.initEvents();
    this.subscribe();
  }

  /**
   * Initialize Network events
   */
  initEvents() {
    /**
     * When click
     */
    this.networkMap.on('click', (params) => {
      if (typeof params.nodes != undefined && params.nodes.length === 1) {
        const objectRawID = params.nodes[0];
        const objectType = this.visidToType(objectRawID);
        const objectID = this.visidToId(objectRawID);
        //define selected type to show proper edit/detail menu
        this.typeObjectEvent.emit(objectType);
        if (objectType === 'client') {
          this.objectEvent.emit(this.machines.find(m => m.id === objectID));
        } else if (objectType === 'network') {
          this.objectEvent.emit(this.networks.find(n => n.id === objectID));
        }
      }
      /**
       * If double click on blank -> create a node
       */
    });
    this.networkMap.on('doubleClick', (params) => {
      const nodesLen = params.nodes.length;
      const edgesLen = params.edges.length;

      /**
       * If double click on blank -> create a node
       */
      if (nodesLen === 0 && edgesLen === 0) {
        const coord = params.pointer.canvas;
        const node = { label: prompt('Label ?'), x: coord.x, y: coord.y };
        this.getNetworkNodes().add(node);
      }
    });
  }

  /**
   * Subscribe to data services
   */
  subscribe(): void {
    this.machineService.machines$.subscribe(machines => { this.machines = machines; this.updateNodes(machines, 'client'); });
    this.networkService.networks$.subscribe(networks => { this.networks = networks; this.updateNodes(networks, 'network'); });
    this.interfaceService.interfaces$.subscribe(interfaces => this.updateEdges(interfaces));
  }

  updateNodes(data: any[], type: string): void {
    if (data == null) { return; }

    const nodesCurr = this.getNetworkNodes();

    // compute new nodes ids
    const nodesNewIds = [];
    data.forEach((item: any) => {
      nodesNewIds.push(
        this.idToVisid(item.id, type)
      );
    });
    // add/modify new/existants nodes from curritemsent type
    const nodesNew = [];
    data.forEach((item: any) => {
      // compute label
      let label: string;
      if (item.label) {
        label = item.label
      } else if (item.name) {
        label = item.name
      }
      if (type == 'network') {
        label = label + '\n\n' + item.ipv4 + '/' + item.ipv4Mask;
        nodesNew.push({
          group: type,
          id: this.idToVisid(item.id, type),
          label
        });
      } else {
        nodesNew.push({
          group: type,
          id: this.idToVisid(item.id, type),
          label,
        });
      }
    });

    nodesCurr.update(nodesNew);
    // remove nodes that no longer exist
    let nodesCurrIds = nodesCurr.getIds();
    let nodesCurrIdsFiltered = nodesCurrIds.filter((id: string) => this.visidToType(id) === type);
    let nodesToDel = nodesCurrIdsFiltered.filter(item => nodesNewIds.indexOf(item) < 0);
    nodesCurr.remove(nodesToDel);
    nodesCurrIds = nodesCurr.getIds();
    nodesCurrIdsFiltered = nodesCurrIds.filter((id: string) => this.visidToType(id) === type);
    if ((this.selectedPerimeters != undefined) && (this.selectedLocations != undefined)) {
      if (type == 'client') {
        let machinesToDisplay = this.machines.filter(machine => (this.selectedPerimeters.includes(machine.perimeterId) && this.selectedLocations.includes(machine.locationId)))
        let machinesNotSelected = this.machines.filter(machine => nodesCurrIdsFiltered.includes(this.idToVisid(machine.id, 'client')) && !machinesToDisplay.includes(machine));
        let clientToDelete = []
        machinesNotSelected.forEach((item: any) => {
          clientToDelete.push(this.idToVisid(item.id, 'client'));
        })
        nodesCurr.remove(clientToDelete)
      } else if (type == 'network') {
        let networkNotInPerimeters = this.networks.filter(network => !this.selectedPerimeters.includes(network.perimeterId))
        let networkToDelete = []
        networkNotInPerimeters.forEach((item: any) => {
          networkToDelete.push(this.idToVisid(item.id, 'network'));
        })
        nodesCurr.remove(networkToDelete);
      }
    }
    this.networkMap.setData({ nodes: nodesCurr, edges: this.getNetworkEdges() });
  }

  updateEdges(interfaces: OmnisInterface[]): void {
    if (interfaces == null) { return; }
    const networkEdges = [];
    interfaces.forEach((interf: OmnisInterface) => {
      networkEdges.push({
        from: this.idToVisid(interf.machineId, 'client'),
        to: this.idToVisid(interf.networkId, 'network')
      });
    });

    const dataset = new DataSet<any>(networkEdges);
    this.networkMap.setData({ nodes: this.getNetworkNodes(), edges: dataset });
  }

  /**
   * Export data as JSON
   *
   * @returns For each node : ID + label + connections to
   */
  export() {
    const nodes = this.getNetworkNodes();
    const nodesNew = {};
    nodes.getIds().forEach((id: string) => {
      const node = nodes.get(id);
      nodesNew[id] = {};
      nodesNew[id].label = node.label;
      nodesNew[id].to = this.networkMap.getConnectedNodes(id, 'to');
    });
    return JSON.stringify(nodesNew, undefined, 2);
  }

  /**
   * Import data from JSON
   *
   * @param rawJson Exported JSON network data
   */
  import(rawJson: string) {
    const inputData = JSON.parse(rawJson);

    const data = {
      nodes: this.getNodeDataObs(inputData),
      edges: this.getEdgeData(inputData),
    };

    this.networkMap.setData(data);
  }

  /**
   * Retrieve nodes information from imported data
   *
   * @param data Imported data
   * @returns Nodes dataset
   */
  getNodeDataObs(data: any) {
    const networkNodes = [];

    for (const id in data) {
      if (Object.prototype.hasOwnProperty.call(data, id)) {
        networkNodes.push({
          id,
          label: data[id].label
        });
      }
    }

    return new DataSet<any>(networkNodes);
  }

  /**
   * Retrieve edges information from imported data
   *
   * @param data Imported data
   * @returns Edges dataset
   */
  getEdgeData(data: any) {
    const networkEdges = [];

    for (const id in data) {
      if (Object.prototype.hasOwnProperty.call(data, id)) {
        data[id].to.forEach((connId: string) => networkEdges.push({ from: id, to: connId }));
      }
    }

    return new DataSet<any>(networkEdges);
  }

  /**
   * Initialize vis-network options
   * TODO: need to be a service with local storage
   */
  initOptions() {
    return {
      physics: true,
      locale: 'fr',
      interaction: { hover: true },
      manipulation: {
        enabled: false,
      },
      nodes: {
        shape: 'dot',
        size: 30,
        color: '#5e5e5e',
      },
      edges: {},
      layout: {
        hierarchical: {
          direction: 'DU',
          sortMethod: 'directed',
          treeSpacing: 300
        },
      },
      groups: {
        client: {
          shape: 'icon',
          icon: {
            face: '\'Font Awesome 5 Free\'',
            weight: '900',
            code: '\uf109',
            size: 30,
            color: '#5e5e5e',
          }
        },
        network: {
          shape: 'image',
          image: 'assets/img/network-sprite.png',
          size: 14,
          shapeProperties: { interpolation: true },
          font: { vadjust: -57 },
          //shapeProperties: { useBorderWithImage: true }
        }
      }
    };
  }

  private idToVisid(id: number, type: string): string {
    return type.concat('_' + id.toString());
  }

  private visidToId(visid: string): number {
    return +visid.split('_')[1];
  }

  private visidToType(visid: string): string {
    return visid.split('_')[0];
  }

  private getNetworkNodes(): DataSet<any> {
    return this.networkMap.body.data.nodes;
  }

  private getNetworkEdges(): DataSet<any> {
    return this.networkMap.body.data.edges;
  }

}
