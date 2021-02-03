import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RolesResolver } from './roles.resolver';

describe('RolesResolver', () => {
  let resolver: RolesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    resolver = TestBed.inject(RolesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
