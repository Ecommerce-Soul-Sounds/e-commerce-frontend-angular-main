import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  const routerStub = () => ({ navigate: (_array: any) => ({}) });
    const productServiceStub = () => ({
      getUserCart: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      getCartItems: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    const titleStub = () => ({ setTitle: (_string: any) => ({}) });
    const orderServiceStub = () => ({
      submitOrder: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: ProductService, useFactory: productServiceStub },
        { provide: Title, useFactory: titleStub },
        { provide: OrderService, useFactory: orderServiceStub }
      ]
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it(`products has default value`, () => {
    expect(component.products).toEqual([]);
  });

  it(`totalPrice has default value`, () => {
    expect(component.totalPrice).toEqual(0);
  });

  it(`cartProducts has default value`, () => {
    expect(component.cartProducts).toEqual([]);
  });

  it(`finalProducts has default value`, () => {
    expect(component.finalProducts).toEqual([]);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const productServiceStub: ProductService = fixture.debugElement.injector.get(
        ProductService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(productServiceStub, 'getUserCart').and.callThrough();
      spyOn(productServiceStub, 'getCartItems').and.callThrough();
      component.ngOnInit();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(productServiceStub.getUserCart).toHaveBeenCalled();
      expect(productServiceStub.getCartItems).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const orderServiceStub: OrderService = fixture.debugElement.injector.get(
        OrderService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(orderServiceStub, 'submitOrder').and.callThrough();
      component.onSubmit();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(orderServiceStub.submitOrder).toHaveBeenCalled();
    });
  });

});