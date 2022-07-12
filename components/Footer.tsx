import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  /*Divider,*/ Flex,
  Spacer,
  Text,
  Icon,
  VStack,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import styles from "../constants/styles";
import Image from "./Image";
import useColorTheme from "../hooks/useColorTheme";
import { FOOTER_LINKS, SOCIAL_LINKS } from "../constants";
import { useUrlSocial } from "../helpers/contentFooter";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
interface Props { }

const Footer: React.FC<Props> = () => {
  const [urlButton, setUrlButton] = useState({
    facebook: "facebook.com",
    instagram: "instagram.com",
    youtube: "youtube.com",
    twitter: "google.com",
  });
  const colors = useColorTheme();

  useEffect(() => {
    useUrlSocial().then((res) => setUrlButton(res));
  }, []);
  const onClickSocial = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <Box
      as="footer"
      margin={0}
      boxShadow="lg"
      paddingTop="1.4rem"
      bgColor="white"
      color={colors.primary}
      pb={20}
    >
      <Box
        maxW={styles.mainMaxWidth}
        pl={{ base: "0px", lg: "80px" }}
        pr={{ base: "0px", lg: "80px" }}
        mx={"auto"}
      >
        <Flex
          wrap="wrap"
          w="100%"
          direction={{ base: "column", md: "column" }}
          pb="1.4rem"
        >
          <HStack display={{ base: "none", md: "flex" }}>
            <HStack
              pt={10}
              pl={{ base: "0", lg: "10px" }}
              spacing={4}
              align="stretch"
            >
              {FOOTER_LINKS.map(({ heading, link }: any, index) => {
                return (
                  <Box
                    textAlign="left"
                    key={heading}
                    border="1px"
                    borderColor="white"
                    borderRightColor={{
                      base: "none",
                      md:
                        index + 1 === FOOTER_LINKS.length
                          ? "none"
                          : colors.primary,
                    }}
                    pr={4}
                  >
                    <Link href={link}>
                      <Text
                        fontSize={{ base: "12px", md: "13px", lg: "17px" }}
                        color={colors.primary}
                        cursor="pointer"
                        _hover={{
                          color: colors.primary,
                          textDecoration: "underline",
                        }}
                      >
                        {heading}
                      </Text>
                    </Link>
                  </Box>
                );
              })}
            </HStack>

            <Spacer />

          </HStack>

          <VStack
            display={{ base: "none", md: "flex" }}
            alignItems="flex-start"
            pt={6}
            pl={{ base: "10px", lg: "10px" }}
          >
            <Text
              fontSize={{ base: "16px", md: "13px", lg: "17px" }}
              fontWeight="bold"
              color={colors.primary}
            >
              Follow Us:
            </Text>
            <HStack spacing="30px">
              <HStack onClick={() => onClickSocial(urlButton.facebook)}>
                <Icon color={colors.primary} as={FaFacebookF} h="20px" w="25px" />
                <Text
                  fontSize={{ base: "16px", md: "13px", lg: "17px" }}
                  color={colors.primary}
                >
                  Facebook
                </Text>
              </HStack>

              <HStack onClick={() => onClickSocial(urlButton.instagram)}>
                <Icon color={colors.primary} as={FaInstagram} h="20px" w="25px" />
                <Text
                  fontSize={{ base: "16px", md: "13px", lg: "17px" }}
                  color={colors.primary}
                >
                  Instagram
                </Text>
              </HStack>
            </HStack>
            {/* <Image
              onClick={() => onClickSocial(urlButton.facebook)}
              src="/logoFB.png"
              w="40px"
              h="40px"
            />

            <Image
              onClick={() => onClickSocial(urlButton.instagram)}
              src="/logoINS.png"
              w="40px"
              h="40px"
            /> */}
          </VStack>
          <VStack
            pt={10}
            pl={{ base: "10px", lg: "10px" }}
            spacing={4}
            align="stretch"
            display={{ base: "flex", md: "none" }}
          >
            {FOOTER_LINKS.map(({ heading, link }: any, index) => {
              return (
                <Box
                  textAlign="left"
                  key={heading}
                  border="1px"
                  borderColor="white"
                  borderRightColor={{
                    base: "none",
                    md:
                      index + 1 === FOOTER_LINKS.length
                        ? "none"
                        : colors.primary,
                  }}
                  pr={4}
                >
                  <Link href={link}>
                    <Text
                      fontSize={{ base: "16px", md: "13px", lg: "17px" }}
                      color={colors.primary}
                      cursor="pointer"
                      _hover={{
                        color: colors.primary,
                        textDecoration: "underline",
                      }}
                    >
                      {heading}
                    </Text>
                  </Link>
                </Box>
              );
            })}
          </VStack>
          <VStack
            display={{ base: "flex", md: "none" }}
            alignItems="flex-start"
            pt={10}
            pl={{ base: "10px", lg: "10px" }}
          >
            <Text
              fontSize={{ base: "16px", md: "13px", lg: "17px" }}
              color={colors.primary}
            >
              Follow Us:
            </Text>
            <HStack spacing="30px">
              <HStack onClick={() => onClickSocial(urlButton.facebook)}>
                <Icon color={colors.primary} as={FaFacebookF} h="20px" w="25px" />
                <Text
                  fontSize={{ base: "16px", md: "13px", lg: "17px" }}
                  color={colors.primary}
                >
                  Facebook
                </Text>
              </HStack>

              <HStack onClick={() => onClickSocial(urlButton.instagram)}>
                <Icon color={colors.primary} as={FaInstagram} h="20px" w="25px" />
                <Text
                  fontSize={{ base: "16px", md: "13px", lg: "17px" }}
                  color={colors.primary}
                >
                  Instagram
                </Text>
              </HStack>
            </HStack>
            {/* <Image
              onClick={() => onClickSocial(urlButton.facebook)}
              src="/logoFB.png"
              w="40px"
              h="40px"
            />

            <Image
              onClick={() => onClickSocial(urlButton.instagram)}
              src="/logoINS.png"
              w="40px"
              h="40px"
            /> */}
          </VStack>
        </Flex>
        <Center
          borderTop="1px"
          borderColor={colors.primary}
          bgColor="white"
          textAlign="center"
          flexDirection={{ base: "column", md: "row" }}
          h={10}
        >
          <Text fontSize={".9rem"} color={colors.primary}>
            © 2021 Keppel Land
          </Text>
        </Center>
      </Box>
    </Box>
  );
};

export default Footer;
