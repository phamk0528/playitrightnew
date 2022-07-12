import React from "react";
import { Text, Box, SimpleGrid, Link, Icon, HStack, Heading, Divider } from "@chakra-ui/react";
import { URL_BASE } from "../../../constants";
import Markdown from "markdown-to-jsx";
import Image from "../../Image";
import { FaCarSide } from "react-icons/fa";
import { MdMotorcycle } from "react-icons/md";
import useColorTheme from "../../../hooks/useColorTheme";
type Props = {
  carpark_charges_car: string;
  carpark_charges_motorcycle: string;
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
const CarparkCharges = ({
  carpark_charges_car,
  carpark_charges_motorcycle,
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
          Carpark Charges
        </Heading>
        <Divider colorScheme="gray" mb="30px" mt="20px" />
        <SimpleGrid pt={3} columns={[1, 1, 2]} spacing={10} textAlign={{ base: "center", md: "left" }}>
          <Box
            pl={{ base: "0px", lg: "60px" }}
            pr={{ base: "0px", lg: "20px" }}

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
                Car
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
                {urlImageMarkdown(carpark_charges_car)}
              </Markdown>
            </Box>
          </Box>
          <Box
            pl={{ base: "0px", lg: "80px" }}
            pr={{ base: "0px", lg: "60px" }}
            mt={{ base: "30px", lg: "0px" }}
          >
            <HStack spacing="10px" flexDirection="row" justifyContent={{ base: "center", lg: "flex-start" }}>
              <Icon color={colors.primary} as={MdMotorcycle} boxSize={{ base: "1.5rem", md: "2rem" }} />
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
                Motorcycle
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
                {urlImageMarkdown(carpark_charges_motorcycle)}
              </Markdown>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default CarparkCharges;
