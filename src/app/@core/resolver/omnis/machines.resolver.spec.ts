import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MachinesResolver } from './machines.resolver';

describe('MachinesResolver', () => {
  let resolver: MachinesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    resolver = TestBed.inject(MachinesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
