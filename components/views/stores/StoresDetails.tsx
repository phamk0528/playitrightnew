import { SimpleGrid, Text, Stack, Link, Box, Divider, HStack, Icon } from '@chakra-ui/react';
import { getUrlImage } from '../../../helpers/commonFuction';
import useColorTheme from '../../../hooks/useColorTheme';
import Slider from 'react-slick';
import { FaGlobe, FaClock, FaStar, FaMoneyCheckAlt } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';
import Markdown from 'markdown-to-jsx';
import { URL_BASE } from '../../../constants';
import Image from '../../Image';
import { useHover } from '../../../hooks/useHover';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import useWindowSize from '../../../hooks/useWindowSize';
import Fade from 'react-reveal/Fade';
interface StoreProps {
    store: any;
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

const StoreDetail = ({ store }: StoreProps) => {
    const colors = useColorTheme();
    const { hoverProps, isHovered } = useHover({});
    const screenSize = useWindowSize();
    function SampleNextArrow(props: any) {
        const { onClick } = props;
        return (
            <Icon
                position="absolute"
                cursor="pointer"
                display={screenSize.width >= 800 ? 'flex' : 'none'}
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
                display={screenSize.width >= 800 ? 'flex' : 'none'}
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
        return text?.split('/uploads/').join(`${URL_BASE}/uploads/`) || '';
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

    return (
        <Box pl={{ base: '0px', lg: '60px' }} pr={{ base: '0px', lg: '60px' }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Fade bottom>
                    <Box {...hoverProps}>
                        <Slider {...settings}>
                            {store.photos.map((photo: any) => (
                                <Box pt="10%" key={'photo' + photo._id}>
                                    <Image
                                        rounded={'md'}
                                        alt={'feature image'}
                                        src={getUrlImage(photo.url)}
                                        width="100%"
                                        height="100%"
                                    />
                                </Box>
                            ))}
                        </Slider>
                    </Box>
                </Fade>
                <Fade bottom>
                    <Stack spacing={2} pt="10%">
                        <Text fontSize={'4xl'} color={colors.primary} fontFamily="Arial">
                            {store.name}
                        </Text>
                        <Divider borderColor="gray.300" />
                        <Text
                            textTransform={'uppercase'}
                            color={colors.primary}
                            fontSize={'md'}
                            fontWeight="bold"
                            alignSelf={'flex-start'}
                            rounded={'md'}
                        >
                            {store.location}
                        </Text>
                        <Text
                            textTransform={'uppercase'}
                            color={colors.primary}
                            fontSize={'md'}
                            pb={5}
                            fontWeight="bold"
                            alignSelf={'flex-start'}
                            rounded={'md'}
                        >
                            {store.category}
                        </Text>

                        <Stack spacing={4}>
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
                                {urlImageMarkdown(store.body)}
                            </Markdown>
                        </Stack>

                        <HStack pt={10} spacing="10px">
                            <Icon color="#004c45" as={FaClock} h="35px" w="35px" borderRadius="50px" />
                            <Text
                                transition="ease-in 0.15s"
                                fontSize="md"
                                bottom="30px"
                                textAlign="center"
                                color="#004c45"
                                mt={{ base: '25px', lg: '50px' }}
                                mb={{ base: '25px', lg: '50px' }}
                            >
                                {store.opening_hours}
                            </Text>
                        </HStack>

                        <HStack pt={3} spacing="10px">
                            <Icon
                                color="#004c45"
                                as={FiPhone}
                                p={1}
                                h="35px"
                                w="35px"
                                borderColor="gray.500"
                                border="2px"
                                borderRadius="50px"
                            />
                            <Text
                                transition="ease-in 0.15s"
                                fontSize="md"
                                bottom="30px"
                                textAlign="center"
                                color="#004c45"
                                mt={{ base: '25px', lg: '50px' }}
                                mb={{ base: '25px', lg: '50px' }}
                            >
                                {store.contact_number}
                            </Text>
                        </HStack>

                        <HStack pt={3} spacing="10px">
                            <Icon color="#004c45" as={FaGlobe} h="35px" w="35px" borderRadius="50px" />
                            <Text
                                transition="ease-in 0.15s"
                                fontSize="md"
                                bottom="30px"
                                textAlign="center"
                                color="#004c45"
                                mt={{ base: '25px', lg: '50px' }}
                                mb={{ base: '25px', lg: '50px' }}
                            >
                                {store.website}
                            </Text>
                        </HStack>
                        <Stack spacing={2} pt="10%">
                            <Text fontSize={{ base: '16px', lg: '20px' }} fontWeight="bold" color={colors.primary}>
                                This Store Accepts
                            </Text>
                            <Divider borderColor="gray.300" />
                            {store.accept_rewards_points ? (
                                <HStack pt={5} spacing="10px">
                                    <Icon color="#004c45" as={FaStar} h="35px" w="35px" />
                                    <Text
                                        transition="ease-in 0.15s"
                                        fontSize="md"
                                        bottom="30px"
                                        textAlign="center"
                                        color="#004c45"
                                        mt={{ base: '25px', lg: '50px' }}
                                        mb={{ base: '25px', lg: '50px' }}
                                    >
                                        Issues reward points
                                    </Text>
                                </HStack>
                            ) : null}
                            {store.accept_e_voucher ? (
                                <HStack pt={3} spacing="10px">
                                    <Icon color="#004c45" as={FaMoneyCheckAlt} h="35px" w="35px" />
                                    <Text
                                        transition="ease-in 0.15s"
                                        fontSize="md"
                                        bottom="30px"
                                        textAlign="center"
                                        color="#004c45"
                                        mt={{ base: '25px', lg: '50px' }}
                                        mb={{ base: '25px', lg: '50px' }}
                                    >
                                        Keppel Rewards e-Voucher
                                    </Text>
                                </HStack>
                            ) : null}
                            {store.accept_shop_online ? (
                                <HStack pt={3} spacing="10px">
                                    <Icon color="#004c45" as={MdShoppingCart} h="35px" w="35px" />
                                    <Text
                                        transition="ease-in 0.15s"
                                        fontSize="md"
                                        bottom="30px"
                                        textAlign="center"
                                        color="#004c45"
                                        mt={{ base: '25px', lg: '50px' }}
                                        mb={{ base: '25px', lg: '50px' }}
                                    >
                                        Shop Online
                                    </Text>
                                </HStack>
                            ) : null}
                        </Stack>
                    </Stack>
                </Fade>
            </SimpleGrid>
        </Box>
    );
};

export default StoreDetail;
