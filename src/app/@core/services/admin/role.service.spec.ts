import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RoleService } from './role.service';

describe('RoleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoleService]
    });
  });

  it('should be created', inject([RoleService], (service: RoleService) => {
    expect(service).toBeTruthy();
  }));
});
