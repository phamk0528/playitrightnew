import React, { useEffect, useState } from "react";
import { Text, Box, SimpleGrid, Link, Tabs, HStack, TabList, Icon, Tab, TabPanel, TabPanels } from "@chakra-ui/react";
import { URL_BASE } from "../../../constants";
import Markdown from "markdown-to-jsx";
import Image from "../../Image";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsCreditCard } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiGift } from "react-icons/fi";
import { useRouter } from "next/router";
import useColorTheme from "../../../hooks/useColorTheme";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
type Props = {
    content: any
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
const ContentReward = ({ content }: Props) => {
    const urlImageMarkdown = (text: string) => {
        return text.split("/uploads/").join(`${URL_BASE}/uploads/`);
    };
    const router = useRouter();
    const [param, setParam] = useState("about")
    const [tabIndex, setTabIndex] = useState(0)
    useEffect(() => {
        if (router?.query && router?.query?.param) {

            router.query?.param === "faq" ? setTabIndex(1) : router.query?.param === "term" ? setTabIndex(2) : setTabIndex(0)
        }
    }, [router])

    const handleTabsChange = (index: any) => {
        setTabIndex(index)
    }
    return (
        <>
            <Box pl={{ base: "0px", lg: "60px" }} pr={{ base: "0px", lg: "60px" }}>
                {/*  <SimpleGrid columns={[1, null, 4]} spacing="5px" textAlign={{ base: "center", md: "left" }}>
                    <Box>

                        <Box flexDirection="row" justifyContent="center" display="flex" mt={{ base: "10px", lg: "50px" }}>
                            <Icon color={colors.primary} as={AiOutlineUserAdd} boxSize={{ base: "2.5rem", md: "4rem" }} />
                        </Box>


                        <HStack spacing="10px" flexDirection="row" justifyContent={{ base: "center", lg: "flex-start" }}>
                            <Text
                                transition="ease-in 0.15s"
                                fontSize="1xl"
                                fontWeight="bold"
                                bottom="30px"
                                textAlign="center"
                                color={colors.primary}
                                mt={{ base: "25px", lg: "35px" }}
                                mb={{ base: "10px", lg: "10px" }}
                            >
                                How to join
                            </Text>
                        </HStack>

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
                            {'Become a member by creating an account on our website or the i12 Katong App. Membership is free with no minimum spend'}
                        </Markdown>
                    </Box>

                    <Box
                        pl={{ base: "0px", lg: "60px" }}
                        pr={{ base: "0px", lg: "0px" }}
                        mt={{ base: "30px", lg: "0px" }}
                    >
                        <Box flexDirection="row" justifyContent="center" display="flex" mt={{ base: "10px", lg: "50px" }}>
                            <Icon color={colors.primary} as={BsCreditCard} boxSize={{ base: "2.5rem", md: "4rem" }} />
                        </Box>

                        <HStack spacing="10px" flexDirection="row" justifyContent={{ base: "center", lg: "flex-start" }}>
                            <Text
                                transition="ease-in 0.15s"
                                fontSize="1xl"
                                fontWeight="bold"
                                bottom="30px"
                                textAlign="center"
                                color={colors.primary}
                                mt={{ base: "25px", lg: "35px" }}
                                mb={{ base: "10px", lg: "10px" }}
                            >
                                Flash your card
                            </Text>
                        </HStack>

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
                            {'You will be issued a card. Show your card when making purchasese or whenever you attend classes or pop-up events to earn points'}
                        </Markdown>
                    </Box>
                    <Box
                        pl={{ base: "0px", lg: "60px" }}
                        pr={{ base: "0px", lg: "20px" }}
                        mt={{ base: "30px", lg: "0px" }}
                    >
                        <Box flexDirection="row" justifyContent="center" display="flex" mt={{ base: "10px", lg: "50px" }}>
                            <Icon color={colors.primary} as={HiOutlineShoppingBag} boxSize={{ base: "2.5rem", md: "4rem" }} />
                        </Box>

                        <HStack spacing="10px" flexDirection="row" justifyContent={{ base: "center", lg: "flex-start" }}>
                            <Text
                                transition="ease-in 0.15s"
                                fontSize="1xl"
                                fontWeight="bold"
                                bottom="30px"
                                textAlign="center"
                                color={colors.primary}
                                mt={{ base: "25px", lg: "35px" }}
                                mb={{ base: "10px", lg: "10px" }}
                            >
                                Collection points
                            </Text>
                        </HStack>

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
                            {'Points collected will be reflected in your online account. Keep up-to-date on the number of point earned and browse available rewards on our website or App '}
                        </Markdown>
                    </Box>

                    <Box
                        pl={{ base: "0px", lg: "60px" }}
                        pr={{ base: "0px", lg: "60px" }}
                        mt={{ base: "30px", lg: "0px" }}
                    >

                        <Box flexDirection="row" justifyContent="center" display="flex" mt={{ base: "10px", lg: "50px" }}>
                            <Icon color={colors.primary} as={FiGift} boxSize={{ base: "2.5rem", md: "4rem" }} />
                        </Box>

                        <HStack spacing="10px" flexDirection="row" justifyContent={{ base: "center", lg: "flex-start" }}>
                            <Text
                                transition="ease-in 0.15s"
                                fontSize="1xl"
                                fontWeight="bold"
                                bottom="30px"
                                textAlign="center"
                                color={colors.primary}
                                mt={{ base: "25px", lg: "35px" }}
                                mb={{ base: "10px", lg: "10px" }}
                            >
                                Redeem your rewards
                            </Text>
                        </HStack>

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
                            {'When shopping in-store, select the reward you would like to redeem and show it at the cashier'}
                        </Markdown>
                    </Box>
                </SimpleGrid> */}
                <Tabs mt={{ base: "30px", lg: "50px" }} index={tabIndex} onChange={handleTabsChange}>
                    <TabList color="#004C45" >
                        <Tab fontSize={{ base: "16px", lg: "20px" }} fontWeight="bold" _selected={{ color: "#004C45", borderBottomColor: "#004C45" }} _focus={{ borderColor: "white" }}>About Keppel Rewards</Tab>
                        <Tab fontSize={{ base: "16px", lg: "20px" }} fontWeight="bold" _selected={{ color: "#004C45", borderBottomColor: "#004C45" }} _focus={{ borderColor: "white" }}>FAQ</Tab>
                        <Tab fontSize={{ base: "16px", lg: "20px" }} fontWeight="bold" _selected={{ color: "#004C45", borderBottomColor: "#004C45" }} _focus={{ borderColor: "white" }}>Terms and conditions</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            {/* <Markdown
                                options={{
                                    overrides: {
                                        ...ChakraUIRenderer(),
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
                                {urlImageMarkdown(content?.about)}
                            </Markdown> */}
                            <div>{ReactHtmlParser(urlImageMarkdown(content?.about))}</div>
                        </TabPanel>
                        <TabPanel>
                            {/* <Markdown
                                options={{
                                    overrides: {
                                        ...ChakraUIRenderer(),
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
                                {urlImageMarkdown(content?.about)}
                            </Markdown> */}
                            <div>{ReactHtmlParser(urlImageMarkdown(content?.faq))}</div>
                        </TabPanel>
                        <TabPanel>
                            {/* <Markdown
                                options={{

                                    overrides: {
                                        ...ChakraUIRenderer(),
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
                                {urlImageMarkdown(content?.about)}
                            </Markdown> */}
                            <div>{ReactHtmlParser(urlImageMarkdown(content?.terms))}</div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>


        </>
    );
};

export default ContentReward;
