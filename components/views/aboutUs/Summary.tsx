import React from "react";
import { Link, Box } from "@chakra-ui/react";
import { URL_BASE } from "../../../constants";
import Markdown from "markdown-to-jsx";
import Image from "../../Image";
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

const Summary = ({ text }: Props) => {
  const urlImageMarkdown = () => {
    return text.split("/uploads/").join(`${URL_BASE}/uploads/`);
  };
  return (
    <>
      <Box pl={{ base: "0px", lg: "60px" }} pr={{ base: "0px", lg: "60px" }}>
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

export default Summary;
