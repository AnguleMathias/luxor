import { Flex } from "@chakra-ui/react";

const Spinner = () => {
  return (
    <Flex
      position="fixed"
      top={0}
      right={0}
      bottom={0}
      left={0}
      zIndex="5000"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        className="loadingSpinner"
        flexDirection="row"
        width="64px"
        height="64px"
        border="8px solid"
        borderRadius="50%"
        borderColor="#f2c94c transparent #f2c94c transparent"
      />
    </Flex>
  );
};

export default Spinner;
