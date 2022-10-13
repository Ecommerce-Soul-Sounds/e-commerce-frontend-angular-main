import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    const titleStub = () => ({ setTitle: (_string: any) => ({}) });
    const routerStub = () => ({ navigate: (_array: any) => ({}) });
    const authServiceStub = () => ({
      login: (arg: any, arg1: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      loggedIn: {}
    });
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: Title, useFactory: titleStub },
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`isAuthenticated has default value`, () => {
    expect(component.isAuthenticated).toEqual(false);
  });

  describe('validateForm', () => {
    it('makes expected calls', () => {
      const untypedFormGroupStub: UntypedFormGroup = <any>{};
      spyOn(component, 'validateForm').and.callThrough();
      spyOn(untypedFormGroupStub, 'get').and.callThrough();
      component.validateForm(untypedFormGroupStub);
      expect(component.validateForm).toHaveBeenCalled();
      expect(untypedFormGroupStub.get).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      spyOn(component, 'validateForm').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(authServiceStub, 'login').and.callThrough();
      component.onSubmit();
      expect(component.validateForm).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(authServiceStub.login).toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.register();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
