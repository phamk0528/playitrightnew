import React from "react";
import { Text, Box, Center, Link, Heading, HStack, Divider, Image } from "@chakra-ui/react";
import useColorTheme from "../../../hooks/useColorTheme";
import Banner from "../../banner/Banner";

const ComingSoon = () => {

    const colors = useColorTheme();
    return (
        <>
            {/* <Box pl={{ base: "0px", lg: "60px" }} pr={{ base: "0px", lg: "60px" }}> */}
            <Banner banner={{ url: "/i12homepage.png" }} mt={{ base: '20px', lg: '50px' }} pl={{ base: '0px', lg: "60px" }} pr={{ base: '0px', lg: "60px" }} />
            {/* </Box> */}
            <Box pl={{ base: "0px", lg: "60px" }} pr={{ base: "0px", lg: "60px" }}>
                <Center flexDirection="column" backgroundColor="#f5e1a4">

                    <Image
                        width="40%"
                        height="auto"
                        alignItems="center"
                        src={"/logoComingSoon.png"}

                    // objectFit="cover"
                    />
                    <Text
                        transition="ease-in 0.15s"
                        fontSize={{ base: "25px", lg: "36px" }}

                        textAlign="center"
                        color={colors.primary}
                        mt={{ base: "10px", lg: "10px" }}
                        fontWeight="bold"
                        fontFamily="Arial;">
                        Opening Soon    </Text>

                    <Text
                        transition="ease-in 0.15s"
                        fontSize={{ base: "20px", lg: "30px" }}
                        fontWeight="bold"
                        textAlign="center"
                        color={colors.primary}
                        mt={{ base: "10px", lg: "10px" }}

                    >
                        We look forward to welcome you back   </Text>

                    <Text
                        transition="ease-in 0.15s"
                        fontSize={{ base: "15px", lg: "25px" }}
                        fontWeight="light"
                        textAlign="center"
                        color={colors.primary}
                        mt={{ base: "10px", lg: "50px" }}

                        fontFamily="Arial;">
                        Follow us on Facebook and Instagram: @i12katong  </Text>

                </Center>
            </Box>
        </>
    );
};

export default ComingSoon;
