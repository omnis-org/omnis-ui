import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GatewayService } from './gateway.service';

describe('GatewayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GatewayService]
    });
  });

  it('should be created', inject([GatewayService], (service: GatewayService) => {
    expect(service).toBeTruthy();
  }));
});
