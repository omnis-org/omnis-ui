import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GatewaysResolver } from './gateways.resolver';

describe('GatewaysResolver', () => {
  let resolver: GatewaysResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    resolver = TestBed.inject(GatewaysResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
