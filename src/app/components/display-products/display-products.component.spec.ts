import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute ,Router} from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { DisplayProductsComponent } from './display-products.component';

describe('DisplayProductsComponent', () => {
  let component: DisplayProductsComponent;
  let fixture: ComponentFixture<DisplayProductsComponent>;

  beforeEach(() => {
    const titleStub = () => ({ setTitle: (_string: any) => ({}) });
    const activatedRouteStub = () => ({ snapshot: { queryParams: {} } });
    const routerStub = () => ({ navigate: (_array: any) => ({}) });
    const productServiceStub = () => ({
      getProductsByCategory: (category: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      getProductsByBrand: (brand: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      getProducts: () => ({ pipe: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }) })
    });
    TestBed.configureTestingModule({
      declarations: [DisplayProductsComponent],
      providers: [
        { provide: Title, useFactory: titleStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: ProductService, useFactory: productServiceStub }
      ]
    });
    fixture = TestBed.createComponent(DisplayProductsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`allProducts has default value`, () => {
    expect(component.allProducts).toEqual([]);
  });

  it(`title has default value`, () => {
    expect(component.title).toEqual(`All Products`);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const titleStub: Title = fixture.debugElement.injector.get(Title);
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const productServiceStub: ProductService = fixture.debugElement.injector.get(
        ProductService
      );
      spyOn(component, 'viewErrorModal').and.callThrough();
      spyOn(titleStub, 'setTitle').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(productServiceStub, 'getProductsByCategory').and.callThrough();
      spyOn(productServiceStub, 'getProductsByBrand').and.callThrough();
      spyOn(productServiceStub, 'getProducts').and.callThrough();
      component.ngOnInit();
      expect(component.viewErrorModal).toHaveBeenCalled();
      expect(titleStub.setTitle).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(productServiceStub.getProductsByCategory).toHaveBeenCalled();
      expect(productServiceStub.getProductsByBrand).toHaveBeenCalled();
      expect(productServiceStub.getProducts).toHaveBeenCalled();
    });
  });
});
