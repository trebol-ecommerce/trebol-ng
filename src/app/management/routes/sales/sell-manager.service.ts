// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Sell } from 'src/app/models/entities/Sell';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { CompositeEntityDataApiIService } from 'src/app/api/data/composite-entity-data-api.iservice';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { DataManagerServiceDirective } from '../data-manager.service-directive';

@Injectable()
export class SellManagerService
  extends DataManagerServiceDirective<Sell> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.salesCrud) protected dataService: CompositeEntityDataApiIService<Sell, SellDetail>
  ) {
    super();
  }
}
