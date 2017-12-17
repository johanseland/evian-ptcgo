// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false
  ,
  region: 'us-east-1',

  identityPoolId: 'us-east-1:6c5189c4-e8ac-45b8-920a-1dab7e2e5cbd',
  userPoolId: 'us-east-1_hXldr9iYu',
  clientId: '4k0gak7h74abmvq0ghhbo3ivnn',
  cognito_idp_endpoint: '',
  cognito_identity_endpoint: '',
};
