import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useLogin } from "./auth-provider";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();

  return (
    <Flex
      width="full"
      height="full"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Flex
        flexGrow={0}
        maxWidth="60%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="16px"
      >
        <Input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          type="text"
          placeholder="Username"
          width="150%"
          autoComplete="username"
        />
        <Input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          type="password"
          placeholder="Password"
          width="150%"
          autoComplete="current-password"
        />
        <Button
          onClick={() => {
            login(username, password);
          }}
          padding="10px 32px"
        >
          Login
        </Button>
      </Flex>
    </Flex>
  );
};
