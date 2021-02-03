import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PerimetersResolver } from './perimeters.resolver';

describe('PerimeterResolver', () => {
  let resolver: PerimetersResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    resolver = TestBed.inject(PerimetersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
