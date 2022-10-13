import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cartItem';
import { ProductService } from 'src/app/services/product.service';
import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(() => {
    const titleStub = () => ({ setTitle: (_string: any) => ({}) });
    const routerStub = () => ({ navigate: (_array: any) => ({}) });
    const productServiceStub = () => ({
      getUserCart: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      getCartItems: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      addCartItem: (_product: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      removeItem: (_item: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      emptyCart: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        { provide: Title, useFactory: titleStub },
        { provide: Router, useFactory: routerStub },
        { provide: ProductService, useFactory: productServiceStub }
      ]
    });
    fixture = TestBed.createComponent(CartComponent);
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

  it(`cartItems has default value`, () => {
    expect(component.cartItems).toEqual([]);
  });

  describe('addItem', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const cartItemStub: CartItem = <any>{};
      const productServiceStub: ProductService = fixture.debugElement.injector.get(
        ProductService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(productServiceStub, 'addCartItem').and.callThrough();
      component.addItem(cartItemStub);
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(productServiceStub.addCartItem).toHaveBeenCalled();
    });
  });

  describe('removeItem', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const cartItemStub: CartItem = <any>{};
      const productServiceStub: ProductService = fixture.debugElement.injector.get(
        ProductService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(productServiceStub, 'removeItem').and.callThrough();
      component.removeItem(cartItemStub);
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(productServiceStub.removeItem).toHaveBeenCalled();
    });
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

  describe('emptyCart', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const productServiceStub: ProductService = fixture.debugElement.injector.get(
        ProductService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(productServiceStub, 'emptyCart').and.callThrough();
      component.emptyCart();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(productServiceStub.emptyCart).toHaveBeenCalled();
    });
  });
});
