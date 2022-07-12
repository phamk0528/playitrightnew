import React, { useState } from 'react';
import { Box, BoxProps, Text, useBreakpointValue, Icon, Flex } from '@chakra-ui/react';
import useColorTheme from '../../hooks/useColorTheme';
import styles from '../../constants/styles';
import { useRouter } from 'next/router';
import Image from '../Image';
import Card from './Card';
import _ from 'lodash';
import moment from 'moment';
import { getUrlImage } from '../../helpers/commonFuction';
import { AiFillCalendar } from 'react-icons/ai';
import Fade from 'react-reveal/Fade';
interface Props extends BoxProps {
    deal: any;
    column?: boolean;
    height?: number | string;
    skeleton?: boolean;
    imgBoxSize?: string | number;
    titleFontSize?: number | string;
    idDeal?: string;
    heightTitle: string;
}

type FlexDirection = 'row' | 'column' | undefined;

const DealCard = ({
    deal,
    column = false,
    imgBoxSize,
    skeleton = false,
    titleFontSize = '1.4rem',
    idDeal,
    heightTitle,
    ...props
}: Props) => {
    const [hover, setHover] = useState(false);
    const colors = useColorTheme();
    const flexDirection: FlexDirection = useBreakpointValue({
        base: 'column',
        md: column ? 'column' : 'row',
    });
    const vaildForm = moment(deal.start_date).format('Do MMM');
    const validTo = moment(deal.end_date).format('Do MMM');
    const router = useRouter();
    const onClickEvent = () => {
        router.push(`/promotions/${idDeal}`);
        window.scrollTo(0, 0);
    };

    return (
        <Fade bottom>
            <Card
                onClick={() => onClickEvent()}
                justifyContent="flex-start"
                cursor="pointer"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{ transform: `scale(${hover ? 1.1 : 1})` }}
                transition="ease-in 0.2s"
                overflow="hidden"
                display="flex"
                {...props}
                flexDirection={'column'}
                color={colors.primary}
            >
                <Box display={{ base: 'none', lg: 'flex' }}>
                    <Image
                        width="100%"
                        height={{ base: 40, md: 35, lg: 60 }}
                        src={getUrlImage(deal?.photos[0]?.url ?? '/placeholder.png')}
                        alt={'Photo of ' + deal?.title}
                        objectFit="cover"
                    />
                </Box>
                <Box display={{ base: 'flex', lg: 'none' }}>
                    <Image
                        width="100%"
                        height="22vh"
                        src={getUrlImage(deal?.photos[0]?.url ?? '/placeholder.png')}
                        alt={'Photo of ' + deal?.title}
                        objectFit="cover"
                    />
                </Box>
                <Box mt={{ base: 4, md: 4 }} color={colors.primary}>
                    <Box h={heightTitle}>
                        <Text
                            fontWeight="bold"
                            textTransform="uppercase"
                            fontSize={{ base: '12px', md: '15px' }}
                            letterSpacing="wide"
                        >
                            {deal.title}
                        </Text>
                    </Box>
                    <Flex>
                        <Icon as={AiFillCalendar} boxSize={{ base: '1.5rem', md: '2rem' }} mt={1} />
                        <Text pl={1} mt={2} fontSize="md">
                            {deal.event_date}
                        </Text>
                    </Flex>

                    {/* <Text
                    mt={1}
                    display="block"
                    fontSize="lg"
                    lineHeight="normal"
                    fontWeight="semibold"
                    href="#"
                >
                    {_.upperFirst(post.sumary)}
                </Text> */}
                </Box>
            </Card>
        </Fade>
    );
};

export default DealCard;
