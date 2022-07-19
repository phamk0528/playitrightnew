import { Box, Heading, Icon } from '@chakra-ui/react';
import React from 'react';

import Slider from 'react-slick';
import useWindowSize from '../../../hooks/useWindowSize';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import ProductCard from '../../cards/ProductCard';
type Props = {
    products: any;
    margin?: number;
    containerHeight?: number;
    title: string
};

const ListProducts = ({ products, title }: Props) => {

    const screenSize = useWindowSize();

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
        screenSize.width >= 500
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
                    fontSize={{ base: '15px', md: '20px' }}
                    bottom="30px"
                    textAlign="left"

                    fontFamily="Arial"
                    fontWeight={700}
                >
                    {title}
                </Heading>


                <Box>
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



            </Box>
        </>
    );
};

export default ListProducts;
