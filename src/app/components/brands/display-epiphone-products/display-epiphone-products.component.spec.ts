import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

import { DisplayEpiphoneProductsComponent } from './display-epiphone-products.component';

describe('DisplayEpiphoneProductsComponent', () => {
  let component: DisplayEpiphoneProductsComponent;
  let fixture: ComponentFixture<DisplayEpiphoneProductsComponent>;

  beforeEach(async () => {
    const titleStub = () => ({ setTitle: (string: any) => ({}) });
    const routerStub = () => ({ navigate: (array: any) => ({}) });
    const productServiceStub = () => ({
      getProductsByBrand: (string: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    await TestBed.configureTestingModule({
      declarations: [DisplayEpiphoneProductsComponent],
      providers: [
        { provide: Title, useFactory: titleStub },
        { provide: Router, useFactory: routerStub },
        { provide: ProductService, useFactory: productServiceStub }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DisplayEpiphoneProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
