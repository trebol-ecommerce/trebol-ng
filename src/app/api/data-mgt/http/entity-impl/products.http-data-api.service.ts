// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/entities/Product';
import { ProductFilters } from 'src/app/shared/product-filters-panel/product-filters-panel.component';
import { EntityDataApiIService } from '../../entity-data-api.iservice';
import { HttpDataApiService } from '../http-data-api.aservice';

@Injectable()
export class ProductsHttpDataApiService
  extends HttpDataApiService
  implements EntityDataApiIService<Product> {

  constructor(
    protected http: HttpClient
  ) {
    super();
    this.baseURI = `${this.baseURI}/products`;
  }

  public create(product: Product): Observable<number> {
    return this.http.post<number>(
      this.baseURI,
      product
    );
  }

  public readById(id: number): Observable<Product> {
    return this.http.get<Product>(
      `${this.baseURI}/${id}`
    );
  }

  public readAll(): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.baseURI,
    );
  }

  public readFiltered(filters: ProductFilters): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.baseURI,
      this.httpParamsOf(filters)
    );
  }

  public readByTypeId(typeId: number): Observable<Product[]> {
    return this.readFiltered({ typeId });
  }

  public readByFamilyId(familyId: number): Observable<Product[]> {
    return this.readFiltered({ familyId });
  }

  public update(product: Product, id: string | number): Observable<number> {
    return this.http.put<number>(
      `${this.baseURI}/${id}`,
      product
    );
  }

  public deleteById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.baseURI}/${id}`
    );
  }
}
