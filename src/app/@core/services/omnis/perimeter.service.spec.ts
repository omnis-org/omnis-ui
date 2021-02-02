import { TestBed } from '@angular/core/testing';

import { PerimeterService } from './perimeter.service';

describe('PerimeterService', () => {
  let service: PerimeterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerimeterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
