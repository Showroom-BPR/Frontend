import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { ProductCard } from "./card";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../auth/auth-provider";
import { useEffect, useState } from "react";
import { useFetcher } from "../common/fetcher";

export const Products = () => {
  const navigate = useNavigate();
  const { currentUser } = useLogin();
  const { handleProductFetch } = useFetcher();
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    document.body.style.backgroundImage = "none";
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  useEffect(() => {
    const f = async () => {
      const response = await handleProductFetch();
      setProducts(response);
    };

    void f();
  }, []);

  return (
    <Flex height="full">
      <Flex width="100%">
        <Grid
          width="100%"
          height="100%"
          templateColumns="repeat(5, 1fr)"
          gridGap="32px"
          padding="32px"
          overflowY="auto"
        >
          {products.map((product, idx) => (
            <GridItem
              width="100%"
              key={idx}
              colSpan={1}
              cursor="pointer"
              _hover={{
                transform: "scale(1.05)",
              }}
              onClick={() => {
                navigate(`/view/${product}`);
              }}
            >
              <ProductCard product={product} />
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};
