import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { RegistrationUser, UserRegistrationService } from '../../service/user-registration.service';
import { CognitoCallback, CognitoService } from '../../service/cognito.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit, OnDestroy, CognitoCallback {
  confirmationCode: string;
  email: string;
  errorMessage: string;
  private sub: any;

  constructor(private router: Router, public route: ActivatedRoute,  private userRegistrationService: UserRegistrationService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.email = params['email'];
      console.log(params);
    });

    this.errorMessage = null;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  onConfirmSubmitted() {
    this.errorMessage = null;
    console.log(this.email);
    this.userRegistrationService.confirmRegistration(this.email, this.confirmationCode, this);
  }

  cognitoCallback(message: string, result: any) {
    if (message != null) { //error
        this.errorMessage = message;
        console.log('message: ' + this.errorMessage);
    } else { //success
        //move to the next step
        console.log('Moving to securehome');
        // this.configs.curUser = result.user;
        this.router.navigate(['/securehome']);
    }
}
}
