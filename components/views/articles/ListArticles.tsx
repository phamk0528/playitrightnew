import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import ArticleCard from "../../cards/ArticleCard";

type Props = {
  articles: any;
  margin?: number;
  containerHeight?: number;
};

const ListArticles = ({ articles }: Props) => {
  let height = articles.map((item: any) => {
    return item?.art_name?.length ?? 0;
  });
  var largest = Math.max.apply(Math, height);
  return (
    <>
      <Box
        as="section"
        pt="4%"
        pl={{ base: "0px", lg: "60px" }}
        pr={{ base: "0px", lg: "60px" }}
      >
        <SimpleGrid pt={3} columns={[1, null, 4]} spacing="5px">
          {articles.map((article: any) => (
            <Box pt={{ base: "5%", lg: "10px" }} key={"listEvent" + article.id}>
              <ArticleCard
                column
                article={article}
                idArticle={article.id}
                titleFontSize={"1em"}
                heightTitle={largest + 15 + "px"}
              />
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default ListArticles;
