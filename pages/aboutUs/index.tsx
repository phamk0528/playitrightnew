import React from 'react';
import Banner from '../../components/banner/Banner';
import Summary from '../../components/views/aboutUs/Summary';
import { GetStaticProps } from 'next';
import { useGetContentAboutUs } from '../../helpers/about';
import { NextSeo } from 'next-seo';
import { Text } from '@chakra-ui/react';
import useColorTheme from '../../hooks/useColorTheme';
import OurLocation from '../../components/views/aboutUs/OurLocation';
import GettingHere from '../../components/views/aboutUs/GettingHere';
import ConciergeServices from '../../components/views/aboutUs/ConciergeServices';
import Amentities from '../../components/views/aboutUs/Amentities';
import CarparkCharges from '../../components/views/aboutUs/CarparkCharges';
import Fade from 'react-reveal/Fade';
import { Box } from '@chakra-ui/react';
type Props = {
    content?: any;
    errors?: string;
};

const AboutPage = ({ content }: Props) => {
    const colors = useColorTheme();
    return (
        <>
            <NextSeo
                title="About"
                description="This is What On Of i12 Katong"
                canonical="https://www.canonicalurl.ie/"
                openGraph={{
                    url: 'https://www.canonicalurl.ie/',
                    title: 'About',
                    description: 'This is about of i12 Katong',
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
            {content?.show_banner ? (
                <>
                    <Box display={{ base: 'none', lg: 'flex' }}>
                        <Banner
                            mt={{ base: '20px', lg: '50px' }}
                            pl={{ base: '0px', lg: '60px' }}
                            pr={{ base: '0px', lg: '60px' }}
                            banner={content?.hero_banner_desktop}
                            url={content?.url_hero_banner}
                        />
                    </Box>

                    <Box display={{ base: 'flex', lg: 'none' }}>
                        <Banner
                            mt={{ base: '20px', lg: '50px' }}
                            pl={{ base: '0px', lg: '60px' }}
                            pr={{ base: '0px', lg: '60px' }}
                            banner={content?.hero_banner_mobile}
                            url={content?.url_hero_banner}
                        />
                    </Box>
                </>
            ) : null}
            <Fade bottom>
                <Text
                    transition="ease-in 0.15s"
                    fontSize={{ base: '25px', lg: '36px' }}
                    bottom="30px"
                    textAlign="center"
                    color={colors.primary}
                    mt={{ base: '25px', lg: '50px' }}
                    mb={{ base: '25px', lg: '50px' }}
                    fontFamily="Arial;"
                >
                    ABOUT US
                </Text>
            </Fade>
            <Fade bottom>
                <Summary text={content.summary} />
            </Fade>
            <Fade bottom>
                <OurLocation
                    google_api={content.key_google_map}
                    lat={content.lat_location}
                    lng={content.long_location}
                />
            </Fade>
            <Fade bottom>
                <GettingHere
                    getting_by_bus={content.getting_by_bus}
                    getting_by_train={content.getting_by_train}
                    getting_by_car={content.getting_by_car}
                />
            </Fade>
            <Fade bottom>
                <CarparkCharges
                    carpark_charges_motorcycle={content.carpark_charges_motorcycle}
                    carpark_charges_car={content.carpark_charges_car}
                />
            </Fade>
            <Fade bottom>
                <ConciergeServices text={content.concierge_services} />
            </Fade>
            <Fade bottom>
                <Amentities
                    wifi={content.amentities_wifi}
                    nursing_room={content.amentities_nursing_room}
                    charging_point={content.amentities_charging_point}
                />
            </Fade>
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    try {
        let contentAbout = await useGetContentAboutUs();
        return { props: { content: contentAbout }, revalidate: 10 };
    } catch (err: any) {
        console.log('err.message', err);
        return { props: { errors: err.message } };
    }
};

export default AboutPage;
