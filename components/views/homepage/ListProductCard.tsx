import { Box, Heading, Button, Center, Icon, Divider, SimpleGrid } from '@chakra-ui/react';
import React, { useRef } from 'react';
import useColorTheme from '../../../hooks/useColorTheme';
import DealCard from '../../cards/DealCard';
import Slider from 'react-slick';
import useWindowSize from '../../../hooks/useWindowSize';
import { useRouter } from 'next/router';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useHover } from '../../../hooks/useHover';
import ProductCard from '../../cards/ProductCard';
type Props = {
    products: any;
    margin?: number;
    containerHeight?: number;
};

const ListProducts = ({ products }: Props) => {
    const colors = useColorTheme();
    const screenSize = useWindowSize();
    const { hoverProps, isHovered } = useHover({});
    const router = useRouter();
    const getAllDeals = () => {
        router.push(`/whatsOn`);
        window.scrollTo(0, 0);
    };
    function SampleNextArrow(props: any) {
        const { onClick } = props;
        return (
            <Icon
                position="absolute"
                cursor="pointer"
                top={'50%'}
                right={-35}
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
                top={'50%'}
                left={-35}
                zIndex={99}
                as={MdKeyboardArrowLeft}
                onClick={onClick}
                boxSize="3rem"
                mt={1}
            />
        );
    }
    const settings =
        screenSize.width >= 1100
            ? {
                dots: true,
                infinite: true,
                slidesToShow: products?.length >= 4 ? 4 : products?.length,
                slidesToScroll: 4,
                autoplay: true,
                speed: 500,
                autoplaySpeed: 5000,
                cssEase: 'linear',
                nextArrow: <SampleNextArrow />,
                prevArrow: <SamplePrevArrow />,
            }
            : screenSize.width >= 750
                ? {
                    dots: true,
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    speed: 500,
                    autoplaySpeed: 5000,
                    cssEase: 'linear',
                    nextArrow: <SampleNextArrow />,
                    prevArrow: <SamplePrevArrow />,
                }
                : screenSize.width >= 600
                    ? {
                        dots: false,
                        infinite: false,
                        slidesToShow: 2,
                        swipeToSlide: true,
                        autoplay: false,
                        arrows: false,
                        speed: 500,
                        autoplaySpeed: 5000,
                        cssEase: 'linear',
                        nextArrow: <SampleNextArrow />,
                        prevArrow: <SamplePrevArrow />,
                    }
                    : {
                        dots: false,
                        infinite: false,
                        slidesToShow: 2,
                        swipeToSlide: true,
                        autoplay: false,
                        speed: 500,
                        arrows: false,
                        autoplaySpeed: 5000,
                        cssEase: 'linear',
                        nextArrow: <SampleNextArrow />,
                        prevArrow: <SamplePrevArrow />,
                    };

    let height = products?.map((item: any) => {
        return item.name.length;
    });
    console.log("height", height)
    var largest = Math.max.apply(Math, height);
    return (
        <>
            <Box as="section" pt="4%" pl={{ base: '0px', lg: '60px' }} pr={{ base: '0px', lg: '60px' }}>
                <Heading
                    transition="ease-in 0.15s"
                    fontSize={{ base: '15px', md: '36px' }}
                    bottom="30px"
                    textAlign="left"

                    fontFamily="Arial"
                    fontWeight={700}
                >
                    Best Seller
                </Heading>

                {products?.length < 4 ? (
                    <SimpleGrid
                        pt={3}
                        columns={
                            screenSize.width >= 950
                                ? 4
                                : screenSize.width <= 950 && screenSize.width >= 750
                                    ? 3
                                    : screenSize.width < 750 && screenSize.width >= 500
                                        ? 2
                                        : 2
                        }
                        spacing="5px"
                    >
                        {products?.map((product: any) => (
                            <Box pt={{ base: '5%', lg: '10px' }} key={'listEvent' + product.id}>
                                <ProductCard
                                    product={product}
                                    heightTitle={largest + 10 + 'px'}
                                />
                            </Box>
                        ))}
                    </SimpleGrid>
                ) : (
                    <Box {...hoverProps}>
                        <Slider {...settings}>
                            {products?.map((product: any) => (
                                <Box pt={{ base: '5%', lg: '10%' }} px="3px" key={'listEvent' + product.id}>
                                    <ProductCard
                                        product={product}
                                        heightTitle={largest + 35 + 'px'}
                                    />
                                </Box>
                            ))}
                        </Slider>
                    </Box>
                )}


            </Box>
        </>
    );
};

export default ListProducts;
