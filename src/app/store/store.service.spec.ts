// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/data/local-memory/local-memory-data.module';
import { StoreService } from './store.service';
import { Product } from '../data/models/entities/Product';
import { SellDetail } from '../data/models/entities/SellDetail';
import { delay } from 'rxjs/operators';

describe('StoreService', () => {
  let service: StoreService;
  const mockProduct: Product = { id: 1, barcode: 'example', name: 'test product', price: 500, productType: { id: 1 } };
  const mockProductTwo: Product = { id: 2, barcode: 'example2', name: 'test product two', price: 1000, productType: { id: 1 } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LocalMemoryDataModule,
        HttpClientTestingModule
      ],
      providers: [
        StoreService
      ]
    });
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store items in the cart', () => {
    service.addProductToCart(mockProduct);
    service.addProductToCart(mockProductTwo);
    service.sellDetails$.subscribe(
      (sellDetails: SellDetail[]) => {
        expect(sellDetails.length).toBe(2);
        expect(sellDetails[0].product).toEqual(mockProduct);
        expect(sellDetails[0].units).toEqual(1);
        expect(sellDetails[1].product).toEqual(mockProductTwo);
        expect(sellDetails[1].units).toEqual(1);
      }
    );
  });

});
