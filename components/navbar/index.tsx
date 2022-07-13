import {
    Box,
    Flex,
    Text,
    IconButton,
    InputGroup,
    InputRightElement,
    Input,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Spacer,
    Button,
    chakra,
    Image,
    HStack,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerBody,
    DrawerCloseButton,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import styles from '../../constants/styles';
import { useFormik } from 'formik';
import { useRecoilState } from 'recoil';
import useWindowSize from '../../hooks/useWindowSize';
import useColorTheme from '../../hooks/useColorTheme';
import { SearchKeyword } from '../../recoil/search';
import { useRouter } from 'next/router';
import Logo from '../Logo';
import React, { useState, useEffect } from 'react';
import { useUrlSocial } from '../../helpers/contentFooter';

export default function WithSubnavigation() {
    const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
    const [OpenSearch, setOpenSearch] = useState(false);
    const [urlButton, setUrlButton] = useState({
        facebook: 'facebook.com',
        instagram: 'instagram.com',
        youtube: 'youtube.com',
        twitter: 'google.com',
    });

    const [searchKeyword, setSearchKeyword] = useRecoilState(SearchKeyword);

    const colors = useColorTheme();

    useEffect(() => {
        useUrlSocial().then((res) => setUrlButton(res));
    }, []);

    const router = useRouter();

    const onClick = () => {
        router.push(`/search`);
    };
    const onClickSubscribe = () => {
        isOpen ? onToggle() : null;
        router.push(`/subscribe`);
    };

    const onClickSocial = (url: string) => {
        window.open(url, '_blank');
    };

    const formik = useFormik({
        initialValues: {
            keyword: searchKeyword,
        },
        onSubmit: async (values) => {
            setSearchKeyword(values.keyword);
            OpenSearch ? setOpenSearch(!OpenSearch) : null;
            onClick();
        },
    });

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={colors.primary}
                minH={'90px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                align={'center'}
                maxW={styles.mainMaxWidth}
                mx={'auto'}
            >
                <Flex flex={{ base: 1, md: 'auto' }} display={{ base: 'flex', md: 'flex', lg: 'none' }}>
                    <IconButton
                        onClick={onOpen}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={9} h={9} />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 2, md: 'auto' }} justify={{ base: 'center', md: 'center' }} alignItems='center'>
                    <Button variant="ghost">
                        <Link href="/" aria-label="homepage">
                            <Logo src="/logoPlayrightIT.png" />
                        </Link>
                    </Button>
                    <Flex display={{ base: 'none', md: 'none', lg: 'flex' }}>
                        <DesktopNav router={router} />
                    </Flex>
                </Flex>

                <Flex pt={1} flex={{ base: 1 }} justify={{ base: 'center', md: 'end' }} >
                    <Stack
                        display={{ base: 'flex', md: 'flex', lg: 'flex' }}
                        flex={{ base: 1, md: 0 }}
                        justify={'flex-end'}
                        direction={'row'}
                        spacing={6}

                    >
                        <IconButton
                            onClick={() => setOpenSearch(!OpenSearch)}
                            icon={<Icon as={AiOutlineSearch} boxSize={{ base: '1.5rem', lg: '3rem' }} />}
                            variant={'ghost'}
                            aria-label={'Toggle Navigation'}
                        />
                    </Stack>   <Stack
                        display={{ base: 'flex', md: 'flex', lg: 'flex' }}
                        flex={{ base: 1, md: 0 }}

                        direction={'row'}


                    >
                        <IconButton
                            onClick={() => setOpenSearch(!OpenSearch)}
                            icon={<Icon as={BiUserCircle} boxSize={{ base: '1.5rem', lg: '3rem' }} />}
                            variant={'ghost'}
                            aria-label={'Toggle Navigation'}
                        />
                    </Stack>

                </Flex>
            </Flex>

            <Drawer placement={'top'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody bgColor="white">
                        <MobileNav />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Collapse in={OpenSearch} animateOpacity>
                <Box
                    pl={{ base: 2, md: 5, lg: 'auto' }}
                    pr={{ base: 2, md: 5, lg: 'auto' }}
                    maxW={styles.mainMaxWidth}
                    style={{ paddingTop: '0px !important' }}
                    marginX="auto"
                    mb={2}
                    flex={{ base: 1 }}
                    justify={{ base: 'center', md: 'end' }}
                >
                    <Flex>
                        <Spacer />
                        <IconButton
                            onClick={() => setOpenSearch(!OpenSearch)}
                            icon={<CloseIcon />}
                            variant={'ghost'}
                            aria-label={'Toggle Navigation'}
                        />
                    </Flex>

                    <chakra.form onSubmit={formik.handleSubmit}>
                        <InputGroup w="100%">
                            <InputRightElement w="15%" bgColor="black">
                                <Button
                                    w="100%"
                                    type="submit"
                                    zIndex="15"
                                    leftIcon={<AiOutlineSearch />}
                                    colorScheme="black"
                                    variant="solid"
                                ></Button>
                            </InputRightElement>
                            <Input
                                id="keyword"
                                name="keyword"
                                onChange={formik.handleChange}
                                value={formik.values.keyword}
                                bgColor="white"
                                color="black"
                                type="tel"
                                placeholder="Search Keyword"
                            />
                        </InputGroup>
                    </chakra.form>
                </Box>
            </Collapse>
        </Box>
    );
}

