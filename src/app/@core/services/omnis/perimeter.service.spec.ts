import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PerimeterService } from './perimeter.service';

describe('NetworkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PerimeterService]
    });
  });

  it('should be created', inject([PerimeterService], (service: PerimeterService) => {
    expect(service).toBeTruthy();
  }));
});
