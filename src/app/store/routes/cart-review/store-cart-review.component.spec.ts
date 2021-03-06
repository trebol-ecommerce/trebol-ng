// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of, EMPTY, Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { StoreService } from '../../store.service';
import { StoreCartReviewComponent } from './store-cart-review.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { StorePaymentRedirectPromptDialogComponent } from '../../dialogs/payment-redirect-prompt/store-payment-redirect-prompt-dialog.component';
import { StoreGuestPromptDialogComponent } from '../../dialogs/guest-prompt/store-guest-prompt-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StoreCartReviewComponent', () => {
  let component: StoreCartReviewComponent;
  let fixture: ComponentFixture<StoreCartReviewComponent>;
  let mockStoreService: Partial<StoreService>;
  let mockAppService: Partial<AppService>;
  let router: Router;
  let dialogService: MatDialog;
  let dialogOpenSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    mockStoreService = {
      cartDetails$: of([]),
      cartSubtotalValue$: of(0),
      increaseProductUnits(i) {},
      decreaseProductUnits(i) {},
      removeProductFromCart(i) {}
    };
    mockAppService = {
      isLoggedIn() { return false; }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'store', component: StoreCartReviewComponent }
        ]),
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatTableModule
      ],
      declarations: [ StoreCartReviewComponent ],
      providers: [
        { provide: StoreService, useValue: mockStoreService },
        { provide: AppService, useValue: mockAppService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCartReviewComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    dialogService = TestBed.inject(MatDialog);
    dialogOpenSpy = spyOn(dialogService, 'open').and.returnValue({ afterClosed() { return EMPTY; }});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should query user login status when the user accepts their shopping cart', () => {
    const isLoggedInSpy = spyOn(mockAppService, 'isLoggedIn');
    component.onClickAccept();
    expect(isLoggedInSpy).toHaveBeenCalled();
  });

  it('should prompt an options dialog when the user is not logged in after accepting their shopping cart', () => {
    component.onClickAccept();
    expect(dialogOpenSpy).toHaveBeenCalled();
    expect(dialogOpenSpy.calls.first().args[0]).toBe(StoreGuestPromptDialogComponent);
  });

  it('should prompt a payment redirection dialog when the user is logged in after accepting their shopping cart', () => {
    mockAppService.isLoggedIn = (() => true);
    component.onClickAccept();
    expect(dialogOpenSpy).toHaveBeenCalled();
    expect(dialogOpenSpy.calls.first().args[0]).toBe(StorePaymentRedirectPromptDialogComponent);
  });
});
