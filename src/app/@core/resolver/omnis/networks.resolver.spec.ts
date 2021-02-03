import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NetworksResolver } from './networks.resolver';

describe('NetworksResolver', () => {
  let resolver: NetworksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    resolver = TestBed.inject(NetworksResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
