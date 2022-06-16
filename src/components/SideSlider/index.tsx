import * as React from "react";
import { Flex, FlexProps } from "@chakra-ui/react";
import { Variants } from "framer-motion";
import styled from "@emotion/styled";

import MotionFlex from "../MotionFlex";

const PanelWrapper = styled(MotionFlex)`
  width: 400px;
  right: 40%;
  display: flex;
  max-width: 100%;
  position: fixed;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  @media screen and (max-width: 768px) {
    width: 100%;
    position: relative;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const variants: Variants = {
  hidden: {
    x: "calc(800px + 15%)",
  },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      damping: 30,
    },
  },
};

const SideSlider: React.FC<FlexProps> = ({ children, justify }) => {
  return (
    <React.Fragment>
      <PanelWrapper
        p={5}
        m={[5, 0]}
        bg="transparent"
        initial="hidden"
        animate="visible"
        rounded={["md", 0]}
        variants={variants}
      >
        <Flex flexDir="column" width="100%" minHeight="100%" justify={justify}>
          {children}
        </Flex>
      </PanelWrapper>
    </React.Fragment>
  );
};

export default SideSlider;

SideSlider.defaultProps = {
  justify: "center",
};
