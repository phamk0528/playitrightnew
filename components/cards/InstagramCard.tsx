import React, { useState } from "react";
import {
  Box,
  BoxProps,
  Text,
  useBreakpointValue,
  Icon,
  Flex,
} from "@chakra-ui/react";
import useColorTheme from "../../hooks/useColorTheme";
import { useRouter } from "next/router";
import Image from "../Image";
import Card from "./Card";
import _ from "lodash";
import { fetcher } from "../../helpers/fetcher";
import useSWR from "swr";

interface Props extends BoxProps {
  instagram: any;
  token: string;
  column?: boolean;
  height?: number | string;
  skeleton?: boolean;
  imgBoxSize?: string | number;
  titleFontSize?: number | string;
}

type FlexDirection = "row" | "column" | undefined;

const InstagramCard = ({
  instagram,
  token,
  column = false,
  imgBoxSize,
  skeleton = false,
  titleFontSize = "1.4rem",
  ...props
}: Props) => {
  const [hover, setHover] = useState(false);
  const colors = useColorTheme();
  const flexDirection: FlexDirection = useBreakpointValue({
    base: "column",
    md: column ? "column" : "row",
  });
  const router = useRouter();

  const { data, error } = useSWR(
    `https://graph.facebook.com/v10.0/${instagram}?fields=caption,media_url,permalink&access_token=${token}`,
    fetcher
  );
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const onClickEvent = () => {
    window.open(data.permalink, "_blank");
  };

  return (
    <Card
      onClick={() => onClickEvent()}
      justifyContent="flex-start"
      cursor="pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ transform: `scale(${hover ? 1.1 : 1})` }}
      transition="ease-in 0.2s"
      overflow="hidden"
      display="flex"
      {...props}
      flexDirection={'column'}
      color={colors.primary}
    >
      <Box display={{ base: "none", lg: "flex" }}>
        <Image
          width="100%"
          height="100%"
          src={data.media_url}
          alt={"Photo of " + data.caption}
          // objectFit="cover"
        />
      </Box>
      <Box display={{ base: "flex", lg: "none" }}>
        <Image
          width="100%"
          height="100%"
          src={data.media_url}
          alt={"Photo of " + data.caption}
          // objectFit="cover"
        />
      </Box>
    </Card>
  );
};

export default InstagramCard;
