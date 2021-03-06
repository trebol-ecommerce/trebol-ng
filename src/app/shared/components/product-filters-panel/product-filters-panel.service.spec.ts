// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductFiltersPanelService } from './product-filters-panel.service';
import { StoreApiIService } from 'src/app/api/store/store-api.iservice';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';

describe('ProductFiltersPanelService', () => {
  let service: Partial<ProductFiltersPanelService>;
  let catalogService: Partial<StoreApiIService>;

  beforeEach(() => {
    catalogService = {
      fetchAllProductFamilies() { return of([]); },
      fetchProductTypesByFamilyId(id) { return of([]); }
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: API_SERVICE_INJECTION_TOKENS.store, useValue: catalogService }
      ]
    });
    service = TestBed.inject(ProductFiltersPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
