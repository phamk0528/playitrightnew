import React, { useState } from 'react';
import { Box, Flex, Text, HStack, Spacer, Center, Heading, Icon } from '@chakra-ui/react';
import PostCard from '../../cards/PostCard';
import useColorTheme from '../../../hooks/useColorTheme';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Slider from 'react-slick';
import useWindowSize from '../../../hooks/useWindowSize';

type Props = {
  margin?: number;
  containerHeight?: number;
  carousels?: any;
  homepageContentData?: any
};
const TrendingCard = ({ carousels, homepageContentData }: Props) => {
  const slides = carousels;

  const screenSize = useWindowSize();

  const announ = homepageContentData?.find((x: any) => x?.type === "TextGroupView")
  const carousel = homepageContentData?.find((x: any) => x?.type === "CarouselAnimationView")?.props?.values?.list?.map((x: any) => {
    return {

      idArticle: x?.id,
      hero_desktop: { url: x?.url_bg },
      hero_mobile: { url: x?.url_bg_mobile },

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
        top={'45%'}
        right={-15}
        color="white"
        zIndex={99}
        as={MdKeyboardArrowRight}
        onClick={onClick}
        boxSize="4rem"
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
        top={'45%'}
        left={-15}
        color="white"
        zIndex={99}
        as={MdKeyboardArrowLeft}
        onClick={onClick}
        boxSize="4rem"
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
        autoplay: false,
        speed: 500,
        arrows: true,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
      };
  return (
    <>
      <Box bg='red.500' alignItems={'center'} display='flex' py="7px" mb="20px" >
        <Heading
          transition="ease-in 0.15s"
          fontSize="12px"
          width="100%"
          textAlign="center"
          color='white'
          fontFamily="Arial"
          fontWeight={'normal'}
          lineHeight='20px'

        >
          {announ?.props?.values?.valueText[0]?.title}
        </Heading>
      </Box>

      {/* <Flex w="full" p={0} alignItems="center" justifyContent="center"> */}

      <Box w="full" pos="relative" overflow="hidden">
        <Box w="full">
          <Slider {...settings}>
            {carousel?.map((slide: any) => (
              <Box
                key={slide.id}
                h="55vh"
                w="full"
                cursor="pointer"
                boxSize="full"
                shadow="md"
                flex="none"
              >
                <PostCard
                  article={slide}
                  idArticle={slide?.url}
                  alt={`Picture of ${slide.id}`}
                />
              </Box>
            ))}
          </Slider>
          {/* <ParkingCar /> */}
        </Box>
      </Box>

      {/* <Flex w="full" pos="relative" overflow="hidden">

          <Flex w="full" {...carouselStyle}>

            {slides.map((slide: any) => (
              <Box
                key={slide.id + slide.title}
                h="100%"
                w="full"
                cursor="pointer"
                boxSize="full"
                shadow="md"
                flex="none"
              >
                <PostCard
                  article={slide}
                  idArticle={slide?.url}
                  alt={`Picture of ${slide.title}`}
                />
              </Box>
            ))}
          </Flex>

          <ParkingCar />

          <Text
            cursor="pointer"
            pos="absolute"
            top="50%"
            w="auto"
            mt="-22px"
            p="16px"
            // color={colors.primary}
            color="white"
            fontWeight="bold"
            fontSize="25px"
            transition="0.6s ease"
            borderRadius="0 3px 3px 0"
            userSelect="none"
            _hover={{
              opacity: 0.8,
              color: colors.primary,
            }}
            left="0"
            onClick={prevSlide}
          >
            &#10094;
          </Text>
          <Text
            cursor="pointer"
            pos="absolute"
            top="50%"
            w="auto"
            mt="-22px"
            p="16px"
            color="white"
            fontWeight="bold"
            fontSize="25px"
            transition="0.6s ease"
            borderRadius="0 3px 3px 0"
            userSelect="none"
            bg="transparent"
            _hover={{
              opacity: 0.8,
              color: colors.primary,
            }}
            right="0"
            onClick={nextSlide}
          >
            &#10095;
          </Text>

          <HStack justify="center" pos="absolute" bottom="10%" w="full">
            <Spacer />
            <Center w="35%">
              {Array.from({ length: slidesCount }).map((_, slide) => (
                <Box
                  key={`dots-${slide}`}
                  cursor="pointer"
                  boxSize={["5px", "10px"]}
                  m="0 2px"
                  bg={
                    currentSlide === slide ? colors.primary : "blackAlpha.400"
                  }
                  rounded="50%"
                  display="inline-block"
                  transition="background-color 0.6s ease"
                  _hover={{ bg: "blackAlpha.800" }}
                  onClick={() => setSlide(slide)}
                ></Box>
              ))}
            </Center>
          </HStack>
        </Flex> */}
      {/* </Flex> */}
    </>
  );
};

export default TrendingCard;
