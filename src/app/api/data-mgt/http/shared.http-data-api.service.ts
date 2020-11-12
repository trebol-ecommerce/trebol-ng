// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { ProductFamily } from 'src/app/models/entities/ProductFamily';
import { ProductType } from 'src/app/models/entities/ProductType';
import { SellType } from 'src/app/models/entities/SellType';
import { HttpService } from 'src/app/shared/http.abstract-service';
import { SharedDataApiIService } from '../shared-data-api.iservice';
import { Person } from 'src/app/models/entities/Person';

@Injectable()
export class SharedHttpDataApiService
  extends HttpService
  implements SharedDataApiIService {

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public readAllPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(
      `${this.baseURI}/api/people`
    );
  }

  readAllSellTypes(): Observable<SellType[]> {
    return this.http.get<SellType[]>(
      `${this.baseURI}/api/sell_types`
    );
  }

  public readAllProductFamilies(): Observable<ProductFamily[]> {
    return this.http.get<ProductFamily[]>(
      `${this.baseURI}/api/product_families`
    ).pipe(
      retry(2)
    );
  }

  public readAllProductTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(
      `${this.baseURI}/api/product_types`
    ).pipe(
      retry(2)
    );
  }

  public readAllProductTypesByFamilyId(familyId: number): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(
      `${this.baseURI}/api/product_types`,
      this.httpParamsOf({ familyId })
    ).pipe(
      retry(2)
    );
  }
}