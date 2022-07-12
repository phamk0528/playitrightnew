import React from 'react';
import Banner from '../../components/banner/Banner';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import { Box, Text } from '@chakra-ui/react';
import TermsOfUse from '../../components/views/footerContent/termsOfUse';
import { useGetContentFooter } from '../../helpers/footerContent';
import useColorTheme from '../../hooks/useColorTheme';
type Props = {
    content?: any;
    errors?: string;
};

const WhiteListPage = ({ content }: Props) => {
    const colors = useColorTheme();
    return (
        <>
            <NextSeo
                title="About"
                description="This is Terms Of Use Of i12 Katong"
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
                WHISTLEBLOWING POLICY
            </Text>
            {/* 
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
            </Text> */}
            <TermsOfUse text={content?.whistleblowing_policy} />
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    try {
        let contentAbout = await useGetContentFooter();
        return { props: { content: contentAbout }, revalidate: 10 };
    } catch (err: any) {
        console.log('err.message', err);
        return { props: { errors: err.message } };
    }
};

export default WhiteListPage;
