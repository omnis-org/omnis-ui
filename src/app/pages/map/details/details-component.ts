import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-details',
    styleUrls: ['./details.component.scss'],
    templateUrl: './details.component.html',
})
export class DetailsComponent implements OnChanges {
    @Input() object: any;
    @Input() type: string;
    @Output() delete = new EventEmitter<boolean>();

    isMachine = false;
    isNetwork = false;

    constructor() { }

    ngOnChanges() {
        this.isMachine = false;
        this.isNetwork = false;
        switch (this.type) {
            case "client":
                this.isMachine = true;
                break;
            case "network":
                this.isNetwork = true;
                break;
        }
    }

    onDelete() {
        this.delete.emit(true);
    }

}
