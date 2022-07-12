import {
    SimpleGrid,
    Text,
    Stack,
    HStack,
    StackDivider,
    Divider,
    Link,
    Box,
    useColorModeValue,
    Icon,
} from '@chakra-ui/react';
import { getUrlImage } from '../../../helpers/commonFuction';
import useColorTheme from '../../../hooks/useColorTheme';
import Slider from 'react-slick';
import Markdown from 'markdown-to-jsx';
import { URL_BASE } from '../../../constants';
import { FaWhatsapp } from 'react-icons/fa';
import { BsEnvelopeFill } from 'react-icons/bs';
import Image from '../../Image';
import { useHover } from '../../../hooks/useHover';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import useWindowSize from '../../../hooks/useWindowSize';
import Fade from 'react-reveal/Fade';

interface ArticleProps {
    article: any;
}

const MyParagraph = ({ children, ...props }: any) => {
    return <Link {...props}>{children}</Link>;
};

const MyIMG = ({ children, ...props }: any) => {
    return (
        <Box>
            <Image src={props.src}>{children}</Image>
        </Box>
    );
};

const ArticleDetails = ({ article }: ArticleProps) => {
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
        speed: 1000,
        autoplaySpeed: 5000,
        cssEase: 'linear',
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <Box pl={{ base: '0px', lg: '60px' }} pr={{ base: '0px', lg: '60px' }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Fade bottom>
                    <Box {...hoverProps}>
                        <Slider {...settings}>
                            {article.photos.map((photo: any) => (
                                <Box pt="10%" key={'photo' + photo._id}>
                                    <Image rounded={'md'} alt={'feature image'} src={getUrlImage(photo.url)} />
                                </Box>
                            ))}
                        </Slider>
                    </Box>
                </Fade>
                <Fade bottom>
                    <Stack spacing={2} pt="7%">
                        <Box>
                            <Text fontSize={'5xl'} pb="0px" color={colors.primary} fontFamily="Arial">
                                {article.art_name}
                            </Text>
                            <Text
                                textTransform={'uppercase'}
                                color={colors.primary}
                                fontSize={'md'}
                                fontWeight="bold"
                                alignSelf={'flex-start'}
                                rounded={'md'}
                            >
                                {article.artist_name}
                            </Text>
                        </Box>
                        <Box mt="25px !important">
                            <Divider borderColor="gray.300" />
                        </Box>

                        <Box>
                            <Text color={colors.primary} alignSelf={'flex-start'} rounded={'md'}>
                                {article.material}
                            </Text>
                            <Text color={colors.primary} alignSelf={'flex-start'} rounded={'md'}>
                                {`Level ${article.level}`}
                            </Text>
                            <Text color={colors.primary} alignSelf={'flex-start'} rounded={'md'}>
                                {`${article.price}`}
                            </Text>
                        </Box>

                        <Stack
                            pt="25px"
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
                                {urlImageMarkdown(article?.body)}
                            </Markdown>
                        </Stack>
                        {article?.enquiry ? (
                            <Stack spacing={2} pt="10%">
                                <Text fontSize={'xl'} fontWeight="bold" color={colors.primary}>
                                    Enquiry
                                </Text>
                                <Divider borderColor="gray.300" />
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
                                    {urlImageMarkdown(article?.enquiry)}
                                </Markdown>
                                {/* <HStack pt={5} spacing="10px">
         <Icon color="#004c45" as={FaWhatsapp} h="35px" w="35px" />
         <Text
           transition="ease-in 0.15s"
           fontSize="md"
           bottom="30px"
           textAlign="center"
           color="#004c45"
           mt={{ base: "25px", lg: "50px" }}
           mb={{ base: "25px", lg: "50px" }}
         >
           {`WhatsApp at ${article.contact_number}`}
         </Text>
       </HStack>

       <HStack pt={5} spacing="10px">
         <Icon color="#004c45" as={BsEnvelopeFill} h="35px" w="35px" />
         <Text
           transition="ease-in 0.15s"
           fontSize="md"
           bottom="30px"
           textAlign="center"
           color="#004c45"
           mt={{ base: "25px", lg: "50px" }}
           mb={{ base: "25px", lg: "50px" }}
         >
           {`Email at ${article.email}`}
         </Text>
       </HStack> */}
                            </Stack>
                        ) : null}
                    </Stack>
                </Fade>
            </SimpleGrid>
        </Box>
    );
};

export default ArticleDetails;
