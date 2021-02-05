import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmnisVersionComponent } from './omnis-version.component';

describe('OmnisVersionComponent', () => {
  let component: OmnisVersionComponent;
  let fixture: ComponentFixture<OmnisVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmnisVersionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OmnisVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
