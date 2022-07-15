import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import useColorTheme from "../../hooks/useColorTheme";

interface Props extends BoxProps { }

const Card = ({ children, ...props }: Props) => {
  const colors = useColorTheme();
  return (
    <Box
      // paddingX="0.5rem"
      // paddingY=".5rem"
      boxShadow="sm"
      {...props}
      backgroundColor={colors.background}
      borderColor={colors.border}
    >
      {children}
    </Box>
  );
};

export default Card;
