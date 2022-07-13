import React from "react";
import { Box, Image } from "@chakra-ui/react";
const Logo = (props: any) => {
  return (
    <Box {...props}>
      <Image
        src={props.src}
        objectFit="contain"
        width={{ base: "100%", lg: "100%" }}
        height="100%"
        alt='logo'
      />
    </Box>
  );
};

export default Logo;
