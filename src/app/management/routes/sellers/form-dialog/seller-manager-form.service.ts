import { Inject, Injectable } from '@angular/core';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityCrudIService } from 'src/app/data/entity.crud.iservice';
import { Seller } from 'src/app/data/models/entities/Seller';
import { DataManagerFormService } from '../../data-manager-form.aservice';

@Injectable()
export class SellerManagerFormService
  extends DataManagerFormService<Seller> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.sellers) protected dataService: EntityCrudIService<Seller>,
  ) {
    super();
  }

}