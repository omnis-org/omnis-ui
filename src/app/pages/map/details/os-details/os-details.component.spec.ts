import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsDetailsComponent } from './os-details.component';

describe('OsDetailsComponent', () => {
  let component: OsDetailsComponent;
  let fixture: ComponentFixture<OsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
