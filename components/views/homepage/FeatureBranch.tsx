import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Image from '../../Image';

type Props = {
    homeContent?: any;
};

const FeaturedBranch = ({ homeContent }: Props) => {
    const carousel = homeContent?.filter((x: any) => x?.parent?.id === "xnni6pa9" || x?.parent?.id === "hqAQWOU0" || x?.parent?.id === "Ut+/m8d6")
    const banner = homeContent?.filter((x: any) => x?.id === "23zWpyP3" || x?.id === "TxlyjU6G" || x?.id === "b9FQ6ZGF")
    const textSumary = homeContent?.filter((x: any) => x?.id === "Gx1qr9kF" || x?.id === "Av7mFchf" || x?.id === "YZQxZbze")
    const textDescription = homeContent?.filter((x: any) => x?.id === "gVyXapsF" || x?.id === "EMKBRfmD" || x?.id === "rqen/8s+")
    console.log("carousel", banner)
    return (
        <>
            <Box pl={{ base: '0px', lg: '60px' }} pr={{ base: '0px', lg: '60px' }}>
                <Heading
                    transition="ease-in 0.15s"
                    fontSize={{ base: '15px', md: '36px' }}
                    bottom="30px"
                    textAlign="left"
                    mt={{ base: '20px', lg: '70px' }}
                    fontFamily="Arial"
                    fontWeight={700}
                >
                    Featured Branch
                </Heading>

                <Box
                    pt="4%"



                    alignItems="center"
                    display="flex"
                    flexDirection={'column'}
                    justifyContent="center"
                >

                    {carousel?.map((x: any) => (
                        <Box width="70%" alignSelf={'center'} mt='15px'>
                            <Image
                                marginTop="5px"
                                width="100%"

                                src={x?.props?.values?.imageUrl?.urlMobile?.replace('https://playitright.s3-ap-southeast-1.amazonaws.com/', 'https://quocbcx-1c878.kxcdn.com/') + '?width=380&quality=100'}
                                alt={'Photo of ' + x?.props?.values?.imageUrl?.urlMobile}
                                objectFit="cover"
                            />
                        </Box>
                    ))
                    }


                </Box>
                <Box
                    pt="4%"



                    alignItems="center"
                    display="flex"
                    flexDirection={'column'}
                    justifyContent="center"
                >
                    {banner?.map((x: any, index: number) => (
                        <Box width="100%" alignSelf={'center'} mt='15px' alignItems={'center'} display='flex' justifyContent={'center'} flexDirection='column'>
                            <Image
                                marginTop="5px"
                                width="75px"
                                height={"75px"}
                                src={x?.props?.values?.imageUrl?.urlMobile?.replace('https://playitright.s3-ap-southeast-1.amazonaws.com/', 'https://quocbcx-1c878.kxcdn.com/') + '?width=380&quality=100'}
                                alt={'Photo of ' + x?.props?.values?.imageUrl?.urlMobile}
                                objectFit="contain"
                            />

                            <div className="product-des" style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', paddingTop: "1px" }} dangerouslySetInnerHTML={{ __html: textSumary[index]?.props?.values?.text }} />
                            <div className="product-des" style={{ fontSize: '12px', textAlign: 'center', paddingTop: "1px" }} dangerouslySetInnerHTML={{ __html: textDescription[index]?.props?.values?.text }} />

                        </Box>
                    ))
                    }
                </Box>
            </Box>
        </>
    );
};

export default FeaturedBranch;
