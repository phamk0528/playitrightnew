import React from "react";
import { Box } from "@chakra-ui/react";
import Image from 'next/image'

const Logo = (props: any) => {
  return (
    <Box {...props} width={"150px"} height="150px" position={'relative'}>
      <Image
        src={'https://quocbcx-1c878.kxcdn.com/assets/1/content/Logo-image-desktop-HUP.png?width=250&quality=80'}
        objectFit="contain"
        width={"150px"}
        height="150px"
        layout="fill"
        alt='logo'
        priority={true}
      />
    </Box>
  );
};

export default Logo;
