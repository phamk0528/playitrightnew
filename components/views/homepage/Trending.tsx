import React from 'react';
import { Box, Heading, Icon } from '@chakra-ui/react';
import PostCard from '../../cards/PostCard';
import useColorTheme from '../../../hooks/useColorTheme';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Slider from 'react-slick';


type Props = {
  margin?: number;
  containerHeight?: number;
  carousels?: any;
  homepageContentData?: any
};
const TrendingCard = ({ homepageContentData }: Props) => {



  const announ = homepageContentData?.find((x: any) => x?.type === "TextGroupView")
  const carousel = homepageContentData?.find((x: any) => x?.type === "CarouselAnimationView")?.props?.values?.list?.map((x: any) => {
    return {

      idArticle: x?.id,
      hero_desktop: { url: x?.url_bg },
      hero_mobile: { url: x?.url_bg_mobile },

    }
  })



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
  {
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

  return (
    <>
      <Box bg='red.500' alignItems={'center'} display='flex' py="7px" mb="20px" >
        <Heading
          transition="ease-in 0.15s"
          fontSize={{ base: '15px', md: '18px' }}
          width="100%"
          textAlign="center"
          color='white'
          fontFamily="Arial"
          fontWeight={'normal'}
          lineHeight='20px'
          py={{ base: '2px', md: '8px' }}

        >
          {announ?.props?.values?.valueText[0]?.title}
        </Heading>
      </Box>



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

        </Box>
      </Box>


    </>
  );
};

export default TrendingCard;
