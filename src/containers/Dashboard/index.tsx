import React, { useState } from "react";
import { Button, Flex, Grid, Image, Text, useToast } from "@chakra-ui/react";
import { get } from "lodash";

import { Pokemon, usePokemonsQuery } from "../../generated/graphql";
import Header from "../../components/header";
import PokemonItem from "./Pokemon";
import Spinner from "../../components/Spinner";

export type PokemonProps = {
  pokemon: Pokemon;
  setSelected: (pokemon: Pokemon) => void;
};

const Dashboard: React.FC = () => {
  const toast = useToast();
  const [selected, setSelected] = useState<Pokemon | undefined>();
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

  const { data, loading, fetchMore } = usePokemonsQuery({
    variables: {
      first: 10,
    },
    onError: (err) => toast({ status: "error", title: err.message }),
    fetchPolicy: "cache-and-network",
  });

  const pokemonData = get(data, "pokemons") as Pokemon[];

  if (loading) return <Spinner />;

  return (
    <>
      <Header />
      <Flex p={8} width="100%" height="90vh" flexDirection="row">
        <Flex
          width="40%"
          height="100%"
          flexDirection="column"
          roundedTopLeft="8px"
          roundedBottomLeft="8px"
        >
          <Flex
            textColor="#f2c94c"
            height="100%"
            p={8}
            backgroundColor="#2d2f36"
            flexDirection="column"
            overflow="auto"
          >
            {pokemonData?.map((pokemon) => (
              <Flex key={pokemon.id} width="100%">
                <PokemonItem pokemon={pokemon} setSelected={setSelected} />
              </Flex>
            ))}
          </Flex>
          <Button
            isDisabled={fetchMoreLoading}
            width="100%"
            roundedBottomRight="0"
            roundedTopRight="0"
            roundedTopLeft="0"
            textColor="white"
            background="#f2c94c"
            _hover={{ background: "white", textColor: "#f2c94c" }}
            onClick={() => {
              setFetchMoreLoading(true);
              fetchMore({
                variables: {
                  first: pokemonData.length + 10,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  const newPokenom = get(
                    fetchMoreResult,
                    "pokemons",
                    null
                  ) as Pokemon[];

                  return {
                    pokemons: [...newPokenom],
                  };
                },
              });
              setFetchMoreLoading(false);
            }}
          >
            View More
          </Button>
        </Flex>
        <Flex
          textColor="#f2c94c"
          width="60%"
          height="100%"
          backgroundColor="#3b3e46"
          roundedTopRight="8px"
          roundedBottomRight="8px"
        >
          {selected && (
            <Flex flexDirection="column" width="100%">
              <Flex
                height="128px"
                width="100%"
                borderBottom="2px solid #2D2F36"
              >
                <Flex
                  pl={8}
                  pr={8}
                  width="100%"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text textColor="#ededed" fontSize="32px" fontWeight="600">
                    {selected.name || ""}
                  </Text>
                  <Text
                    letterSpacing="0.1em"
                    fontSize="32px"
                    fontWeight="600"
                  >{`#${selected.number || ""}`}</Text>
                </Flex>
              </Flex>
              <Flex overflow="auto" flexDirection="column">
                <Flex mt={5} flexDirection="column" pl={8} pr={8}>
                  <Flex justify="center" align="center" width="100%" mt={4}>
                    <Image
                      width="120px"
                      height="120px"
                      borderRadius="50%"
                      src={selected.image || ""}
                    />
                  </Flex>
                </Flex>
                <Flex mt={8} flexDirection="column" textAlign="left">
                  <Flex pl={10} pr={8} pb={3} width="100%">
                    <Grid
                      width="100%"
                      paddingBottom="6px"
                      gridTemplateColumns="40% 60%"
                      justifyContent="space-between"
                      borderBottom="0.5px solid #2d2f36"
                    >
                      <Grid>
                        <Text
                          style={{
                            fontWeight: "Bold",
                          }}
                        >
                          Classification:
                        </Text>
                      </Grid>
                      <Grid>
                        <Text style={{ paddingBottom: "6px" }}>
                          {selected.classification || ""}
                        </Text>
                      </Grid>
                    </Grid>
                  </Flex>
                  <Flex pl={10} pr={8} pb={3} width="100%">
                    <Grid
                      width="100%"
                      paddingBottom="6px"
                      gridTemplateColumns="40% 60%"
                      justifyContent="space-between"
                      borderBottom="0.5px solid #2d2f36"
                    >
                      <Grid>
                        <Text
                          style={{
                            fontWeight: "Bold",
                          }}
                        >
                          Flee rate:
                        </Text>
                      </Grid>
                      <Grid>
                        <Text style={{ paddingBottom: "6px" }}>
                          {selected.fleeRate || ""}
                        </Text>
                      </Grid>
                    </Grid>
                  </Flex>
                  <Flex pl={10} pr={8} pb={3} width="100%">
                    <Grid
                      width="100%"
                      paddingBottom="6px"
                      gridTemplateColumns="40% 60%"
                      justifyContent="space-between"
                      borderBottom="0.5px solid #2d2f36"
                    >
                      <Grid>
                        <Text
                          style={{
                            fontWeight: "Bold",
                          }}
                        >
                          Max CP:
                        </Text>
                      </Grid>
                      <Grid>
                        <Text style={{ paddingBottom: "6px" }}>
                          {selected.maxCP || ""}
                        </Text>
                      </Grid>
                    </Grid>
                  </Flex>
                  <Flex pl={10} pr={8} pb={3} width="100%">
                    <Grid
                      width="100%"
                      paddingBottom="6px"
                      gridTemplateColumns="40% 60%"
                      justifyContent="space-between"
                      borderBottom="0.5px solid #2d2f36"
                    >
                      <Grid>
                        <Text
                          style={{
                            fontWeight: "Bold",
                          }}
                        >
                          Max HP:
                        </Text>
                      </Grid>
                      <Grid>
                        <Text style={{ paddingBottom: "6px" }}>
                          {selected.maxHP || ""}
                        </Text>
                      </Grid>
                    </Grid>
                  </Flex>
                  <Flex pl={10} pr={8} pb={3} width="100%">
                    <Grid
                      width="100%"
                      paddingBottom="6px"
                      gridTemplateColumns="40% 60%"
                      justifyContent="space-between"
                      borderBottom="0.5px solid #2d2f36"
                    >
                      <Grid>
                        <Text
                          style={{
                            fontWeight: "Bold",
                          }}
                        >
                          Types:
                        </Text>
                      </Grid>
                      <Grid>
                        {selected.types?.map((type, index) => (
                          <Text
                            key={`${index}-${type}`}
                            style={{ paddingBottom: "6px" }}
                          >
                            {type || ""}
                          </Text>
                        ))}
                      </Grid>
                    </Grid>
                  </Flex>
                  <Flex pl={10} pr={8} pb={3} width="100%">
                    <Grid
                      width="100%"
                      paddingBottom="6px"
                      gridTemplateColumns="40% 60%"
                      justifyContent="space-between"
                      borderBottom="0.5px solid #2d2f36"
                    >
                      <Grid>
                        <Text
                          style={{
                            fontWeight: "Bold",
                          }}
                        >
                          Resistant:
                        </Text>
                      </Grid>
                      <Grid>
                        {selected.resistant?.map((resistant, index) => (
                          <Text
                            key={`${index}-${resistant}`}
                            style={{ paddingBottom: "6px" }}
                          >
                            {resistant || ""}
                          </Text>
                        ))}
                      </Grid>
                    </Grid>
                  </Flex>
                  <Flex pl={10} pr={8} pb={3} width="100%">
                    <Grid
                      width="100%"
                      paddingBottom="6px"
                      gridTemplateColumns="40% 60%"
                      justifyContent="space-between"
                      borderBottom="0.5px solid #2d2f36"
                    >
                      <Grid>
                        <Text
                          style={{
                            fontWeight: "Bold",
                          }}
                        >
                          Evolutions:
                        </Text>
                      </Grid>
                      <Grid>
                        {selected.evolutions?.map((evolution, index) => (
                          <Flex flexDirection="row" key={evolution?.id}>
                            <Text style={{ paddingBottom: "6px" }}>
                              {index + 1}.
                            </Text>
                            <Flex ml={2} width="100%" flexDirection="column">
                              <Text style={{ paddingBottom: "6px" }}>
                                <b>Name:</b> {evolution?.name || ""}
                              </Text>
                              <Text style={{ paddingBottom: "6px" }}>
                                <b>Flee rate:</b> {evolution?.fleeRate || ""}
                              </Text>
                            </Flex>
                          </Flex>
                        ))}
                      </Grid>
                    </Grid>
                  </Flex>
                  <Flex pl={10} pr={8} pb={3} width="100%">
                    <Grid
                      width="100%"
                      paddingBottom="6px"
                      gridTemplateColumns="40% 60%"
                      justifyContent="space-between"
                      borderBottom="0.5px solid #2d2f36"
                    >
                      <Grid>
                        <Text
                          style={{
                            fontWeight: "Bold",
                          }}
                        >
                          Evolution requirements:
                        </Text>
                      </Grid>
                      <Grid>
                        <Flex flexDirection="column">
                          <Text style={{ paddingBottom: "6px" }}>
                            <b>Name:</b>{" "}
                            {selected.evolutionRequirements?.name || ""}
                          </Text>
                          <Text style={{ paddingBottom: "6px" }}>
                            <b>Amount:</b>{" "}
                            {selected.evolutionRequirements?.amount || ""}
                          </Text>
                        </Flex>
                      </Grid>
                    </Grid>
                  </Flex>
                  <Flex pl={10} pr={8} pb={3} width="100%">
                    <Grid
                      width="100%"
                      paddingBottom="6px"
                      gridTemplateColumns="40% 60%"
                      justifyContent="space-between"
                      borderBottom="0.5px solid #2d2f36"
                    >
                      <Grid>
                        <Text
                          style={{
                            fontWeight: "Bold",
                          }}
                        >
                          Weight:
                        </Text>
                      </Grid>
                      <Grid>
                        <Flex flexDirection="column">
                          <Text style={{ paddingBottom: "6px" }}>
                            <b>Maximum: </b>
                            {selected.weight?.maximum || ""}
                          </Text>
                          <Text style={{ paddingBottom: "6px" }}>
                            <b>Minimum: </b>
                            {selected.weight?.minimum || ""}
                          </Text>
                        </Flex>
                      </Grid>
                    </Grid>
                  </Flex>
                  <Flex pl={10} pr={8} pb={3} width="100%">
                    <Grid
                      width="100%"
                      paddingBottom="6px"
                      gridTemplateColumns="40% 60%"
                      justifyContent="space-between"
                      borderBottom="0.5px solid #2d2f36"
                    >
                      <Grid>
                        <Text
                          style={{
                            fontWeight: "Bold",
                          }}
                        >
                          Height:
                        </Text>
                      </Grid>
                      <Grid>
                        <Flex flexDirection="column">
                          <Text style={{ paddingBottom: "6px" }}>
                            <b>Maximum:</b> {selected.height?.maximum || ""}
                          </Text>
                          <Text style={{ paddingBottom: "6px" }}>
                            <b>Minimum:</b> {selected.height?.minimum || ""}
                          </Text>
                        </Flex>
                      </Grid>
                    </Grid>
                  </Flex>

                  <Flex pl={10} pr={8} pb={3} width="100%">
                    <Grid
                      width="100%"
                      paddingBottom="6px"
                      gridTemplateColumns="40% 60%"
                      justifyContent="space-between"
                      borderBottom="0.5px solid #2d2f36"
                    >
                      <Grid>
                        <Text
                          style={{
                            fontWeight: "Bold",
                          }}
                        >
                          Attacks:
                        </Text>
                      </Grid>
                      <Grid width="100%">
                        <Grid
                          paddingBottom="6px"
                          gridTemplateColumns="40% 60%"
                          justifyContent="space-between"
                          borderBottom="0.5px solid #2d2f36"
                        >
                          <Grid>
                            <Text
                              style={{
                                fontWeight: "Bold",
                              }}
                            >
                              Fast:
                            </Text>
                          </Grid>
                          <Grid>
                            <Flex flexDirection="column">
                              {selected.attacks?.fast?.map((attack, index) => (
                                <Flex
                                  flexDirection="row"
                                  key={`${index}-${attack}`}
                                >
                                  <Text style={{ paddingBottom: "6px" }}>
                                    {index + 1}.
                                  </Text>
                                  <Flex flexDirection="column" ml={2}>
                                    <Text style={{ paddingBottom: "6px" }}>
                                      <b>Name:</b> {attack?.name || ""}
                                    </Text>
                                    <Text style={{ paddingBottom: "6px" }}>
                                      <b>Type:</b> {attack?.type || ""}
                                    </Text>
                                    <Text style={{ paddingBottom: "6px" }}>
                                      <b>Damage:</b> {attack?.damage || ""}
                                    </Text>
                                  </Flex>
                                </Flex>
                              ))}
                            </Flex>
                          </Grid>
                        </Grid>
                        <Grid
                          pb="6px"
                          pt="6px"
                          gridTemplateColumns="40% 60%"
                          justifyContent="space-between"
                        >
                          <Grid>
                            <Text
                              style={{
                                fontWeight: "Bold",
                              }}
                            >
                              Special:
                            </Text>
                          </Grid>
                          <Grid>
                            <Flex flexDirection="column">
                              {selected.attacks?.special?.map(
                                (attack, index) => (
                                  <Flex
                                    flexDirection="row"
                                    key={`${index}-${attack}`}
                                  >
                                    <Text style={{ paddingBottom: "6px" }}>
                                      {index + 1}.
                                    </Text>
                                    <Flex flexDirection="column" ml={2}>
                                      <Text style={{ paddingBottom: "6px" }}>
                                        <b>Name:</b> {attack?.name || ""}
                                      </Text>
                                      <Text style={{ paddingBottom: "6px" }}>
                                        <b>Type:</b> {attack?.type || ""}
                                      </Text>
                                      <Text style={{ paddingBottom: "6px" }}>
                                        <b>Damage:</b> {attack?.damage || ""}
                                      </Text>
                                    </Flex>
                                  </Flex>
                                )
                              )}
                            </Flex>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default Dashboard;
