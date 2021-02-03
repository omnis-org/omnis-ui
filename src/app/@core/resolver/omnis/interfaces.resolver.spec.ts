import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { InterfacesResolver } from './interfaces.resolver';

describe('InterfacesResolver', () => {
  let resolver: InterfacesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    resolver = TestBed.inject(InterfacesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
