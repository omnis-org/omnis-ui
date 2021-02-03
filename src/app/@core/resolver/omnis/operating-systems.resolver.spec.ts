import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OperatingSystemsResolver } from './operating-systems.resolver';

describe('OperatingSystemsResolver', () => {
  let resolver: OperatingSystemsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    resolver = TestBed.inject(OperatingSystemsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
