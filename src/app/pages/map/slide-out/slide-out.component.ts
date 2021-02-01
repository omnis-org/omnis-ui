import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-slide-out',
    styleUrls: ['./slide-out.component.scss'],
    templateUrl: './slide-out.component.html',
})
export class SlideOutComponent {

    @Input() open: boolean;
    @Output() openChange = new EventEmitter<boolean>();

    toggle() {
        this.open = !this.open;
        this.openChange.emit(this.open);
    }
}
