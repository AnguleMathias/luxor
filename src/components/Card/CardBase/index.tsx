import React from "react";

import { FlexProps } from "@chakra-ui/react";
import { MotionProps, Variants } from "framer-motion";

import MotionFlex from "../../MotionFlex";

export type CardProps = FlexProps & MotionProps;

const Card: React.FC<CardProps> = ({ children, ...rest }) => {
  const variants: Variants = {
    show: {
      y: 0,
      opacity: 1,
    },
    hide: {
      y: 50,
      opacity: 0,
    },
  };

  return (
    <MotionFlex animate="show" initial="hide" variants={variants} {...rest}>
      {children}
    </MotionFlex>
  );
};

Card.defaultProps = {
  bg: "#2d2f36",
  width: "auto",
  rounded: "md",
  onClick: () => false,
  flexDirection: "column",
  roundedTopLeft: "8px",
  roundedTopRight: "8px",
  roundedBottomRight: "8px",
  roundedBottomLeft: "8px",
  overflow: "hidden",
  boxShadow: "0 2px 4px 0 rgba(0,0,0,0.17)",
};

export default Card;
