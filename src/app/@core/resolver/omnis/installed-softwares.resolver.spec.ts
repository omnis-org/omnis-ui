import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { InstalledSoftwaresResolver } from './installed-softwares.resolver';

describe('InstalledSoftwaresResolver', () => {
  let resolver: InstalledSoftwaresResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    resolver = TestBed.inject(InstalledSoftwaresResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
