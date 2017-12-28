import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function create(event, context, callback) {
    const data = JSON.parse(event.body);
    
    // First reserve the nickName
    const paramsNickname = {
      TableName: "evian-ptcgo-nickname-table",
      Item: {
        nickname: data.nickname,
        userId: event.requestContext.identity.cognitoIdentityId
      },
      ConditionExpression: "attribute_not_exists(nickname)"
    }

    try {
      await dynamoDbLib.call("put", paramsNickname);
    } catch (e) {
      callback(null, failure({status: false, error: "Nickname already in use,"}));
      return;
    }    

    const params = {
      TableName: "evian-ptcgo-user-profile-table",
      Item: {
        userId: event.requestContext.identity.cognitoIdentityId,
        nickname: data.nickname,
        email: data.email,
        createdAt: new Date().getTime()
      },
      ConditionExpression: "attribute_not_exists(userId)"
    };
  
    try {
      await dynamoDbLib.call("put", params);
      callback(null, success(params.Item));
    } catch (e) {
      callback(null, failure({ status: false, error: "userId already in use"}));
    }
  }

export async function getUserProfile(event, context, callback) {
  const params = {
    TableName: "evian-ptcgo-user-profile-table",
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId
    }
  }

  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      // Return the retrieved item
      callback(null, success(result.Item));
    } else {
      callback(null, failure({ status: false, error: "Item not found." }));
    }
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false, error: "Unknown error" }));
  }
}


