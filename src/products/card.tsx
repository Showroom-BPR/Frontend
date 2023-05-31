import { Card, CardBody, Flex, Text } from "@chakra-ui/react";

type Props = {
  product: string;
};

export const ProductCard = ({ product }: Props) => {
  const image = "placeholder-image.png";
  const random = () => Math.floor(Math.random() * 899999 + 100000);

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
            {random()}
          </Text>
          <Text>{product}</Text>
        </Flex>
      </CardBody>
    </Card>
  );
};
