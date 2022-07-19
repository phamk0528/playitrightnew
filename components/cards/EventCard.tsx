import React, { useState } from 'react';
import { Box, BoxProps, useBreakpointValue } from '@chakra-ui/react';
import useColorTheme from '../../hooks/useColorTheme';
import { useRouter } from 'next/router';
import Image from 'next/image'
import Card from './Card';
import { getUrlImage } from '../../helpers/commonFuction';



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


    const router = useRouter();


    return (

        <Card

            justifyContent="flex-start"
            cursor="pointer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            // style={{ transform: `scale(${hover ? 1.1 : 1})` }}
            transition="ease-in 0.2s"
            overflow="hidden"
            display="flex"
            {...props}
            flexDirection={'column'}
            color={colors.primary}
        >
            <Box display={{ base: 'flex', lg: 'none' }} width="100%"
                height={"150px"} position='relative'>
                <Image
                    width="180px"
                    height={"150px"}
                    src={getUrlImage(event?.photos[1]?.url.replace('https://playitright.s3-ap-southeast-1.amazonaws.com/', 'https://quocbcx-1c878.kxcdn.com/') + '?width=200&quality=80' ?? '/placeholder.png')}
                    alt={'Photo of ' + event?.title}
                    // objectFit="cover"
                    layout='fill'
                    priority={true}

                />
            </Box>
            <Box display={{ base: 'none', lg: 'flex' }} width="100%"
                height={"500px"} position='relative'>
                <Image
                    width="100%"
                    height={"100%"}

                    src={getUrlImage(event?.photos[0]?.url.replace('https://playitright.s3-ap-southeast-1.amazonaws.com/', 'https://quocbcx-1c878.kxcdn.com/') + '?width=550&quality=100' ?? '/placeholder.png')}
                    alt={'Photo of ' + event?.title}
                    objectFit="contain"
                    layout='fill'
                // priority={true}
                />
            </Box>

            <Box color={"white"} bg={"red"} pt="2px" textAlign={'center'} pb="18px" fontSize={"14px"}>
                <Box h={heightTitle}>

                    <div className="product-des" dangerouslySetInnerHTML={{ __html: event?.textContent }}></div>
                </Box>


            </Box>
        </Card>

    );
};

export default EventCard;
