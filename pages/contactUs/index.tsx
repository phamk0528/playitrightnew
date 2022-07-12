import React from 'react';
import Banner from '../../components/banner/Banner';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import useColorTheme from '../../hooks/useColorTheme';
import { Text } from '@chakra-ui/react';
import Summary from '../../components/views/contactUs/Summary';
import { useGetContentContactUs } from '../../helpers/contact';
import { Box } from '@chakra-ui/react';

type Props = {
    content?: any;
    errors?: string;
};

const ContactPage = ({ content }: Props) => {
    const colors = useColorTheme();
    return (
        <>
            <NextSeo
                title="Contact Us"
                description="This is Contact Us Of i12 Katong"
                canonical="https://www.canonicalurl.ie/"
                openGraph={{
                    url: 'https://www.canonicalurl.ie/',
                    title: 'Contact Us',
                    description: 'This is Contact Us Of i12 Katong',
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
                CONTACT US
            </Text>
            <Summary content={content} />
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    try {
        let contentAbout = await useGetContentContactUs();
        return { props: { content: contentAbout }, revalidate: 10 };
    } catch (err: any) {
        console.log('err.message', err);
        return { props: { errors: err.message } };
    }
};

export default ContactPage;
