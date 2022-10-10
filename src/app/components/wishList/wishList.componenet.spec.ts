import { ComponentFixture, TestBed } from '@angular/core/testing';

import { wishListComponent } from './wishList.component';


describe('wishListComponent', () => {
  let component: wishListComponent;
  let fixture: ComponentFixture<wishListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ wishListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(wishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
});