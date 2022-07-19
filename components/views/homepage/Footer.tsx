import { Box, Heading, SimpleGrid, Text, Icon } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from 'next/image'

type Props = {
    homeContent?: any;
};

const FooterHomePage = ({ homeContent }: Props) => {

    const banner = homeContent?.find((x: any) => x?.id === "Ptb/IreN")
    const footer = homeContent?.find((x: any) => x?.id === "1tC7w49W")

    const contentFooter = [{
        title: 'About Us',
        listChild: ['How We Play The Game', 'Playitright Cases', 'Quality Assurance']
    }, {
        title: 'Services',
        listChild: ['My Account', 'Trach Your Order', 'Contact Us']
    },
    {
        title: 'Services',
        listChild: ['Resources', 'Returns and Exchanges', 'Size Guides', 'Delivery Information', 'Delivery Information', 'Privacy Policy', 'FAQ']
    }]
    return (
        <>
            <Box pl={{ base: '0px', lg: '0px' }} pr={{ base: '0px', lg: '0px' }}>
                <Box
                    alignItems="center"
                    display="flex"
                    flexDirection={'column'}
                    justifyContent="center"
                    bgColor="rgb(236, 236, 236);"
                >


                    <Box width="100%" mt='15px' bgColor="rgb(236, 236, 236);" display={'flex'} flexDir={{ base: 'column', md: 'row' }} justifyContent={'center'} maxWidth='1340px'>
                        <Box height={{ base: "30vh", md: '200px' }} mt='15px' flex={1} marginTop="5px" position='relative' display={{ base: 'none', md: 'flex' }}>
                            <Image
                                width="100%"
                                height={"25vh"}
                                src={banner?.props?.values?.imageUrl?.urlMobile?.replace('https://playitright.s3-ap-southeast-1.amazonaws.com/', 'https://quocbcx-1c878.kxcdn.com/') + '?width=500&quality=100'}
                                alt={'Photo of ' + banner?.props?.values?.imageUrl?.urlMobile}
                                objectFit="contain"

                                layout='fill'
                            />
                        </Box>
                        <Box height={{ base: "30vh", md: '200px' }} mt='15px' marginTop="5px" position='relative' display={{ base: 'flex', md: 'none' }}>
                            <Image
                                width="100%"
                                height={"25vh"}
                                src={banner?.props?.values?.imageUrl?.urlMobile?.replace('https://playitright.s3-ap-southeast-1.amazonaws.com/', 'https://quocbcx-1c878.kxcdn.com/') + '?width=500&quality=100'}
                                alt={'Photo of ' + banner?.props?.values?.imageUrl?.urlMobile}
                                objectFit="contain"

                                layout='fill'
                            />
                        </Box>
                        <Box height={{ base: "30vh", md: '200px' }} mt='15px' marginTop="5px" flex={1} flexDir={{ base: 'column', md: 'row' }} display={'flex'}>
                            {
                                contentFooter?.map(item => <>
                                    <Box pt="20px" px="10px">
                                        <Text

                                            fontSize="15px"
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                            pt={1}
                                        >
                                            {item?.title}
                                        </Text>
                                        <SimpleGrid columns={[2, 1]}>
                                            {
                                                item?.listChild?.map(x => <Text
                                                    mt="10px"
                                                    fontSize="12px"

                                                    alignItems={'center'}
                                                >
                                                    {x}
                                                </Text>)
                                            }




                                        </SimpleGrid>
                                    </Box>
                                </>)
                            }
                        </Box>


                    </Box>
                    <Box width="100%" alignSelf={'center'} bgColor="black" textAlign={'center'} py="30px">


                        <Icon alignSelf={'center'} color={"white"} as={FaFacebookF} h="20px" w="25px" />
                        <Icon color={"white"} as={FaTwitter} h="20px" w="25px" />
                        <Icon color={"white"} as={FaInstagram} h="20px" w="25px" />


                        <div className="product-des" style={{ fontSize: '12px', textAlign: 'center', paddingTop: "1px", color: 'white', marginTop: "20px" }} dangerouslySetInnerHTML={{ __html: footer?.props?.values?.text }} />
                    </Box>



                </Box>

            </Box>
        </>
    );
};

export default FooterHomePage;