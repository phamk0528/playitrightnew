import React from 'react';
import Banner from '../../components/banner/Banner';
import { GetStaticProps } from 'next';
import { useGetContentReward } from '../../helpers/reward';
import { NextSeo } from 'next-seo';
import { Box, Text } from '@chakra-ui/react';
import ContentReward from '../../components/views/rewards/Content';

import { colors } from '../../styles/theme';
type Props = {
    content?: any;
    errors?: string;
};

const RewardPage = ({ content }: Props) => {
    return (
        <>
            <NextSeo
                title="Reward"
                description="This is Rewards What On Of i12 Katong"
                canonical="https://www.canonicalurl.ie/"
                openGraph={{
                    url: 'https://www.canonicalurl.ie/',
                    title: 'About',
                    description: 'This is about Rewards of i12 Katong',
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
                REWARDS
            </Text>
            {content?.show_banner ? (
                <>
                    <Box display={{ base: 'none', lg: 'flex' }}>
                        <Banner
                            mt={{ base: '20px', lg: '50px' }}
                            pl={{ base: '0px', lg: '60px' }}
                            pr={{ base: '0px', lg: '60px' }}
                            banner={content?.hero_desktop}
                            url={content?.hero_click_url}
                        />
                    </Box>
                    <Box display={{ base: 'flex', lg: 'none' }}>
                        <Banner
                            mt={{ base: '20px', lg: '50px' }}
                            pl={{ base: '0px', lg: '60px' }}
                            pr={{ base: '0px', lg: '60px' }}
                            banner={content?.hero_mobile}
                            url={content?.hero_click_url}
                        />
                    </Box>
                </>
            ) : null}

            {content?.show_secondary_banner ? (
                <>
                    <Box display={{ base: 'none', lg: 'flex' }}>
                        <Banner
                            mt={{ base: '20px', lg: '50px' }}
                            pl={{ base: '0px', lg: '60px' }}
                            pr={{ base: '0px', lg: '60px' }}
                            banner={content?.secondary_banner_desktop}
                            url={content?.secondary_click_url}
                        />
                    </Box>
                    <Box display={{ base: 'flex', lg: 'none' }}>
                        <Banner
                            mt={{ base: '20px', lg: '50px' }}
                            pl={{ base: '0px', lg: '60px' }}
                            pr={{ base: '0px', lg: '60px' }}
                            banner={content?.secondary_banner_mobile}
                            url={content?.secondary_click_url}
                        />
                    </Box>
                </>
            ) : null}

            {/* <Text
            transition="ease-in 0.15s"
            fontSize={{ base: "25px", lg: "40px" }}
            bottom="30px"
            textAlign="center"
            fontWeight="bold"
            color={colors.primary}
            mt={{ base: "25px", lg: "50px" }}
            mb={{ base: "25px", lg: "50px" }}
            fontFamily="Arial;">
            How it works
        </Text>
        <Box display={{ base: "none", lg: "flex" }}>
            <Summary text={content.info_desktop} />
        </Box>

        <Box display={{ base: "flex", lg: "none" }}>
            <Summary text={content.info_mobile} />
        </Box> */}

            <ContentReward content={content} />
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    try {
        let contentAbout = await useGetContentReward();

        return { props: { content: contentAbout }, revalidate: 10 };
    } catch (err: any) {
        console.log('err.message', err);
        return { props: { errors: err.message } };
    }
};

export default RewardPage;
