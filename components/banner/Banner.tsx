import React, { useState } from "react";
import { Box, BoxProps, useBreakpointValue } from "@chakra-ui/react";
import useColorTheme from "../../hooks/useColorTheme";
import { useRouter } from "next/router";
// import Image from "../Image";
import Card from "../cards/Card";
import _ from "lodash";
import { getUrlImage } from "../../helpers/commonFuction";
import Image from 'next/image'

interface Props extends BoxProps {
  banner: any;
  column?: boolean;
  height?: number | string;
  skeleton?: boolean;
  imgBoxSize?: string | number;
  titleFontSize?: number | string;
  url?: string;
}

type FlexDirection = "row" | "column" | undefined;

const Banner = ({
  banner,
  column = false,
  imgBoxSize,
  skeleton = false,
  titleFontSize = "1.4rem",
  url,
  ...props
}: Props) => {
  const colors = useColorTheme();
  const flexDirection: FlexDirection = useBreakpointValue({
    base: "column",
    md: column ? "column" : "row",
  });


  return (
    <Card

      justifyContent="flex-start"
      cursor="pointer"
      overflow="hidden"
      display="flex"
      p="0px"
      {...props}
      flexDirection={flexDirection}
      color={colors.primary}
      w="100%"
    >
      <Box w="100%" h="38vh" position='relative' display={{ base: 'none', lg: 'flex' }} >
        <Image
          width="100%"
          height={"38vh"}
          objectFit='contain'
          layout='fill'
          // w="100%"

          alt='banner'
          src={getUrlImage(banner?.url?.replace('https://playitright.s3-ap-southeast-1.amazonaws.com/', 'https://quocbcx-1c878.kxcdn.com/') + '?width=1200&quality=100')}

        // objectFit="cover"
        />
      </Box>

      <Box w="100%" h="20vh" position='relative' display={{ base: 'flex', lg: 'none' }} >
        <Image
          width="100%"
          height={"30vh"}
          objectFit='cover'
          layout='fill'
          // w="100%"

          alt='banner'
          src={getUrlImage(banner?.url?.replace('https://playitright.s3-ap-southeast-1.amazonaws.com/', 'https://quocbcx-1c878.kxcdn.com/') + '?width=350&quality=90')}

        // objectFit="cover"
        />
      </Box>
    </Card>
  );
};

export default Banner;
