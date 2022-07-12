import React, { useState } from "react";
import { Image as ChakraImage, ImageProps, Skeleton } from "@chakra-ui/react";

interface Props extends ImageProps { }

const Image = ({ ...props }: Props) => {


  return <ChakraImage {...props} />;
};

export default Image;
