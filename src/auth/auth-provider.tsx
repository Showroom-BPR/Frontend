import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { getCognitoUserPool } from "./auth-config";

type Login = {
  login: (username: string, password: string) => void;
  logout: () => void;
  currentUser: CognitoUser | undefined;
};

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<CognitoUser | undefined>(
    undefined
  );
  const cognitoUserPool = getCognitoUserPool();

  const login = (username: string, password: string) => {
    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    if (!cognitoUserPool) throw new Error("Cognito user pool not initialized");

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: cognitoUserPool,
    });

    cognitoUser.authenticateUser(authDetails, {
      onSuccess(session) {
        console.log("Amazon login success: ", session);
        setCurrentUser(cognitoUser);
      },
      onFailure(err) {
        console.error("Amazon login error: ", err);
      },
      newPasswordRequired() {
        setCurrentUser(cognitoUser);
      },
    });
  };

  const logout = () => {
    if (!currentUser) return;

    currentUser.signOut();
    setCurrentUser(undefined);
  };

  return { currentUser, login, logout };
};

export const LoginContext = createContext<Login | undefined>(undefined);

export const LoginProvider: FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuth();

  return <LoginContext.Provider value={auth}>{children}</LoginContext.Provider>;
};

export const useLogin = () => {
  const login = useContext(LoginContext);

  if (!login) {
    throw new Error("useLogin must be used within a LoginProvider");
  }

  return login;
};
