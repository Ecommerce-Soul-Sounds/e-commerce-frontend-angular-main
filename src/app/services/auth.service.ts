import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = `${environment.baseUrl}/auth`;
  userUrl: string = `${environment.baseUrl}/user`; 

  loggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const payload = {email:email, password:password};
    return this.http.post<any>(`${this.authUrl}/login`, payload, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  logout(): void{
    this.http.post(`${this.authUrl}/logout`, null, {headers: environment.headers, withCredentials: environment.withCredentials}).subscribe(
      () => {
        console.log("LOGGED OUT");
      }
    );
  }

  register(firstName: string, lastName: string, email: string, password: string, street_address: string, apt: string, city:string, state:string, zipcode:number): Observable<any> {
    const payload = {firstName: firstName, lastName: lastName, email: email, password: password, street_address: street_address, apt:apt, city:city, state:state, zipcode:zipcode};
    return this.http.post<any>(`${this.authUrl}/register`, payload, {headers: environment.headers});
  }


  updateUser(firstname: string, lastname: string, email: string, password: string, streetaddress: string, city: string, state: string, zipcode: number, profile: any): Observable<any> {
    const formData = new FormData();
    const userUpdateInfo = {email: email, password: password, firstName: firstname, lastName: lastname, street_address: streetaddress, city: city, state: state, zipcode: zipcode, picture: profile}
    console.log(JSON.stringify(userUpdateInfo));
    let jsonp = JSON.stringify(userUpdateInfo);
    // formData.append('userUpdateInfo', JSON.stringify(payload));

    if (profile != null) {
      formData.append('picture', new Blob([profile]));

      // formData.append('picture', new Blob([JSON.stringify({
      //   profile
      // })], {
      //     type: "application/octet-stream"
      // }));

    }


    formData.append('userUpdateInfo', new Blob([jsonp], {
        type: "application/json"
    }), "userUpdateInfo");


    // formData.append('email', email);
    // formData.append('password', password);
    // formData.append('firstName', firstname);
    // formData.append('lastName', lastname);
    // formData.append('street_address', streetaddress);
    // formData.append('city', city);
    // formData.append('state', state);
    // formData.append('zipcode', `${zipcode}`);

    
    //const payload = {firstname: firstname, lastname: lastname, email: email, password: password, streetaddress: streetaddress, city:city, state:state, zipcode:zipcode,profile:profile};
    
    console.log(formData);

    

    return this.http.put<any>(`${this.userUrl}/update`, formData, 
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:4200',
        }
      }
    );
  }
}

