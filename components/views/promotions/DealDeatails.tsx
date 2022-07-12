import { SimpleGrid, Text, Stack, StackDivider, Link, Box, useColorModeValue, Icon, HStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { getUrlImage } from '../../../helpers/commonFuction';
import useColorTheme from '../../../hooks/useColorTheme';
import moment from 'moment';
import Slider from 'react-slick';
import Markdown from 'markdown-to-jsx';
import { URL_BASE } from '../../../constants';
import Image from '../../Image';
import YoutubeEmbed from '../../youtube/youtube';
import { useHover } from '../../../hooks/useHover';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdPlace } from 'react-icons/md';
import { FaClock } from 'react-icons/fa';
import { AiTwotoneCalendar } from 'react-icons/ai';
import useWindowSize from '../../../hooks/useWindowSize';
import Fade from 'react-reveal/Fade';
interface DealProps {
    deal: any;
}

const MyParagraph = ({ children, ...props }: any) => {
    return <Link {...props}>{children}</Link>;
};

const MyIMG = ({ children, ...props }: any) => {
    return (
        <Box>
            <Image data-aos="fade-left" src={props.src}>
                {children}
            </Image>
        </Box>
    );
};

const DealDetail = ({ deal }: DealProps) => {
    const colors = useColorTheme();
    const urlImageMarkdown = (text: string) => {
        return text.split('/uploads/').join(`${URL_BASE}/uploads/`);
    };
    const { hoverProps, isHovered } = useHover({});
    const screenSize = useWindowSize();
    function SampleNextArrow(props: any) {
        const { onClick } = props;
        return (
            <Icon
                position="absolute"
                cursor="pointer"
                display={screenSize.width >= 750 ? 'flex' : 'none'}
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
                display={screenSize.width >= 750 ? 'flex' : 'none'}
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

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 5000,
        cssEase: 'linear',
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }, []);

    return (
        <Box pl={{ base: '0px', lg: '60px' }} pr={{ base: '0px', lg: '60px' }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Fade bottom>
                    <Box {...hoverProps}>
                        <Slider {...settings}>
                            {deal.photos.map((photo: any) => (
                                <Box pt="10%" key={'photo' + photo._id}>
                                    <Image rounded={'md'} alt={'feature image'} src={getUrlImage(photo.url)} />
                                </Box>
                            ))}
                        </Slider>
                    </Box>
                </Fade>
                <Fade bottom>
                    <Stack spacing={4} pt="10%">
                        <Text
                            fontSize={{ base: '25px', md: '36px' }}
                            lineHeight={10}
                            color={colors.primary}
                            fontFamily="Arial"
                            textAlign={{ base: 'center', md: 'left' }}
                        >
                            {deal.title}
                        </Text>

                        <HStack pt={5} spacing="10px">
                            <Icon color="#004c45" as={FaClock} h="35px" w="35px" />
                            <Text
                                transition="ease-in 0.15s"
                                fontSize="md"
                                bottom="30px"
                                textAlign="center"
                                color="#004c45"
                                mt={{ base: '25px', lg: '50px' }}
                                mb={{ base: '25px', lg: '50px' }}
                            >
                                {deal.time}
                            </Text>
                        </HStack>

                        <HStack pt={2} spacing="10px">
                            <Icon color="#004c45" as={AiTwotoneCalendar} h="35px" w="35px" borderColor="gray.500" />
                            <Text
                                transition="ease-in 0.15s"
                                fontSize="md"
                                bottom="30px"
                                textAlign="center"
                                color="#004c45"
                                mt={{ base: '25px', lg: '50px' }}
                                mb={{ base: '25px', lg: '50px' }}
                            >
                                {deal.event_date}
                            </Text>
                        </HStack>

                        <HStack pt={2} spacing="10px">
                            <Icon color="#004c45" as={MdPlace} h="35px" w="35px" />
                            <Text
                                transition="ease-in 0.15s"
                                fontSize="md"
                                bottom="30px"
                                textAlign="center"
                                color="#004c45"
                                mt={{ base: '25px', lg: '50px' }}
                                mb={{ base: '25px', lg: '50px' }}
                            >
                                {deal.location}
                            </Text>
                        </HStack>
                        {/* <Text
            textTransform={'uppercase'}
            color={colors.primary}
            fontSize={'md'}
            pb={5}
            fontWeight="bold"
            alignSelf={'flex-start'}
            rounded={'md'}>
            {vaildForm} - {validTo}
          </Text> */}

                        <Stack
                            spacing={4}
                            divider={<StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />}
                        >
                            <Markdown
                                options={{
                                    overrides: {
                                        a: {
                                            component: MyParagraph,
                                            props: {
                                                color: 'blue',
                                            },
                                        },
                                        img: {
                                            component: MyIMG,
                                        },
                                    },
                                }}
                            >
                                {urlImageMarkdown(deal.body)}
                            </Markdown>
                            {deal.youtube_url && deal.youtube_url !== '' ? (
                                <Box h={{ base: '380px', md: '500px', lg: '500px' }}>
                                    <YoutubeEmbed youtube_url={deal.youtube_url} />
                                </Box>
                            ) : null}

                            {deal.facebook_post_url && deal.facebook_post_url !== '' ? (
                                <div className="fb-post" data-href={deal.facebook_post_url} />
                            ) : null}
                        </Stack>
                    </Stack>
                </Fade>
            </SimpleGrid>
        </Box>
    );
};

export default DealDetail;
