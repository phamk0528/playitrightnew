import React, { useState } from "react";
import {
  chakra,
  HStack,
  Box,
  Flex,
  useColorModeValue,
  FlexProps,
  Button,
  Center,
} from "@chakra-ui/react";
import Image from 'next/image'


import { getUrlImage } from "../../helpers/commonFuction";
import { colors } from "../../styles/theme";

interface Props extends FlexProps {
  alt: string;
  idArticle: string;
  article: any;
}

const PostCard = ({ idArticle, article }: Props) => {
  const [hover, setHover] = useState(false);


  return (
    <Flex
      bg={useColorModeValue("white", "gray.800")}
      w="100%"
      h="100%"
      alignItems="center"
      justifyContent="center"
      onClick={() => onClick()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box
        bg={useColorModeValue("white", "gray.800")}
        mx="0"
        display={{ lg: "flex" }}
        // shadow={{ lg: "lg" }}
        rounded={{ lg: "lg" }}
        w="full"
      >
        <Box
          w={{ lg: "100%" }}
          display={{ base: "none", lg: "flex" }}
          style={{
            backgroundImage: hover
              ? `url("${getUrlImage(article.hero_desktop.url.replace('https://playitright.s3-ap-southeast-1.amazonaws.com/', 'https://quocbcx-1c878.kxcdn.com/')) + '?width=800&quality=90'}`
              : `url("${getUrlImage(article.hero_desktop.url.replace('https://playitright.s3-ap-southeast-1.amazonaws.com/', 'https://quocbcx-1c878.kxcdn.com/')) + '?width=800&quality=90'}")`,
            // backgroundImage:  `url("${getUrlImage(article.hero_desktop.url)}`,
            backgroundRepeat: "no-repeat",

            backgroundSize: "cover",
            backgroundPosition: "50% 50%"
          }}
          justifyContent="flex-end"
          flexDirection="column"
          h={{ base: "350px", lg: "660px" }}
          pl={{ base: "0px", lg: "80px" }}
          pr={{ base: "0px", lg: "80px" }}
        ></Box>

        <Box w="100%" h="45vh" display={{ base: "flex", lg: "none" }} position='relative'>
          <Image
            // objectFit="fill"
            src={getUrlImage(article.hero_mobile.url.replace('https://playitright.s3-ap-southeast-1.amazonaws.com/', 'https://quocbcx-1c878.kxcdn.com/') + '?width=380&quality=95')}
            // maxHeight={"640px"}
            //
            width="380px"
            height={"45vh"}
            objectFit='cover'
            layout='fill'
            // w="100%"
            priority={true}
            alt='banner'
          />
        </Box>

        <Box
          color={colors.primary}

          // justify="center"
          // pl={{ base: "0px", lg: "65%" }}
          pos="absolute"
          // top={{ base: "8px", lg: "30" }}
          display="flex"
          w="100%"
        >
          <Box
            py={20}
            px={6}
            maxW={{ base: "xl", lg: "5xl" }}
            textAlign={{ base: "center", lg: "left" }}
            w={{ lg: "80%" }}
            pl="5%"
          >

            <Center pt={{ base: 0, md: 0, lg: 2 }} mt="15vh">
              <chakra.h1
                fontFamily="Arial"
                data-aos="fade-left"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="bold"
              >
                {article.title}
              </chakra.h1>
            </Center>
            <Center pt={{ base: 0, md: 0, lg: 2 }}>
              <Box
                textAlign="left"
                alignItems="center"
                py={3}
                data-aos="fade-left"
              >
                <chakra.h2 fontWeight="bold" fontSize="lg">
                  {article.summary}
                </chakra.h2>
              </Box>
            </Center>
            {article.button ? (
              <Center pt={{ base: 0, md: 0, lg: 2 }}>
                <Button

                  borderRadius={20}
                  bgColor={colors.primary}
                  color="#e2cea5"
                  variant="solid"
                  _hover={{ backgroundColor: "#c59c47", color: "white" }}
                >
                  {article.title_button}
                </Button>
              </Center>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default PostCard;
