import { Card, CardBody, Flex, Text } from "@chakra-ui/react";

export type Product = {
  id: number;
  name: string;
  theme: string;
  image?: string;
};

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const image = product.image ?? "placeholder-image.png";

  return (
    <Card borderRadius="8px" flexDirection="column" height="400px" width="100%">
      <CardBody padding="0">
        <Flex
          height="60%"
          backgroundPosition="center"
          backgroundSize="cover"
          backgroundImage={`url('${image}')`}
          borderTopRadius="8px"
        />
        <Flex
          height="40%"
          flexDirection="column"
          borderBottomRadius="8px"
          padding="16px"
        >
          <Text color="orange.500" fontSize="xl" fontWeight="bolder">
            {product.id}
          </Text>
          <Text>{product.name}</Text>
          <Text fontSize="lg">{product.theme}</Text>
        </Flex>
      </CardBody>
    </Card>
  );
};
