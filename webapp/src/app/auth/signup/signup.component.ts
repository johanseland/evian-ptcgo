import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { CognitoCallback, CognitoService } from '../../service/cognito.service';
import { RegistrationUser, UserRegistrationService } from '../../service/user-registration.service';
import { MatIconModule } from '@angular/material/icon';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, CognitoCallback {
  registrationUser: RegistrationUser;
  errorMessage: string = null;

  isSignupSubmitted = false;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private router: Router,
    private cognitoService: CognitoService,
    private userRegistrationService: UserRegistrationService) { }

  ngOnInit() {
    this.registrationUser = new RegistrationUser();
  }

  onSignupSubmitted() {
    this.errorMessage = null;
    console.log(this.registrationUser);
    console.log(this.router);

    this.isSignupSubmitted = true;
    this.userRegistrationService.register(this.registrationUser, this);
    //this.router.navigate(['login ']);

  }

  cognitoCallback(message: string, result: any) {
    this.isSignupSubmitted = false;
    if (message != null) { // Error
        this.errorMessage = message;
        console.log('result: ' + this.errorMessage);
    } else { // Success
        // Move to the next step
        console.log('redirecting');
        this.router.navigate(['/confirm', result.user.username]);
    }
}
}
