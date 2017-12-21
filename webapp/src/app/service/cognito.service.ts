import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import {
  AuthenticationDetails,
  CognitoIdentityServiceProvider,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool
} from 'amazon-cognito-identity-js';

import * as AWS from 'aws-sdk/global';
import * as awsservice from 'aws-sdk/lib/service';
import * as CognitoIdentity from 'aws-sdk/clients/cognitoidentity';

/**
 * From https://github.com/awslabs/aws-cognito-angular-quickstart/blob/master/src/app/service/cognito.service.ts
 */

export interface CognitoCallback {
  cognitoCallback(message: string, result: any): void;
}

export interface LoggedInCallback {
  isLoggedIn(message: string, loggedIn: boolean): void;
}

export interface Callback {
  callback(): void;
  callbackWithParam(result: any): void;
}

@Injectable()
export class CognitoService {

    public static _REGION = environment.region;

    public static _IDENTITY_POOL_ID = environment.identityPoolId;
    public static _USER_POOL_ID = environment.userPoolId;
    public static _CLIENT_ID = environment.clientId;

    public static _POOL_DATA: any = {
        UserPoolId: CognitoService._USER_POOL_ID,
        ClientId: CognitoService._CLIENT_ID
    };

    public cognitoCreds: AWS.CognitoIdentityCredentials;

    getUserPool() {
        if (environment.cognito_idp_endpoint) {
            CognitoService._POOL_DATA.endpoint = environment.cognito_idp_endpoint;
        }
        return new CognitoUserPool(CognitoService._POOL_DATA);
    }

    getCurrentUser() {
        return this.getUserPool().getCurrentUser();
    }

    // AWS Stores Credentials in many ways, and with TypeScript this means that
    // getting the base credentials we authenticated with from the AWS globals gets really murky,
    // having to get around both class extension and unions. Therefore, we're going to give
    // developers direct access to the raw, unadulterated CognitoIdentityCredentials
    // object at all times.
    setCognitoCreds(creds: AWS.CognitoIdentityCredentials) {
        this.cognitoCreds = creds;
    }

    getCognitoCreds() {
        return this.cognitoCreds;
    }

    // This method takes in a raw jwtToken and uses the global AWS config options to build a
    // CognitoIdentityCredentials object and store it for us. It also returns the object to the caller
    // to avoid unnecessary calls to setCognitoCreds.
    buildCognitoCreds(idTokenJwt: string) {
        let url = 'cognito-idp.' + CognitoService._REGION.toLowerCase() + '.amazonaws.com/' + CognitoService._USER_POOL_ID;
        if (environment.cognito_idp_endpoint) {
            url = environment.cognito_idp_endpoint + '/' + CognitoService._USER_POOL_ID;
        }
        const logins: CognitoIdentity.LoginsMap = {};
        logins[url] = idTokenJwt;
        const params = {
            IdentityPoolId: CognitoService._IDENTITY_POOL_ID, /* required */
            Logins: logins
        };
        const serviceConfigs: awsservice.ServiceConfigurationOptions = {};
        if (environment.cognito_identity_endpoint) {
            serviceConfigs.endpoint = environment.cognito_identity_endpoint;
        }
        const creds = new AWS.CognitoIdentityCredentials(params, serviceConfigs);
        this.setCognitoCreds(creds);
        return creds;
    }


    getCognitoIdentity(): string {
        return this.cognitoCreds.identityId;
    }

    getAccessToken(callback: Callback): void {
        if (callback == null) {
            throw new Error(('CognitoUtil: callback in getAccessToken is null...returning'));
        }
        if (this.getCurrentUser() != null) {
            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log('CognitoUtil: Can\'t set the credentials:' + err);
                    callback.callbackWithParam(null);
                } else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getAccessToken().getJwtToken());
                    }
                }
            });
        } else {
            callback.callbackWithParam(null);
        }
    }

    getIdToken(callback: Callback): void {
        if (callback == null) {
            throw new Error('CognitoUtil: callback in getIdToken is null...returning');
        }
        if (this.getCurrentUser() != null) {
            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log('CognitoUtil: Can\'t set the credentials:' + err);
                    callback.callbackWithParam(null);
                } else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getIdToken().getJwtToken());
                    } else {
                        console.log('CognitoUtil: Got the id token, but the session isn\'t valid');
                    }
                }
            });
          } else {
            callback.callbackWithParam(null);
          }
    }

    getRefreshToken(callback: Callback): void {
        if (callback == null) {
            throw new Error(('CognitoUtil: callback in getRefreshToken is null...returning'));
        }
        if (this.getCurrentUser() != null) {
            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log('CognitoUtil: Can\'t set the credentials:' + err);
                    callback.callbackWithParam(null);
                } else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getRefreshToken());
                    }
                }
            });
          } else {
            callback.callbackWithParam(null);
          }
    }

    refresh(): void {
        this.getCurrentUser().getSession(function (err, session) {
            if (err) {
                console.log('CognitoUtil: Can\'t set the credentials:' + err);
            } else {
                if (session.isValid()) {
                    console.log('CognitoUtil: refreshed successfully');
                } else {
                    console.log('CognitoUtil: refreshed but session is still not valid');
                }
            }
        });
    }
}
