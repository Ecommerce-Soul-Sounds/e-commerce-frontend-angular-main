import { ComponentFixture, TestBed } from '@angular/core/testing';

import { userProfileComponent } from './userProfile.component';


describe('userProfileComponent', () => {
  let component: userProfileComponent;
  let fixture: ComponentFixture<userProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ userProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(userProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
});