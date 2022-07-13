import React, { useState } from 'react';
import { Box, BoxProps, Text, useBreakpointValue, Icon, Flex } from '@chakra-ui/react';
import useColorTheme from '../../hooks/useColorTheme';
import { useRouter } from 'next/router';
import Image from 'next/image'
import Card from './Card';
import _ from 'lodash';
import moment from 'moment';
import { getUrlImage } from '../../helpers/commonFuction';
import { AiFillCalendar } from 'react-icons/ai';
import Fade from 'react-reveal/Fade';

interface Props extends BoxProps {
    event: any;
    column?: boolean;
    height?: number | string;
    skeleton?: boolean;
    imgBoxSize?: string | number;
    titleFontSize?: number | string;
    idEvent?: string;
    heightTitle: string;
}

type FlexDirection = 'row' | 'column' | undefined;

const EventCard = ({
    event,
    column = false,
    imgBoxSize,
    skeleton = false,
    titleFontSize = '1.4rem',
    idEvent,
    heightTitle,
    ...props
}: Props) => {
    const [hover, setHover] = useState(false);
    const colors = useColorTheme();
    const flexDirection: FlexDirection = useBreakpointValue({
        base: 'column',
        md: column ? 'column' : 'row',
    });
    const vaildForm = moment(event.start_date).format('Do MMM');
    const validTo = moment(event.end_date).format('Do MMM');
    const router = useRouter();
    const onClickEvent = () => {
        router.push(`/events/${idEvent}`);
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
                <Box display={{ base: 'none', lg: 'flex' }} width="100%">
                    <Image
                        width="300px"
                        height={"300px"}

                        src={getUrlImage(event?.photos[0]?.url.replace('https://playitright.s3-ap-southeast-1.amazonaws.com/', 'https://quocbcx-1c878.kxcdn.com/') + '?width=300&quality=70' ?? '/placeholder.png')}
                        alt={'Photo of ' + event?.title}
                        objectFit="cover"
                        priority={true}
                    />
                </Box>
                <Box display={{ base: 'flex', lg: 'none' }} >
                    <Image
                        width="180px"
                        height={"170px"}
                        src={getUrlImage(event?.photos[1]?.url.replace('https://playitright.s3-ap-southeast-1.amazonaws.com/', 'https://quocbcx-1c878.kxcdn.com/') + '?width=180&quality=80' ?? '/placeholder.png')}
                        alt={'Photo of ' + event?.title}
                        objectFit="cover"
                        priority={true}
                    />
                </Box>
                <Box color={"white"} bg={"red"} pt="2px" textAlign={'center'} pb="18px" fontSize={"14px"}>
                    <Box h={heightTitle}>

                        <div className="product-des" dangerouslySetInnerHTML={{ __html: event?.textContent }}></div>
                    </Box>


                </Box>
            </Card>
        </Fade>
    );
};

export default EventCard;
