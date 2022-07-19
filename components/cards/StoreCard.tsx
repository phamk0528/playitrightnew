import React, { useState } from 'react';
import { Box, BoxProps, Text, useBreakpointValue, Icon, HStack } from '@chakra-ui/react';
import useColorTheme from '../../hooks/useColorTheme';
import { useRouter } from 'next/router';
import Image from '../Image';
import Card from './Card';

import { getUrlImage } from '../../helpers/commonFuction';
import { FaStar, FaMoneyCheckAlt } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';

interface Props extends BoxProps {
    store: any;
    column?: boolean;
    height?: number | string;
    skeleton?: boolean;
    imgBoxSize?: string | number;
    titleFontSize?: number | string;
    idStore?: string;
    imageMobileHeight?: string;
    heightTitle?: string;
}

type FlexDirection = 'row' | 'column' | undefined;

const StoreCard = ({
    store,
    column = false,
    imgBoxSize,
    skeleton = false,
    titleFontSize = '1.4rem',
    idStore,
    imageMobileHeight,
    heightTitle,
    ...props
}: Props) => {
    const [hover, setHover] = useState(false);
    const colors = useColorTheme();

    const router = useRouter();
    const onClickEvent = () => {
        router.push(`/stores/${idStore}`);
        window.scrollTo(0, 0);
    };

    return (
        // <Fade bottom>
        <Card
            onClick={() => onClickEvent()}
            justifyContent="flex-start"
            cursor="pointer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ transform: `scale(${hover ? 1.05 : 1})` }}


            transition="ease-in 1s"
            overflow="hidden"
            h="100%"
            display="flex"
            {...props}
            flexDirection={'column'}
            color={colors.primary}
        >
            <Box display={{ base: 'none', lg: 'flex' }} border="1px" borderColor="gray.300">
                <Image
                    width="100%"
                    height={{ base: 40, md: 35, lg: 60 }}
                    src={getUrlImage(store.photos[0].url)}
                    alt={'Photo of ' + store.name}
                    objectFit="contain"
                />
            </Box>
            <Box display={{ base: 'flex', lg: 'none' }} border="1px" borderColor="gray">
                <Image
                    width="100%"
                    height={{ base: imageMobileHeight ? '23vh' : '130px' }}
                    src={getUrlImage(store.photos[0].url)}
                    alt={'Photo of ' + store.name}
                    objectFit="cover"
                />
            </Box>
            <Box mt={{ base: 4, md: 4 }} color={colors.primary}>
                <Box h={heightTitle}>
                    <Text fontWeight="bold" textTransform="uppercase" fontSize="15px" letterSpacing="wide">
                        {store.name}
                    </Text>
                </Box>

                <Box h="50px">
                    <Text textTransform="uppercase" fontSize="15px" letterSpacing="wide">
                        {store.location}
                    </Text>
                    <Text fontSize="15px" letterSpacing="wide">
                        {store.category}
                    </Text>
                </Box>
                <HStack mt={5} spacing="10px">
                    {store.accept_rewards_points ? <Icon color="#004c45" as={FaStar} boxSize="1.5rem" /> : null}
                    {store.accept_e_voucher ? <Icon color="#004c45" as={FaMoneyCheckAlt} boxSize="1.5rem" /> : null}
                    {store.accept_shop_online ? (
                        <Icon color="#004c45" as={MdShoppingCart} boxSize="1.5rem" />
                    ) : null}
                </HStack>
            </Box>
        </Card>
        // </Fade>
    );
};

export default StoreCard;
