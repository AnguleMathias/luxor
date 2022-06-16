import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import { PokemonProps } from ".";

const Pokemon: React.FC<PokemonProps> = ({ pokemon, setSelected }) => {
  const handlePokemonClicked = () => {
    setSelected(pokemon);
  };

  return (
    <Flex
      cursor="pointer"
      onClick={handlePokemonClicked}
      height="75px"
      width="90%"
      backgroundColor="#3b3e46"
      borderRadius="4px"
      boxShadow="0.8px 2px 4px rgba(0,0,0,0.25)"
      p={3}
      mt="7px"
      mb="8px"
      alignItems="center"
    >
      <Flex
        width="55px"
        height="55px"
        ml="20px"
        mr="26px"
        borderRadius="50%"
        overflow="hidden"
      >
        <Image src={pokemon?.image || ""} alt={pokemon?.name || ""} />
      </Flex>
      <Text
        fontSize="18px"
        fontWeight="700"
        mr="10px"
        textAlign="right"
        textColor="#f2c94c"
      >
        {pokemon?.number || ""}
      </Text>
      <Text
        fontSize="18px"
        fontWeight="600"
        textAlign="center"
        textColor="#ededed"
      >
        {pokemon?.name || ""}
      </Text>
    </Flex>
  );
};

export default Pokemon;
