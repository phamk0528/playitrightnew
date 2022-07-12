import React from 'react';
import Banner from '../../components/banner/Banner';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { Text } from '@chakra-ui/react';
import useColorTheme from '../../hooks/useColorTheme';
import { useGetAllArticles, useGetContentArticles } from '../../helpers/articles';
import Summary from '../../components/views/articles/Summary';
import ListArticles from '../../components/views/articles/ListArticles';
import { Box } from '@chakra-ui/react';

type Props = {
    content?: any;
    articles?: any;
    errors?: string;
};

const ArtsPage = ({ content, articles }: Props) => {
    const colors = useColorTheme();
    return (
        <>
            <NextSeo
                title="Arts"
                description="This is Arts on i12 Katong"
                canonical="https://www.canonicalurl.ie/"
                openGraph={{
                    url: 'https://www.canonicalurl.ie/',
                    title: 'Home',
                    description: `This is Arts on i12 Katong`,
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
                    {' '}
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
                fontSize={{ base: '25px', md: '36px' }}
                bottom="30px"
                textAlign="center"
                color={colors.primary}
                mt={{ base: '25px', lg: '50px' }}
                mb={{ base: '25px', lg: '35px' }}
                fontFamily="Arial;"
            >
                Arts at Katong
            </Text>
            <Summary text={content.summary} />
            <ListArticles articles={articles} />
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    try {
        let content = await useGetContentArticles();
        let articles = await useGetAllArticles();
        return { props: { content: content, articles: articles }, revalidate: 10 };
    } catch (err: any) {
        console.log('err.message', err);
        return { props: { errors: err.message } };
    }
};

export default ArtsPage;
