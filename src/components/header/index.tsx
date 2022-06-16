import { Button, Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const onLogout = async () => {
    navigate("/");
  };

  return (
    <Flex
      top="0"
      p="20px 0"
      mb="60px"
      zIndex="999"
      position="sticky"
      backgroundColor="#1f1f1f"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid #f2c94c"
    >
      <Flex className="logo" textColor="#f2c94c">
        <Link to="/pokemons">Pokemons</Link>
      </Flex>
      <UnorderedList>
        <ListItem>
          <Button onClick={onLogout}>
            <FaSignOutAlt />
            <Text ml="10px">Logout</Text>
          </Button>
        </ListItem>
      </UnorderedList>
    </Flex>
  );
};

export default Header;
