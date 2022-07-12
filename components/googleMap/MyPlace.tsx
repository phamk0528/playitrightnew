import React from "react";
import { Text, Icon, Box } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
type Props = {
  text?: any;
  tooltip?: string;
  lng?: any;
  lat?: any;
};

const MyMarker = ({ text }: Props) => {
  return (
    <>
      <Box w="100px">
        {" "}
        <Text color="red" fontSize="md">
          {text}
        </Text>
      </Box>
      <Icon color="red" as={FaMapMarkerAlt} boxSize="3rem" />
    </>
  );
};

export default MyMarker;
