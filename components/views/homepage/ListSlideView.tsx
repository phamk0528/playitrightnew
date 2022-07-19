import { Box, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import Slider from 'react-slick';
import useColorTheme from '../../../hooks/useColorTheme';



import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Image from 'next/image'


import useWindowSize from '../../../hooks/useWindowSize';


type Props = {
    margin?: number;
    containerHeight?: number;
    carousels?: any;
    homepageContentData?: any

};
const ListSlideView = ({ homepageContentData, }: Props) => {



    const screenSize = useWindowSize();

    const carousel = homepageContentData?.find((x: any) => x?.id === "thwRCz3N")?.props?.values?.valueText?.map((x: any) => {
        return {

            title: x?.title,
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
                slidesToShow: 6,
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
                slidesToShow: 3,
                swipeToSlide: true,
                autoplay: true,
                speed: 500,
                arrows: false,
                autoplaySpeed: 3000,
                cssEase: 'linear',
                nextArrow: <SampleNextArrow />,
                prevArrow: <SamplePrevArrow />,
            };

    return (
        <>
            <Box pl={{ base: '0px', lg: '60px' }} pr={{ base: '0px', lg: '60px' }} mt="15px">


                <Slider {...settings}>
                    {carousel?.map((slide: any) => (
                        <Box pt={{ base: '10%', lg: '10%' }} px="3px" alignItems={'center'} key={'listEvent' + slide.hero_mobile.url}>
                            <Box width="100px" display={{ base: 'flex', lg: 'none' }} height={"100px"} alignSelf={'center'} mt='15px' marginTop="5px" position='relative'>
                                <Image
                                    // width="100%"
                                    // height="20vh"
                                    src={slide.hero_mobile.url.replace('https://playitright.s3-ap-southeast-1.amazonaws.com/', 'https://quocbcx-1c878.kxcdn.com/') + '?width=200&quality=90'}
                                    alt={'Photo of ' + slide.hero_mobile.url}
                                    objectFit="cover"

                                    layout='fill'

                                />
                            </Box>
                            <Box width="150px" display={{ base: 'none', lg: 'flex' }} height={"150px"} alignSelf={'center'} mt='15px' marginTop="5px" position='relative'>
                                <Image
                                    // width="100%"
                                    // height="20vh"
                                    src={slide.hero_mobile.url.replace('https://playitright.s3-ap-southeast-1.amazonaws.com/', 'https://quocbcx-1c878.kxcdn.com/') + '?width=300&quality=90'}
                                    alt={'Photo of ' + slide.hero_mobile.url}
                                    objectFit="cover"

                                    layout='fill'

                                /></Box>
                            <Text align={'center'} fontSize="12px" mt="5px"
                                fontWeight="bold"
                                textTransform="uppercase"
                                pt={1}>{slide?.title}</Text>
                        </Box>

                    ))}
                </Slider>

            </Box>
        </>
    );
};

export default ListSlideView;
