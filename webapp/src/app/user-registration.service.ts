import { Inject, Injectable } from '@angular/core';
import { CognitoCallback, CognitoService } from './cognito.service';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk/global';


export class RegistrationUser {
  name: string;
  email: string;
  password: string;
}

export class NewPasswordUser {
  username: string;
  existingPassword: string;
  password: string;
}


@Injectable()
export class UserRegistrationService {

    constructor(@Inject(CognitoService) public cognitoService: CognitoService) {

    }

    register(user: RegistrationUser, callback: CognitoCallback): void {
        console.log('UserRegistrationService: user is ' + user);

        const attributeList = [];

        const dataEmail = {
            Name: 'email',
            Value: user.email
        };
        const dataNickname = {
            Name: 'nickname',
            Value: user.name
        };
        attributeList.push(new CognitoUserAttribute(dataEmail));
        attributeList.push(new CognitoUserAttribute(dataNickname));

        this.cognitoService.getUserPool().signUp(user.email, user.password, attributeList, null, function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                console.log('UserRegistrationService: registered user is ' + result);
                callback.cognitoCallback(null, result);
            }
        });

    }

    confirmRegistration(username: string, confirmationCode: string, callback: CognitoCallback): void {

        const userData = {
            Username: username,
            Pool: this.cognitoService.getUserPool()
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

    resendCode(username: string, callback: CognitoCallback): void {
        const userData = {
            Username: username,
            Pool: this.cognitoService.getUserPool()
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.resendConfirmationCode(function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

    newPassword(newPasswordUser: NewPasswordUser, callback: CognitoCallback): void {
        console.log(newPasswordUser);
        // Get these details and call
        // cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
        const authenticationData = {
            Username: newPasswordUser.username,
            Password: newPasswordUser.existingPassword,
        };
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        const userData = {
            Username: newPasswordUser.username,
            Pool: this.cognitoService.getUserPool()
        };

        console.log('UserLoginService: Params set...Authenticating the user');
        const cognitoUser = new CognitoUser(userData);
        console.log('UserLoginService: config is ' + AWS.config);
        cognitoUser.authenticateUser(authenticationDetails, {
            newPasswordRequired: function (userAttributes, requiredAttributes) {
                // User was signed up by an admin and must provide new
                // password and required attributes, if any, to complete
                // authentication.
                // the api doesn't accept this field back
                delete userAttributes.email_verified;
                cognitoUser.completeNewPasswordChallenge(newPasswordUser.password, requiredAttributes, {
                    onSuccess: function (result) {
                        callback.cognitoCallback(null, userAttributes);
                    },
                    onFailure: function (err) {
                        callback.cognitoCallback(err, null);
                    }
                });
            },
            onSuccess: function (result) {
                callback.cognitoCallback(null, result);
            },
            onFailure: function (err) {
                callback.cognitoCallback(err, null);
            }
        });
    }
}
