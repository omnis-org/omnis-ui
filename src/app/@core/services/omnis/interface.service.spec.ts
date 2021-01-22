import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InterfaceService } from './interface.service';

describe('InterfaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InterfaceService]
    });
  });

  it('should be created', inject([InterfaceService], (service: InterfaceService) => {
    expect(service).toBeTruthy();
  }));
});
