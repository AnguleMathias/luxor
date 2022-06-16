import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Flex } from "@chakra-ui/react";

import Dashboard from "./containers/Dashboard";
import Login from "./containers/Login";
import PageNotFound from "./containers/PageNotFound";

export const App = () => (
  <ChakraProvider>
    <Router>
      <Flex
        flexDirection="column"
        width="100%"
        maxWidth="90vw"
        m="0 auto"
        p="0 20px"
        textAlign="center"
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/pokemons" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Flex>
    </Router>
  </ChakraProvider>
);
