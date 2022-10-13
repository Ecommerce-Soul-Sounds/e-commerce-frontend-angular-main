import { ReadVarExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userProfile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.css']
})
export class userProfileComponent implements OnInit {
  // loggedInUser!: User;

  imageSrc: string | ArrayBuffer| null = "";
  fileToUpload!: string| ArrayBuffer| null;

  updateForm = new UntypedFormGroup({
    firstname: new UntypedFormControl('', Validators.required),
    lastname: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required),
    streetaddress: new UntypedFormControl('', Validators.required),
    city: new UntypedFormControl('', Validators.required),
    state: new UntypedFormControl('', Validators.required),
    zipcode: new UntypedFormControl('', [Validators.required, Validators.minLength(5)]),
    profile: new UntypedFormControl('')

  })
  
  constructor(private authService: AuthService, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Update User Profile");
    let loggedInUser = JSON.parse(sessionStorage.loggedInUser || "{}");

    if (Object.keys(loggedInUser).length !== 0) {

      this.updateForm.get('firstname')?.setValue(loggedInUser.firstName);
      this.updateForm.get('lastname')?.setValue(loggedInUser.lastName);
      this.updateForm.get('email')?.setValue(loggedInUser.email);
      this.updateForm.get('password')?.setValue(loggedInUser.password);
      this.updateForm.get('streetaddress')?.setValue(loggedInUser.address.line1);
      this.updateForm.get('city')?.setValue(loggedInUser.address.city);
      this.updateForm.get('state')?.setValue(loggedInUser.address.state);
      this.updateForm.get('zipcode')?.setValue(loggedInUser.address.zipcode);

      let profPic = document.getElementById("accountPicture") as HTMLImageElement;
      if (loggedInUser.picture !== null) {
        this.imageSrc = `data:image/jpg;base64,${loggedInUser.picture}`;
      }
      

      sessionStorage.setItem("loggedIn", "true");
      //this.loggedInUser = loggedInUser;

    } else {
      sessionStorage.setItem("loggedIn", "false");
      this.router.navigate(['login']);
    }
  }
  
  onSubmit(): void {
    
    if(this.updateForm.valid){
      showLoader();
      
      this.authService.updateUser(this.updateForm.get('firstname')?.value, this.updateForm.get('lastname')?.value, this.updateForm.get('email')?.value, this.updateForm.get('password')?.value, this.updateForm.get('streetaddress')?.value, this.updateForm.get('city')?.value, this.updateForm.get('state')?.value, this.updateForm.get('zipcode')?.value, this.fileToUpload).subscribe(
        (updatedUser) => {
          hideLoader();
          sessionStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
          alert("User updated successfully.");
        },
        (err) => {
          hideLoader();
          console.log(err);
          if (err.status === 0) {
            this.updateForm.setErrors({noconnection: true})
            console.log("Connection Error. Please check your connection and try again.");
          } else if (err.status === 400) {
            this.updateForm.setErrors({serverError: true});
            console.log("Update Error. User Profile could not be updated at this time. Please try again.");
          } else if (err.status === 500) {
            this.updateForm.setErrors({serverError: true});
            console.log("Server Error. Encountered a problem while processing your request. Please try again.");
          } else if (err.status === 401) {
            sessionStorage.removeItem("loggedInUser");
            this.router.navigate(['login']);
          }
        },
        () => {
          
          location.reload();
        }
      );
    
    } else{
      this.validateForm(this.updateForm);
    }

    function showLoader() {
      document.getElementById("loaderSpinner")!.style.display = 'block';
    }

    function hideLoader() {
      document.getElementById("loaderSpinner")!.style.display = 'none';
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
    return this.updateForm.controls;
  }

  readFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (file.size < 2000000) {
        /* checking size here - 2MB */ 
        this.fileToUpload = event.target.files[0];
        console.log(this.fileToUpload);

        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = reader.result;
        }
        reader.readAsDataURL(file);
        
        
      } else {
        this.updateForm.setErrors({invalidpicture: true});
      }
    }
  }

  convertToByte(dataURI: string) {
    var base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for(let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }
}

