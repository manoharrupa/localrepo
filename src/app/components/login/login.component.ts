import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidationService } from 'src/app/services/password-validation.service';
import { signinServiceService } from 'src/app/services/singin-service.service';
import Swal from 'sweetalert2';

// import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  submitted = true;
  
  loginform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
       PasswordValidationService.passwordValidator()
    ])
  });

  get d() {
    return this.loginform.controls;
  }
  
  get email() {
    return this.loginform.get('email');
  }
  
  get password() {
    return this.loginform.get('password');
  }

 constructor(private signinServiceService:signinServiceService, public router: Router, ){}
  loginResponse:any;
  async onSubmit(){
    this.submitted = true;
    if (this.loginform.valid) {
      const formData = {
        email: this.loginform.value.email,
        password: this.loginform.value.password,
      };
        const response = this.signinServiceService.login(formData).subscribe((res) => {
          this.loginResponse = res;
          console.log(this.loginResponse);
          Swal.fire({
            icon: 'success',
            title: `Welcome ${this.loginResponse.firstName}... `,
            text: 'Sign In succesfull',
          });
          console.log("response: ", this.loginResponse);
          // alert("Login successful")
          sessionStorage.setItem('userId', this.loginResponse.id);
          this.router.navigate(['dashBoard']);
        },
          error => {
            const errorMessage = error?.error?.message || 'An error occurred';
            Swal.fire({
              icon: 'error',
              title: 'Sorry...',
              text: `${errorMessage}`,
            });
            // alert("User SignIn failed: " + errorMessage);
            // alert("User register failed");
            console.error('Registration error:', error);
          });
  }else {
    Swal.fire({
      icon: 'info',
      title: 'Sorry...',
      text: 'Please enter the mandatory field!',
    })
    Object.keys(this.loginform.controls).forEach(key => {
      this.loginform.get(key)?.markAsTouched();
    });
  }
  
}

}
