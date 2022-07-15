import { Box, Heading, Icon, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Slider from 'react-slick';
import useColorTheme from '../../../hooks/useColorTheme';
import Image from 'next/image'




import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
// import Image  from '../../Image';

import useWindowSize from '../../../hooks/useWindowSize';
import PostCard from '../../cards/PostCard';
type Props = {
    margin?: number;
    containerHeight?: number;
    carousels?: any;
    homepageContentData?: any
    banner?: any
    flashSaleHighlight?: any
};
const HightLight = ({ carousels, homepageContentData, banner, flashSaleHighlight }: Props) => {

    const slides = carousels;

    const screenSize = useWindowSize();

    const announ = homepageContentData?.find((x: any) => x?.type === "TextGroupView")
    const carousel = homepageContentData?.find((x: any) => x?.id === "Jb5xc3vR")?.props?.values?.valueText?.map((x: any) => {
        return {


            hero_desktop: { url: x?.imageUrl?.url },
            hero_mobile: { url: x?.imageUrl?.urlMobile },

        }
    })


    console.log("homepageContentData", carousel)
    function SampleNextArrow(props: any) {
        const { onClick } = props;
        return (
            <Icon
                position="absolute"
                cursor="pointer"
                _hover={{
                    opacity: 0.8,
                    color: colors.primary,
                }}
                top={'38%'}
                right={-15}
                color="white"
                zIndex={99}
                as={MdKeyboardArrowRight}
                onClick={onClick}
                boxSize="3rem"
                mt={1}
            />
        );
    }

    function SamplePrevArrow(props: any) {
        const { onClick } = props;
        return (
            <Icon
                position="absolute"
                cursor="pointer"
                _hover={{
                    opacity: 0.8,
                    color: colors.primary,
                }}
                top={'38%'}
                left={-15}
                color="white"
                zIndex={99}
                as={MdKeyboardArrowLeft}
                onClick={onClick}
                boxSize="3rem"
                mt={1}
            />
        );
    }
    const colors = useColorTheme();
    const settings =
        screenSize.width >= 750
            ? {
                dots: true,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                arrows: true,
                speed: 500,
                autoplaySpeed: 5000,
                cssEase: 'linear',
                nextArrow: <SampleNextArrow />,
                prevArrow: <SamplePrevArrow />,
            }
            : {
                dots: true,
                infinite: true,
                slidesToShow: 1,
                swipeToSlide: true,
                autoplay: true,
                speed: 500,
                arrows: true,
                autoplaySpeed: 3000,
                cssEase: 'linear',
                nextArrow: <SampleNextArrow />,
                prevArrow: <SamplePrevArrow />,
            };
    return (
        <>
            <Box pl={{ base: '0px', lg: '60px' }} pr={{ base: '0px', lg: '60px' }}>
                <Box

                    width="100%"
                    mt={{ base: '20px', lg: '70px' }}
                    // bgColor="#004C45"
                    alignItems="center"

                    justifyContent="center"
                >
                    <Heading
                        transition="ease-in 0.15s"
                        fontSize={{ base: '15px', md: '36px' }}
                        bottom="30px"
                        textAlign="left"

                        fontFamily="Arial"
                        fontWeight={700}
                    >
                        Highlights
                    </Heading>

                    <SimpleGrid columns={2} spacing={'10px'} width="100%">
                        <Box width="100%" h={"20vh"} >
                            <Slider {...settings}>
                                {carousel?.map((slide: any) => (
                                    <Box width="100%" h={"20vh"} position='relative'>
                                        <Image
                                            width="100%"
                                            height="20vh"
                                            src={slide.hero_mobile.url.replace('https://playitright.s3-ap-southeast-1.amazonaws.com/', 'https://quocbcx-1c878.kxcdn.com/') + '?width=200&quality=90'}
                                            alt={'Photo of ' + slide.hero_mobile.url}

                                            objectFit='cover'
                                            layout='fill'
                                        />
                                    </Box>
                                ))}
                            </Slider>
                        </Box>
                        <Box width="100%" h={"20vh"} position='relative'>
                            <Image
                                width="100%"
                                height="20vh"
                                src={flashSaleHighlight.replace('https://playitright.s3-ap-southeast-1.amazonaws.com/', 'https://quocbcx-1c878.kxcdn.com/') + '?width=200&quality=90'}
                                alt={'Photo of ' + flashSaleHighlight}

                                objectFit='cover'
                                layout='fill'
                            />
                        </Box>
                    </SimpleGrid>
                    <Box width="100%" h={"25vh"} position='relative'>
                        <Image

                            width="100%"
                            height="25vh"
                            src={banner.replace('https://playitright.s3-ap-southeast-1.amazonaws.com/', 'https://quocbcx-1c878.kxcdn.com/') + '?width=380&quality=100'}
                            alt={'Photo of ' + banner}
                            objectFit='cover'
                            layout='fill'
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default HightLight;