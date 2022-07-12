import { Center, Box, Heading, Button, Icon, Divider, SimpleGrid } from '@chakra-ui/react';
import React, { useRef } from 'react';
import useColorTheme from '../../../hooks/useColorTheme';
import EventCard from '../../cards/EventCard';
import Slider from 'react-slick';
import useWindowSize from '../../../hooks/useWindowSize';
import { useRouter } from 'next/router';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useHover } from '../../../hooks/useHover';

type Props = {
    events: any;
    margin?: number;
    containerHeight?: number;
};

const ListEvents = ({ events }: Props) => {
    const colors = useColorTheme();
    const screenSize = useWindowSize();
    const { hoverProps, isHovered } = useHover({});
    const listNewArraival = events?.map((x: any) => {
        return {
            title: x?.id,
            idArticle: x?.id,
            photos: [{ url: x?.props?.values?.imageUrl?.url }, { url: x?.props?.values?.imageUrl?.urlMobile }],

            textContent: x?.textContent
        }
    })
    console.log("listNewArraival", listNewArraival)
    const router = useRouter();
    const getAllEvents = () => {
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
                slidesToShow: events?.length >= 4 ? 4 : events?.length,
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
                        speed: 500,
                        autoplaySpeed: 5000,
                        arrows: false,
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
                        arrows: false,
                        speed: 500,
                        autoplaySpeed: 5000,
                        cssEase: 'linear',
                        nextArrow: <SampleNextArrow />,
                        prevArrow: <SamplePrevArrow />,
                    };

    let height = listNewArraival?.map((item: any) => {
        return item.title.length;
    });
    var largest = Math.max.apply(Math, height);
    return (
        <>
            <Box
                as="section"
                pt="4%"
                pl={{ base: '0px', lg: '60px' }}
                pr={{ base: '0px', lg: '60px' }}
                mt={{ base: '20px', lg: 'none' }}
            >
                <Heading
                    transition="ease-in 0.15s"
                    fontSize={{ base: '20px', md: '36px' }}
                    bottom="30px"
                    textAlign="left"

                    fontFamily="Arial"
                    fontWeight={700}
                >
                    New Arraivals
                </Heading>
                <Divider colorScheme="blackAlpha" display={{ base: 'flex', md: 'none' }} />
                {listNewArraival.length < 4 ? (
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
                        height="max-content"
                    >
                        {listNewArraival?.map((event: any) => (
                            <Box pt={{ base: '5%', lg: '5%' }} key={'listEvent' + event.id}>
                                <EventCard
                                    column
                                    event={event}
                                    idEvent={event.id}
                                    titleFontSize={'1em'}
                                    heightTitle={largest + 10 + 'px'}
                                />
                            </Box>
                        ))}
                    </SimpleGrid>
                ) : (
                    <Box {...hoverProps} height="100%">
                        <Slider {...settings}>
                            {listNewArraival?.map((event: any) => (
                                <Box pt={{ base: '5%', lg: '10%' }} height="100%" key={'listEvent' + event.id}>
                                    <EventCard
                                        column
                                        event={event}
                                        idEvent={event.id}
                                        titleFontSize={'1em'}
                                        heightTitle={largest + 10 + 'px'}
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

export default ListEvents;
