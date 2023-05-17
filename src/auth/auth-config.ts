import {
  CognitoUserPool,
  ICognitoUserPoolData,
} from "amazon-cognito-identity-js";

const userpoolConfig: ICognitoUserPoolData = {
  UserPoolId: import.meta.env.REACT_APP_AUTH_USER_POOL_ID ?? "",
  ClientId: import.meta.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID ?? "",
  Storage: window.localStorage,
};

export const getCognitoUserPool = (): CognitoUserPool | undefined => {
  try {
    const cognitoUserPool = new CognitoUserPool(userpoolConfig);
    return cognitoUserPool;
  } catch (error) {
    console.log(error);
  }

  return undefined;
};
