import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

import { DisplayTaylorProductsComponent } from './display-taylor-products.component';

describe('DisplayTaylorProductsComponent', () => {
  let component: DisplayTaylorProductsComponent;
  let fixture: ComponentFixture<DisplayTaylorProductsComponent>;

  beforeEach(() => {
    const titleStub = () => ({ setTitle: (_string: any) => ({}) });
    const routerStub = () => ({ navigate: (_array: any) => ({}) });
    const productServiceStub = () => ({
      getProductsByBrand: (string: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    TestBed.configureTestingModule({
      declarations: [DisplayTaylorProductsComponent],
      providers: [
        { provide: Title, useFactory: titleStub },
        { provide: Router, useFactory: routerStub },
        { provide: ProductService, useFactory: productServiceStub }
      ]
    });
    fixture = TestBed.createComponent(DisplayTaylorProductsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`allProducts has default value`, () => {
    expect(component.allProducts).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const productServiceStub: ProductService = fixture.debugElement.injector.get(
        ProductService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(productServiceStub, 'getProductsByBrand').and.callThrough();
      component.ngOnInit();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(productServiceStub.getProductsByBrand).toHaveBeenCalled();
    });
  });
});