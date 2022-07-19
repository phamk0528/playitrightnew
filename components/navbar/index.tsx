import {
    Box,
    Flex,
    Text,
    IconButton,
    InputGroup,

    Input,

    useDisclosure,


    chakra,

    HStack,
    InputLeftElement
} from '@chakra-ui/react';

import Logo from '../Logo';
import React from 'react';

import {
    AiOutlineMenu,

    AiOutlineUser,
    AiOutlineSearch,
    AiOutlineShoppingCart,
} from "react-icons/ai";



export default function WithSubnavigation() {




    return (
        <Box>
            <DesktopNav />
        </Box>
    );
}


const DesktopNav = () => {

    const mobileNav = useDisclosure();
    return (
        <>
            <NavBar />
            <chakra.header

                w="full"
                px={{ base: 2, sm: "20%" }}
                py={4}


            >
                <Flex alignItems="center" justifyContent="space-between" mx="auto">
                    <HStack display="flex" flex={2} spacing={3} alignItems="center">
                        <Box display={{ base: "inline-flex", md: "none" }} flex={0.5}>
                            <IconButton
                                display={{ base: "flex", md: "none" }}
                                aria-label="Open menu"
                                fontSize="20px"
                                color="gray.800"
                                _dark={{ color: "inherit" }}
                                variant="ghost"
                                icon={<AiOutlineMenu />}
                                onClick={mobileNav.onOpen}
                            />

                        </Box>

                        <Box


                            display="flex"
                            alignItems="center"
                            flex={1}
                            w="100%"
                        >
                            <Logo />


                        </Box>




                    </HStack>
                    <HStack
                        spacing={3}
                        display={{ base: "none", md: "flex" }}
                        alignItems="center"

                    >
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <AiOutlineSearch />
                            </InputLeftElement>
                            <Input type="tel" placeholder="Search..." />
                        </InputGroup>

                        <Box
                            p={3}
                            color="gray.800"
                            _dark={{ color: "inherit" }}
                            rounded="sm"
                            _hover={{ color: "gray.800", _dark: { color: "gray.600" } }}
                            display="flex"
                            flexDir="row"
                            alignItems='center'
                            minW="150px"
                        >
                            <AiOutlineUser size='25px' />
                            <Text fontSize='15px' pt="5px">Login/ Register</Text>
                        </Box>

                        <Box
                            p={3}
                            color="gray.800"
                            _dark={{ color: "inherit" }}
                            rounded="sm"
                            _hover={{ color: "gray.800", _dark: { color: "gray.600" } }}

                        >
                            <AiOutlineShoppingCart size='25px' />

                        </Box>

                    </HStack>

                    <Box

                        display={{ base: "flex", md: "none" }}
                        alignItems="center"
                        flex={0.5}
                    >

                        <Box
                            p={3}
                            color="gray.800"
                            _dark={{ color: "inherit" }}
                            rounded="sm"
                            _hover={{ color: "gray.800", _dark: { color: "gray.600" } }}
                            display="flex"
                            flexDir="row"
                            alignItems='center'

                        >
                            <AiOutlineUser size='25px' />

                        </ Box>

                        <Box
                            p={3}
                            color="gray.800"
                            _dark={{ color: "inherit" }}
                            rounded="sm"
                            _hover={{ color: "gray.800", _dark: { color: "gray.600" } }}

                        >
                            <AiOutlineShoppingCart size='25px' />

                        </Box>

                    </Box>
                </Flex>
            </chakra.header>
            <MenuBar />
        </>
    );
};


const NavBar = () => {
    return (
        <Box w="100%" height="50px" display={{ base: 'none', md: 'flex' }} flexDir='row' px='20%' py='20px' justifyContent='flex-end' bg="rgb(236, 236, 236);" >
            {['contact us', 'track my order', 'help'].map((item: any) =>
                <Box px='10px'>
                    <Text fontSize="15px"
                        fontWeight='bold'
                        textTransform="uppercase">{item}</Text>
                </Box>

            )}
        </Box>
    )

}
const MenuBar = () => {
    return (
        <Box w="100%" height="50px" display={{ base: 'none', md: 'flex' }} flexDir='row' px='20%' py='20px' justifyContent='space-between'>
            {['Men', 'Women', 'kids', 'playitright sports', 'brands'].map((item: any) =>
                <Box px='10px'>
                    <Text fontSize="15px"
                        fontWeight='bold'
                        textTransform="uppercase">{item}</Text>
                </Box>

            )}
        </Box>
    )

}

