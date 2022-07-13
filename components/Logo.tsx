import React from "react";
import { Box, Image } from "@chakra-ui/react";
const Logo = (props: any) => {
  return (
    <Box {...props}>
      <Image
        src={props.src}
        objectFit="contain"
        maxWidth={{ base: "100%", lg: "unset" }}
        height="100%"
      />
    </Box>
  );
};

export default Logo;
