import {
    Box,
    Button,
    useDisclosure,
    CloseButton,
    HStack,
    Text,
    Icon,
    VStack,
    IconButton,
    usePrefersReducedMotion,
    keyframes,
} from '@chakra-ui/react';
import { AiOutlineReload } from 'react-icons/ai';
import { FaParking } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import useColorTheme from '../../../hooks/useColorTheme';
import { useHover } from '../../../hooks/useHover';
import { useGetCarParkAvailble } from '../../../helpers/carpark';
import dayjs from 'dayjs';
import md5 from 'md5';

const ParkingCar = () => {
    // const { isOpen, onToggle } = useDisclosure()
    const [isOpen, setIsOpen] = useState(false);

    const colors = useColorTheme();
    const { hoverProps, isHovered } = useHover({});

    useEffect(() => {
        isHovered ? setIsOpen(true) : setIsOpen(false);
    }, [isHovered]);

    const spin = keyframes`
    from { transform: translateX(-10%); }
    to { transform: translateX(0%); }
    `;
    const prefersReducedMotion = usePrefersReducedMotion();
    const spinOut = keyframes`
  to { transform: translateX(-15%); }
  from { transform: translateX(0%); }
  `;
    const animation = prefersReducedMotion ? undefined : `${spin} 0.1s forwards`;

    const [available, setAvailable] = useState(0);
    const [timeAvailable, setTimeAvailable] = useState('');
    const getAvailble = async () => {
        setTimeAvailable(dayjs().format('HH:mm:ss'));

        try {
            let result: any = await useGetCarParkAvailble();
            if (result?.data?.result === 'ok') {
                setAvailable(result?.data?.records[0]?.available);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        isOpen ? getAvailble() : null;
        // const interval = setInterval(() => {
        //     getAvailble();
        // }, 1000 * 10 * 1);
        // return () => clearInterval(interval);
    }, [isOpen]);

    return (
        <>
            <Button
                {...hoverProps}
                animation={animation}
                leftIcon={<Icon as={FaParking} boxSize={10} color="#f5e1a4" />}
                _hover={{ bg: colors.primary, color: 'white' }}
                pos="absolute"
                top="20%"
                borderRightRadius="30px"
                fontSize="15px"
                color="#f5e1a4"
                borderRadius="0px"
                height="60px"
                bg="#4f2c1d"
                display={isOpen ? 'none' : 'flex'}
                zIndex="100"
                onClick={() => setIsOpen(true)}
            ></Button>

            <Box
                {...hoverProps}
                animation={animation}
                userSelect="none"
                display={isOpen ? 'flex' : 'none'}
                zIndex="100"
                borderRightRadius="50px"
                pos="absolute"
                top="20%"
                w="200px"
                height="80px"
                bg="#4f2c1d"
                pl={1}
            >
                <HStack spacing="5px">
                    <VStack justifyContent="center" spacing="1px">
                        <HStack spacing="5px">
                            <Text
                                transition="ease-in 0.15s"
                                fontSize="xs"
                                fontWeight="bold"
                                textAlign="left"
                                color="#f5e1a4"
                            >
                                {available ?? 0}
                            </Text>
                            <Text transition="ease-in 0.15s" fontSize="xs" textAlign="center" color="#f5e1a4">
                                available
                            </Text>
                            <CloseButton color="white" size="sm" onClick={() => setIsOpen(false)} />
                        </HStack>
                        <HStack spacing="5px">
                            <Text transition="ease-in 0.15s" fontSize="xs" textAlign="left" color="#f5e1a4">
                                at
                            </Text>
                            <Text transition="ease-in 0.15s" fontSize="xs" textAlign="center" color="#f5e1a4">
                                {timeAvailable}
                            </Text>
                            <IconButton
                                ml="0px"
                                bg="#4f2c1d"
                                color="#f5e1a4"
                                _hover={{ bg: colors.primary, color: 'white' }}
                                fontSize="md"
                                aria-label="Search database"
                                icon={<AiOutlineReload />}
                                onClick={() => {
                                    getAvailble();
                                }}
                            />
                        </HStack>
                    </VStack>
                    <Icon as={FaParking} boxSize={12} color="#f5e1a4" />
                </HStack>
            </Box>
        </>
    );
};

export default ParkingCar;
