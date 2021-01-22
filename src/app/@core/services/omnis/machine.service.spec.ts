import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MachineService } from './machine.service';

describe('MachineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MachineService]
    });
  });

  it('should be created', inject([MachineService], (service: MachineService) => {
    expect(service).toBeTruthy();
  }));
});