type PropsDesktopNav = {
    router?: any;
};
const DesktopNav = ({ router }: PropsDesktopNav) => {
    const screenSize = useWindowSize();
    const colors = useColorTheme();
    return (
        <Stack direction={'row'} pt="1%">
            {NAV_ITEMS.map((navItem) => (
                <Box
                    as="button"
                    key={navItem.label}
                    pb={'2px'}
                    style={
                        router.asPath.includes(navItem.href)
                            ? {
                                borderBottom: '1.5px solid #A68340',
                                borderTop: '0px',
                                borderLeft: '0px',
                                borderRight: '0px',
                            }
                            : {
                                borderBottom: '0px',
                                borderTop: '0px',
                                borderLeft: '0px',
                                borderRight: '0px',
                            }
                    }
                >
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                _focus={{
                                    borderBottom: '0px',
                                    borderTop: '0px',
                                    borderLeft: '0px',
                                    borderRight: '0px',
                                }}
                                p={2}
                                href={navItem.href ?? '#'}
                                fontSize={
                                    screenSize.width >= 1119 && screenSize.width <= 1202
                                        ? '13px'
                                        : screenSize.width >= 1077 && screenSize.width <= 1119
                                            ? '12px'
                                            : screenSize.width >= 1035 && screenSize.width < 1077
                                                ? '11px'
                                                : screenSize.width >= 986 && screenSize.width < 1035
                                                    ? '10px'
                                                    : screenSize.width >= 950 && screenSize.width < 986
                                                        ? '9px'
                                                        : screenSize.width < 950
                                                            ? '7px'
                                                            : '15px'
                                }
                                fontWeight={600}
                                color={colors.primary}
                                _hover={{
                                    textDecoration: 'none',
                                    color: useColorModeValue('gray', 'white'),
                                }}
                            >
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

type PropsMobileNav = {
    onClickSubscribe?: any;
    onClickSocial?: any;
    urlButtonSocial?: any;
};

const MobileNav = () => {
    return (
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ lg: 'none' }}>
            <Box flexDirection="row" display="flex" justifyContent="center" mb="20px">
                <Image src="/logoPlayrightIT.png" w="80px" />
            </Box>

            <Box mt="30px">
                {NAV_ITEMS.map((navItem) => (
                    <MobileNavItem key={navItem.label} {...navItem} />
                ))}
            </Box>
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();
    const colors = useColorTheme();

    return (
        <Stack spacing={2} onClick={children && onToggle}>
            <Flex
                py={1}
                as={Link}
                href={href ?? '#'}
                justify={'center'}
                alignItems={'center'}
                _hover={{
                    textDecoration: 'none',
                }}
                textAlign="center"
            >
                <Text
                    fontSize="16px"
                    fontWeight={300}
                    color={'white'}
                    _hover={{
                        textDecoration: 'none',
                        color: useColorModeValue('gray', 'white'),
                    }}
                >
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            {/* <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse> */}
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    // {
    //     label: `WHAT'S ON`,
    //     href: `/whatsOn`,
    // },
    // {
    //     label: 'STORE DIRECTORY',
    //     href: '/stores',
    // },
    // {
    //     label: "REWARDS",
    //     href: "/rewards",
    // },
    // {
    //     label: 'ARTS AT i12 KATONG',
    //     href: '/arts',
    // },
    // {
    //     label: 'ABOUT US',
    //     href: '/aboutUs',
    // },
    // {
    //     label: 'CONTACT US',
    //     href: '/contactUs',
    // },
];
