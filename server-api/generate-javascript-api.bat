set API_GATEWAY_ID=ehtf6uhwm3

aws apigateway get-sdk --rest-api-id %API_GATEWAY_ID% --stage-name prod --sdk-type javascript c:\temp\myApi-js-sdk.zip