import React from 'react';
import { Text, Box, SimpleGrid, Link, Heading, HStack, Divider } from '@chakra-ui/react';
import { URL_BASE } from '../../../constants';
import Markdown from 'markdown-to-jsx';
import Image from '../../Image';
import useColorTheme from '../../../hooks/useColorTheme';
type Props = {
    wifi: string;
    nursing_room: string;
    charging_point: string;
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
const GettingHere = ({ wifi, nursing_room, charging_point }: Props) => {
    const urlImageMarkdown = (text: string) => {
        return text.split('/uploads/').join(`${URL_BASE}/uploads/`);
    };
    const colors = useColorTheme();
    return (
        <>
            <Box pl={{ base: '0px', lg: '60px' }} pr={{ base: '0px', lg: '60px' }}>
                <Heading
                    transition="ease-in 0.15s"
                    fontSize={{ base: '16px', md: '20px' }}
                    bottom="30px"
                    textAlign="center"
                    color="#004C45"
                    fontFamily="Arial"
                    mt="50px"
                    fontWeight={700}
                >
                    Amenities
                </Heading>
                <Divider colorScheme="gray" mb="30px" mt="20px" />
                <SimpleGrid columns={[1, null, 3]} spacing="5px" textAlign={{ base: 'center', md: 'left' }}>
                    <Box>
                        <HStack
                            spacing="10px"
                            flexDirection="row"
                            justifyContent={{ base: 'center', lg: 'flex-start' }}
                        >
                            <Text
                                transition="ease-in 0.15s"
                                fontSize="1xl"
                                fontWeight="bold"
                                bottom="30px"
                                textAlign="center"
                                color={colors.primary}
                                mt={{ base: '25px', lg: '35px' }}
                                mb={{ base: '25px', lg: '35px' }}
                            >
                                Mall Wi-Fi
                            </Text>
                        </HStack>

                        <Markdown
                            options={{
                                overrides: {
                                    a: {
                                        component: MyParagraph,
                                        props: {
                                            color: 'blue',
                                        },
                                    },
                                    img: {
                                        component: MyIMG,
                                    },
                                },
                            }}
                        >
                            {urlImageMarkdown(wifi)}
                        </Markdown>
                    </Box>

                    <Box
                        pl={{ base: '0px', lg: '60px' }}
                        pr={{ base: '0px', lg: '60px' }}
                        mt={{ base: '30px', lg: '0px' }}
                    >
                        <HStack
                            spacing="10px"
                            flexDirection="row"
                            justifyContent={{ base: 'center', lg: 'flex-start' }}
                        >
                            <Text
                                transition="ease-in 0.15s"
                                fontSize="1xl"
                                fontWeight="bold"
                                bottom="30px"
                                textAlign="center"
                                color={colors.primary}
                                mt={{ base: '25px', lg: '35px' }}
                                mb={{ base: '25px', lg: '35px' }}
                            >
                                Nursing Room
                            </Text>
                        </HStack>

                        <Markdown
                            options={{
                                overrides: {
                                    a: {
                                        component: MyParagraph,
                                        props: {
                                            color: 'blue',
                                        },
                                    },
                                    img: {
                                        component: MyIMG,
                                    },
                                },
                            }}
                        >
                            {urlImageMarkdown(nursing_room)}
                        </Markdown>
                    </Box>
                    <Box
                        pl={{ base: '0px', lg: '60px' }}
                        pr={{ base: '0px', lg: '60px' }}
                        mt={{ base: '30px', lg: '0px' }}
                    >
                        <HStack
                            spacing="10px"
                            flexDirection="row"
                            justifyContent={{ base: 'center', lg: 'flex-start' }}
                        >
                            <Text
                                transition="ease-in 0.15s"
                                fontSize="1xl"
                                fontWeight="bold"
                                bottom="30px"
                                textAlign="center"
                                color={colors.primary}
                                mt={{ base: '25px', lg: '35px' }}
                                mb={{ base: '25px', lg: '35px' }}
                            >
                                Charging Point
                            </Text>
                        </HStack>

                        <Markdown
                            options={{
                                overrides: {
                                    a: {
                                        component: MyParagraph,
                                        props: {
                                            color: 'blue',
                                        },
                                    },
                                    img: {
                                        component: MyIMG,
                                    },
                                },
                            }}
                        >
                            {urlImageMarkdown(charging_point)}
                        </Markdown>
                    </Box>
                </SimpleGrid>
            </Box>
        </>
    );
};

export default GettingHere;
