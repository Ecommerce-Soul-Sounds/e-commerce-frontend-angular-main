import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new UntypedFormGroup({
    fname: new UntypedFormControl('', Validators.required),
    lname: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required),
    street_add: new UntypedFormControl('', Validators.required),
    apt : new UntypedFormControl(''),
    city: new UntypedFormControl('', Validators.required),
    state: new UntypedFormControl('', Validators.required),
    zipcode: new UntypedFormControl('', [Validators.required, Validators.minLength(5)])
  })
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    
  }
  
  onSubmit(): void {
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.get('fname')?.value, this.registerForm.get('lname')?.value, this.registerForm.get('email')?.value, this.registerForm.get('password')?.value, this.registerForm.get('street_add')?.value, this.registerForm.get('apt')?.value, this.registerForm.get('city')?.value, this.registerForm.get('state')?.value, this.registerForm.get('zipcode')?.value).subscribe(
      () => console.log("New user registered"),
      (err) => console.log(err),
      () => this.router.navigate(['login'])
    );
    
  }else{
    this.validateForm(this.registerForm);
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
 
  get f(){
    return this.registerForm.controls;
  }


}
