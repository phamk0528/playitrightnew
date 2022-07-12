import { SimpleGrid, Text, Stack, StackDivider, Link, Box, Icon, useColorModeValue, HStack } from '@chakra-ui/react';
import { getUrlImage } from '../../../helpers/commonFuction';
import useColorTheme from '../../../hooks/useColorTheme';
import moment from 'moment';
import Slider from 'react-slick';
import Markdown from 'markdown-to-jsx';
import { URL_BASE } from '../../../constants';
import Image from '../../Image';
import YoutubeEmbed from '../../youtube/youtube';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdPlace } from 'react-icons/md';
import { useHover } from '../../../hooks/useHover';
import { useEffect } from 'react';
import { FaClock } from 'react-icons/fa';
import { AiTwotoneCalendar } from 'react-icons/ai';
import useWindowSize from '../../../hooks/useWindowSize';
import Fade from 'react-reveal/Fade';
interface EventProps {
    event: any;
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

const EventDetail = ({ event }: EventProps) => {
    const colors = useColorTheme();
    const screenSize = useWindowSize();
    const { hoverProps, isHovered } = useHover({});
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
    const urlImageMarkdown = (text: string) => {
        return text.split('/uploads/').join(`${URL_BASE}/uploads/`);
    };

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
                            {event?.photos?.map((photo: any) => (
                                <Box pt="10%" key={'photo' + photo._id}>
                                    <Image
                                        // rounded={"md"}
                                        // alt={"feature image"}
                                        src={getUrlImage(photo?.url ?? '/placeholder.png')}
                                        width="100%"
                                        objectFit="cover"
                                    />
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
                            {event.title}
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
                                {event.time}
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
                                {event.event_date}
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
                                {event.location}
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
                                {urlImageMarkdown(event.body)}
                            </Markdown>
                            {event.youtube_url && event.youtube_url !== '' ? (
                                <Box h={{ base: '380px', md: '400px', lg: '400px' }}>
                                    <YoutubeEmbed youtube_url={event.youtube_url} />
                                </Box>
                            ) : null}
                            {event.facebook_post_url && event.facebook_post_url !== '' ? (
                                <div className="fb-post" data-href={event.facebook_post_url} />
                            ) : null}

                            {/* <InstagramEmbed
  url='https://www.instagram.com/p/CRoSAwIlxM9/'
  clientAccessToken='EAADBQNZBhgo4BANTXsNuX7tBnzSaqOVrZC1ZAzzdwQAnpWCUr3uepEeAAtiKsUUZBzpw3OYUuHBqZBd880OqJy7J3cg3RUp4kYCieoxg7JxeozZAPThS35g8ZAMBQUQqKqUHQfl9u4KK9DsdSAnVZC8ZAJKqDhnVIH4SDp0uZBwti8xAZDZD'
  maxWidth={320}
  hideCaption={false}
  containerTagName='div'
  protocol=''

/> */}
                        </Stack>
                    </Stack>
                </Fade>
            </SimpleGrid>
        </Box>
    );
};

export default EventDetail;
