import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCasioProductsComponent } from './display-casio-products.component';

describe('DisplayCasioProductsComponent', () => {
  let component: DisplayCasioProductsComponent;
  let fixture: ComponentFixture<DisplayCasioProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCasioProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCasioProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});