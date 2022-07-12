import { Box, Heading, Icon } from "@chakra-ui/react";
import React from "react";
import useColorTheme from "../../../hooks/useColorTheme";
import StoreCard from "../../cards/StoreCard";
import Slider from "react-slick";
import useWindowSize from "../../../hooks/useWindowSize";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useHover } from "../../../hooks/useHover";
type Props = {
  stores: any;
  margin?: number;
  containerHeight?: number;
};

const OrtherStores = ({ stores }: Props) => {
  const colors = useColorTheme();
  const screenSize = useWindowSize();
  const { hoverProps, isHovered } = useHover({});
  function SampleNextArrow(props: any) {
    const { onClick } = props;
    return (
      <Icon
        position="absolute"
        cursor="pointer"
        display={isHovered ? "flex" : "none"}
        top={"50%"}
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
        display={isHovered ? "flex" : "none"}
        top={"50%"}
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
    screenSize.width >= 1100 ? {
      dots: true,
      infinite: true,
      slidesToShow: stores.length >= 4 ? 4 : stores.length,
      slidesToScroll: 4,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 5000,
      cssEase: "linear",
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    }
      : screenSize.width >= 750
        ? {
          dots: true,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 4,
          autoplay: true,

          speed: 500,
          autoplaySpeed: 5000,
          cssEase: "linear",
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
            cssEase: "linear",
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
          }
          : {
            dots: false,
            infinite: false,
            slidesToShow: 1.5,
            swipeToSlide: true,
            autoplay: false,
            arrows: false,
            speed: 500,
            autoplaySpeed: 5000,
            cssEase: "linear",
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
          };

  return (
    <>
      <Box
        as="section"
        mt={{ base: "50px", lg: "80px" }}
        pl={{ base: "0px", lg: "60px" }}
        pr={{ base: "0px", lg: "60px" }}
      >
        <Heading
          transition="ease-in 0.15s"
          fontSize={{ base: "16px", lg: "20px" }}
          bottom="30px"
          textAlign={{ base: "left", lg: "center" }}
          color={colors.primary}
          fontFamily="Arial"
        >
          You may also like
        </Heading>
        <Box {...hoverProps}>
          <Slider {...settings}>
            {stores.map((store: any) => (
              <Box pt={{ base: "5%", lg: "10%" }} key={"listEvent" + store.id}>
                <StoreCard
                  column
                  store={store}
                  idStore={store.id}
                  titleFontSize={"1em"}
                  imageMobileHeight="150px"
                />
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    </>
  );
};

export default OrtherStores;
