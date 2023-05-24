import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { ProductCard, Product } from "./card";

const products: Product[] = [
  {
    id: 143563,
    name: "Cool truck",
    theme: "Cars & Such",
    image:
      "https://www.lego.com/cdn/cs/set/assets/blt22104f90cf1009c9/10317.png?fit=bounds&format=webply&quality=80&width=320&height=320&dpr=2",
  },
  {
    id: 594543,
    name: "Cool airplane",
    theme: "Planes & Such",
  },
  {
    id: 434214,
    name: "Cool bed",
    theme: "Furniture & Such",
  },
  {
    id: 108508,
    name: "Cool plant",
    theme: "Plants & Such",
  },
  {
    id: 959855,
    name: "Cool flag",
    theme: "Flags & Such",
    image:
      "https://www.lego.com/cdn/cs/set/assets/blt22104f90cf1009c9/10317.png?fit=bounds&format=webply&quality=80&width=320&height=320&dpr=2",
  },
  {
    id: 143944,
    name: "Cool chair",
    theme: "Furniture & Such",
  },
  {
    id: 143563,
    name: "Cool truck",
    theme: "Cars & Such",
  },
  {
    id: 594543,
    name: "Cool airplane",
    theme: "Planes & Such",
  },
  {
    id: 434214,
    name: "Cool bed",
    theme: "Furniture & Such",
  },
  {
    id: 108508,
    name: "Cool plant",
    theme: "Plants & Such",
  },
  {
    id: 959855,
    name: "Cool flag",
    theme: "Flags & Such",
  },
  {
    id: 143944,
    name: "Cool chair",
    theme: "Furniture & Such",
  },
  {
    id: 143563,
    name: "Cool truck",
    theme: "Cars & Such",
  },
  {
    id: 594543,
    name: "Cool airplane",
    theme: "Planes & Such",
    image:
      "https://www.lego.com/cdn/cs/set/assets/blt22104f90cf1009c9/10317.png?fit=bounds&format=webply&quality=80&width=320&height=320&dpr=2",
  },
  {
    id: 434214,
    name: "Cool bed",
    theme: "Furniture & Such",
  },
  {
    id: 108508,
    name: "Cool plant",
    theme: "Plants & Such",
  },
  {
    id: 959855,
    name: "Cool flag",
    theme: "Flags & Such",
  },
  {
    id: 143944,
    name: "Cool chair",
    theme: "Furniture & Such",
    image:
      "https://www.lego.com/cdn/cs/set/assets/blt22104f90cf1009c9/10317.png?fit=bounds&format=webply&quality=80&width=320&height=320&dpr=2",
  },
  {
    id: 143563,
    name: "Cool truck",
    theme: "Cars & Such",
  },
  {
    id: 594543,
    name: "Cool airplane",
    theme: "Planes & Such",
  },
  {
    id: 434214,
    name: "Cool bed",
    theme: "Furniture & Such",
  },
  {
    id: 108508,
    name: "Cool plant",
    theme: "Plants & Such",
  },
  {
    id: 959855,
    name: "Cool flag",
    theme: "Flags & Such",
  },
  {
    id: 143944,
    name: "Cool chair",
    theme: "Furniture & Such",
  },
];

export const Products = () => {
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
          {products.map((product) => (
            <GridItem
              width="100%"
              key={product.id}
              colSpan={1}
              cursor="pointer"
              _hover={{
                transform: "scale(1.05)",
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
