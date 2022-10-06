import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required)
  })
  
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router, private titleService: Title) { 
    this.titleService.setTitle("Login - Soul Sounds");
  }

  ngOnInit(): void {
  }
  
  onSubmit(): void {
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
      (loggedInUser) => {
        this.authService.loggedIn=true;
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      },
      (err) => {
        console.log(err);
        if (err.status === 400) {
          this.loginForm.setErrors({unauthenticated: true});
          console.log("Invalid Username/Password Combo.");
        } 
      },
      () => this.router.navigate(['home'])
    );
    }else{  
      this.validateForm(this.loginForm);
    }
  }

  validateForm(untypedFormGroup: UntypedFormGroup){
    Object.keys(untypedFormGroup.controls).forEach(field =>{
      const control = untypedFormGroup.get(field);
      if(control instanceof UntypedFormControl){
        control.markAsTouched({onlySelf:true});
      }else if(control instanceof UntypedFormGroup){
        this.validateForm(control);
      }
    })
  }

  register(): void {
    this.router.navigate(['register']);
  }

  get f(){
    return this.loginForm.controls;
  }

  get authenticated() {
    return this.isAuthenticated;
  }
}
