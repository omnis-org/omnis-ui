import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SoftwaresResolver } from './softwares.resolver';

describe('SoftwaresResolver', () => {
  let resolver: SoftwaresResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    resolver = TestBed.inject(SoftwaresResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
