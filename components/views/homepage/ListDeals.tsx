import { Box, Heading, Button, Center, Icon, Divider, SimpleGrid } from '@chakra-ui/react';
import React, { useRef } from 'react';
import useColorTheme from '../../../hooks/useColorTheme';
import DealCard from '../../cards/DealCard';
import Slider from 'react-slick';
import useWindowSize from '../../../hooks/useWindowSize';
import { useRouter } from 'next/router';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useHover } from '../../../hooks/useHover';
type Props = {
    deals: any;
    margin?: number;
    containerHeight?: number;
};

const ListEvents = ({ deals }: Props) => {
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
                  slidesToShow: deals?.length >= 4 ? 4 : deals?.length,
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
                  slidesToShow: 2.5,
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
                  slidesToShow: 1.5,
                  swipeToSlide: true,
                  autoplay: false,
                  speed: 500,
                  arrows: false,
                  autoplaySpeed: 5000,
                  cssEase: 'linear',
                  nextArrow: <SampleNextArrow />,
                  prevArrow: <SamplePrevArrow />,
              };

    let height = deals?.map((item: any) => {
        return item.title.length;
    });
    var largest = Math.max.apply(Math, height);
    return (
        <>
            <Box as="section" pt="4%" pl={{ base: '0px', lg: '60px' }} pr={{ base: '0px', lg: '60px' }}>
                <Heading
                    transition="ease-in 0.15s"
                    fontSize={{ base: '16px', md: '36px' }}
                    bottom="30px"
                    textAlign="center"
                    color={{ base: '#004C45', md: colors.primary }}
                    fontFamily="Arial"
                    fontWeight={700}
                >
                    DEALS
                </Heading>
                <Divider colorScheme="blackAlpha" display={{ base: 'flex', md: 'none' }} />
                {deals?.length < 4 ? (
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
                        {deals?.map((deal: any) => (
                            <Box pt={{ base: '5%', lg: '10px' }} key={'listEvent' + deal.id}>
                                <DealCard
                                    column
                                    deal={deal}
                                    idDeal={deal.id}
                                    titleFontSize={'1em'}
                                    heightTitle={largest + 10 + 'px'}
                                />
                            </Box>
                        ))}
                    </SimpleGrid>
                ) : (
                    <Box {...hoverProps}>
                        <Slider {...settings}>
                            {deals?.map((deal: any) => (
                                <Box pt={{ base: '5%', lg: '10%' }} key={'listEvent' + deal.id}>
                                    <DealCard
                                        column
                                        deal={deal}
                                        idDeal={deal.id}
                                        titleFontSize={'1em'}
                                        heightTitle={largest + 10 + 'px'}
                                    />
                                </Box>
                            ))}
                        </Slider>
                    </Box>
                )}

                <Center mt={{ base: 5, md: 10 }}>
                    <Button
                        bgColor="white"
                        height={{ base: '30px', md: '40px' }}
                        fontSize={{ base: '16px', md: '20px' }}
                        onClick={() => getAllDeals()}
                        borderRadius={30}
                        border="1px"
                        borderColor={colors.primary}
                        fontWeight={400}
                        _hover={{ backgroundColor: colors.primary, color: 'white' }}
                    >
                        View All Deals
                    </Button>
                </Center>
            </Box>
        </>
    );
};

export default ListEvents;
