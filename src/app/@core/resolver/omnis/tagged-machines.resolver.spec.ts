import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TaggedMachinesResolver } from './tagged-machines.resolver';

describe('TaggedMachinesResolver', () => {
  let resolver: TaggedMachinesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    resolver = TestBed.inject(TaggedMachinesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
