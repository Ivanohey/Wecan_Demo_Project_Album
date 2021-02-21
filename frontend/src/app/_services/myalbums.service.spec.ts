import { TestBed } from '@angular/core/testing';

import { MyalbumsService } from './myalbums.service';

describe('MyalbumsService', () => {
  let service: MyalbumsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyalbumsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
