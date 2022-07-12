import React from "react";
import { Link, Box, Heading, Divider } from "@chakra-ui/react";
import { URL_BASE } from "../../../constants";
import Markdown from "markdown-to-jsx";
import Image from "../../Image";
import useColorTheme from "../../../hooks/useColorTheme";
type Props = {
  text?: any;
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

const ConciergeServices = ({ text }: Props) => {
  const colors = useColorTheme();
  const urlImageMarkdown = () => {
    return text.split("/uploads/").join(`${URL_BASE}/uploads/`);
  };
  return (
    <>
      <Box pl={{ base: "0px", lg: "60px" }} pr={{ base: "0px", lg: "60px" }} textAlign={{ base: "center", md: "left" }}>
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
          Concierge Services
        </Heading>
        <Divider colorScheme="gray" mb="30px" mt="20px" />
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
          {urlImageMarkdown()}
        </Markdown>
      </Box>
    </>
  );
};

export default ConciergeServices;
