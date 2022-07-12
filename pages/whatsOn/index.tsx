import React from 'react';
import Banner from '../../components/banner/Banner';
import { GetStaticProps } from 'next';
import { useGetContentWhatsOn } from '../../helpers/whatons';
import { useGetAllEvents } from '../../helpers/events';
import { useGetAllDeals } from '../../helpers/deals';
import ListEventsWhatsOn from '../../components/views/whatsOn/ListEvents';
import ListDealsWhatsOn from '../../components/views/whatsOn/ListDeals';
import { NextSeo } from 'next-seo';
import { Text } from '@chakra-ui/react';
import useColorTheme from '../../hooks/useColorTheme';
import { Box } from '@chakra-ui/react';
type Props = {
    banners?: any;
    events?: any;
    deals?: any;
    errors?: string;
};

const WhatsOnPage = ({ banners, events, deals }: Props) => {
    const colors = useColorTheme();
    return (
        <>
            <NextSeo
                title="What's On"
                description="This is What On Of i12 Katong"
                canonical="https://www.canonicalurl.ie/"
                openGraph={{
                    url: 'https://www.canonicalurl.ie/',
                    title: 'Home',
                    description: `This is What's On Of i12 Katong`,
                    images: [
                        {
                            url: '/logo.PNG',
                            width: 800,
                            height: 600,
                            alt: 'Og Image Alt',
                        },
                        {
                            url: '/logo.PNG',
                            width: 900,
                            height: 800,
                            alt: 'Og Image Alt Second',
                        },
                        { url: '/logo.PNG' },
                        { url: '/logo.PNG' },
                    ],
                }}
            />
            {banners?.show_banner ? (
                <>
                    {' '}
                    <Box display={{ base: 'none', lg: 'flex' }}>
                        <Banner
                            mt={{ base: '20px', lg: '50px' }}
                            pl={{ base: '0px', lg: '60px' }}
                            pr={{ base: '0px', lg: '60px' }}
                            banner={banners?.hero_banner_desktop}
                            url={banners?.url_hero_banner}
                        />
                    </Box>
                    <Box display={{ base: 'flex', lg: 'none' }}>
                        <Banner
                            mt={{ base: '20px', lg: '50px' }}
                            pl={{ base: '0px', lg: '60px' }}
                            pr={{ base: '0px', lg: '60px' }}
                            banner={banners?.hero_banner_mobile}
                            url={banners?.url_hero_banner}
                        />
                    </Box>
                </>
            ) : null}

            <Text
                transition="ease-in 0.15s"
                fontSize="4xl"
                bottom="30px"
                textAlign="center"
                color={colors.primary}
                mt={{ base: '25px', lg: '50px' }}
                mb={{ base: '25px', lg: '50px' }}
                fontFamily="Arial;"
                fontWeight={500}
            >
                WHAT'S ON
            </Text>
            {events?.length > 0 ? <ListEventsWhatsOn events={events} /> : null}

            {deals?.length > 0 ? <ListDealsWhatsOn deals={deals} /> : null}
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    try {
        let banner = await useGetContentWhatsOn();
        let event = await useGetAllEvents();
        let deal = await useGetAllDeals();
        return {
            props: {
                banners: banner,
                events: event?.sort(function (a: any, b: any) {
                    return parseInt(b?.sort_order) - parseInt(a?.sort_order);
                }),
                deals: deal?.sort(function (a: any, b: any) {
                    return parseInt(b?.sort_order) - parseInt(a?.sort_order);
                }),
            },
            revalidate: 10,
        };
    } catch (err: any) {
        console.log('err.message', err);
        return { props: { errors: err.message } };
    }
};

export default WhatsOnPage;
