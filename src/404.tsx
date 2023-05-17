import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./auth/auth-provider";

export const NotFound = () => {
  const { currentUser } = useLogin();
  const navigate = useNavigate();

  /**
   * If the current user is not logged in, the router will
   * default to here because most routes will be removed.
   *
   * We navigate manually to the login page from here.
   */
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      width="full"
      height="full"
    >
      There's nothing here..
    </Flex>
  );
};
