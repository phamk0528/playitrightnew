import React from "react";
import { Text, Box, SimpleGrid, Link, Icon, HStack, Heading, Divider } from "@chakra-ui/react";
import { URL_BASE } from "../../../constants";
import Markdown from "markdown-to-jsx";
import Image from "../../Image";
import { FaTrain, FaBus, FaCarSide } from "react-icons/fa";
import useColorTheme from "../../../hooks/useColorTheme";
type Props = {
  getting_by_bus: string;
  getting_by_car: string;
  getting_by_train: string;
};
const MyParagraph = ({ children, ...props }: any) => {
  return <Link {...props}>{children}</Link>;
};

const MyIMG = ({ children, ...props }: any) => {
  return (
    <Box>
      <Image data-aos="fade-left" src={props.src}>
        {children}
      </Image>
    </Box>
  );
};
const GettingHere = ({
  getting_by_bus,
  getting_by_train,
  getting_by_car,
}: Props) => {
  const urlImageMarkdown = (text: string) => {
    return text.split("/uploads/").join(`${URL_BASE}/uploads/`);
  };
  const colors = useColorTheme();
  return (
    <>
      <Box pl={{ base: "0px", lg: "60px" }} pr={{ base: "0px", lg: "60px" }}>
        <Heading
          transition="ease-in 0.15s"
          fontSize={{ base: "16px", md: "20px" }}
          bottom="30px"
          textAlign="center"
          color="#004C45"
          fontFamily="Arial"
          mt="50px"
          fontWeight={700}
        >
          Getting Here
        </Heading>
        <Divider colorScheme="gray" mb="30px" mt="20px" />

        <SimpleGrid pt={3} columns={[1, null, 3]} spacing="5px" textAlign={{ base: "center", md: "left" }}>
          <Box
            pl={{ base: "0px", lg: "60px" }}
            pr={{ base: "0px", lg: "60px" }}
          >
            <HStack spacing="10px" flexDirection="row" justifyContent={{ base: "center", lg: "flex-start" }}>
              <Icon color={colors.primary} as={FaTrain} boxSize={{ base: "1.5rem", md: "2rem" }} />
              <Text
                transition="ease-in 0.15s"
                fontSize="1xl"
                fontWeight="bold"
                bottom="30px"
                textAlign="center"
                color={colors.primary}
                mt={{ base: "25px", lg: "50px" }}
                mb={{ base: "25px", lg: "50px" }}
              >
                By Train
              </Text>
            </HStack>
            <Box pt={5}>
              <Markdown
                options={{
                  overrides: {
                    a: {
                      component: MyParagraph,
                      props: {
                        color: "blue",
                      },
                    },
                    img: {
                      component: MyIMG,
                    },
                  },
                }}
              >
                {urlImageMarkdown(getting_by_train)}
              </Markdown>
            </Box>
          </Box>

          <Box
            pl={{ base: "0px", lg: "60px" }}
            pr={{ base: "0px", lg: "60px" }}
            mt={{ base: "30px", lg: "0px" }}
          >
            <HStack spacing="10px" flexDirection="row" justifyContent={{ base: "center", lg: "flex-start" }}>
              <Icon color={colors.primary} as={FaBus} boxSize={{ base: "1.5rem", md: "2rem" }} />
              <Text
                transition="ease-in 0.15s"
                fontSize="1xl"
                fontWeight="bold"
                bottom="30px"
                textAlign="center"
                color={colors.primary}
                mt={{ base: "25px", lg: "50px" }}
                mb={{ base: "25px", lg: "50px" }}
              >
                By Bus
              </Text>
            </HStack>
            <Box pt={5}>
              <Markdown
                options={{
                  overrides: {
                    a: {
                      component: MyParagraph,
                      props: {
                        color: "blue",
                      },
                    },
                    img: {
                      component: MyIMG,
                    },
                  },
                }}
              >
                {urlImageMarkdown(getting_by_bus)}
              </Markdown>
            </Box>
          </Box>
          <Box
            pl={{ base: "0px", lg: "60px" }}
            pr={{ base: "0px", lg: "60px" }}
            mt={{ base: "30px", lg: "0px" }}
          >
            <HStack spacing="10px" flexDirection="row" justifyContent={{ base: "center", lg: "flex-start" }}>
              <Icon color={colors.primary} as={FaCarSide} boxSize={{ base: "1.5rem", md: "2rem" }} />
              <Text
                transition="ease-in 0.15s"
                fontSize="1xl"
                fontWeight="bold"
                bottom="30px"
                textAlign="center"
                color={colors.primary}
                mt={{ base: "25px", lg: "50px" }}
                mb={{ base: "25px", lg: "50px" }}
              >
                By Car/Taxi
              </Text>
            </HStack>
            <Box pt={5}>
              <Markdown
                options={{
                  overrides: {
                    a: {
                      component: MyParagraph,
                      props: {
                        color: "blue",
                      },
                    },
                    img: {
                      component: MyIMG,
                    },
                  },
                }}
              >
                {urlImageMarkdown(getting_by_car)}
              </Markdown>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default GettingHere;
