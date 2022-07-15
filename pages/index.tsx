import React from 'react';
import TrendingCard from '../components/views/homepage/Trending';
import ListEvents from '../components/views/homepage/ListEvents';
import ListDeals from '../components/views/homepage/ListDeals';
import { Box } from '@chakra-ui/react';
import Banner from '../components/banner/Banner';
import { GetStaticProps } from 'next';
import { useGetAllCarousels, useGetHomePage, useGetProductByCollection } from '../helpers/carousels';
import { useGetEventsByParams } from '../helpers/events';
import { useGetDealsByParams } from '../helpers/deals';
import { useGetContentHomePage } from '../helpers/homepage';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import ComingSoon from '../components/views/comingSoon';
import _ from 'lodash';
import ListProducts from '../components/views/homepage/ListProductCard';
import HightLight from '../components/views/homepage/HighLight';
import ListSlideView from '../components/views/homepage/ListSlideView';
const MyDynamicComponent = dynamic(() => import('../components/views/homepage/Instagrams'), { ssr: false });
type Props = {
    featured?: any;
    banners?: any;
    carousels?: any;
    events?: any;
    instagrams?: any;
    deals?: any;
    errors?: string;
    homepageContent?: any
    bestSeller?: any
    recommend?: any
};

const IndexPage = ({ carousels, events, deals, banners, homepageContent, recommend, bestSeller }: Props) => {
    const homepageContentData = _.values(homepageContent?.homepage_content)
    const listContent = homepageContentData?.filter((x: any) => {
        return x?.id === "Y12VF8Q9" || x?.id === "qq1ON/UD"
    })
    const listArraivel = homepageContentData?.filter((x: any) => {
        return x?.id === "YferTLSC" || x?.id === "jGekaT+o"
    })?.map((x: any, i: any) => { return { ...x, textContent: listContent[+i]?.props?.values?.text } })

    const listBanner = homepageContentData?.filter((x: any) => {
        return x?.id === "4g+Chi4C"
    })
    const bannerHighlight = homepageContentData?.filter((x: any) => {
        return x?.id === "81QE/qtW"
    })
    const flashSaleHighlight = homepageContentData?.filter((x: any) => {
        return x?.id === "KpVRNCGX"
    })


    console.log("listBanner", homepageContent)
    console.log("recommend", recommend)


    return (
        <>
            <NextSeo
                title="Home"
                description="This is homepage "
                canonical="https://www.canonicalurl.ie/"
                openGraph={{
                    url: 'https://www.canonicalurl.ie/',
                    title: 'Home',
                    description: 'This is homepage',
                    images: [
                        {
                            url: '/logoPlayrightIT.PNG',
                            width: 800,
                            height: 600,
                            alt: 'Og Image Alt',
                        },
                        {
                            url: '/logoPlayrightIT.PNG',
                            width: 900,
                            height: 800,
                            alt: 'Og Image Alt Second',
                        },
                        { url: '/logoPlayrightIT.PNG' },
                        { url: '/logoPlayrightIT.PNG' },
                    ],
                }}
            />

            <TrendingCard carousels={carousels} homepageContentData={homepageContentData} />
            {listArraivel?.length > 0 ? <ListEvents events={listArraivel} /> : null}


            <>

                <Box display={{ base: 'none', lg: 'flex' }}>
                    <Banner
                        mt={{ base: '20px', lg: '50px' }}
                        pl={{ base: '0px', lg: '60px' }}
                        pr={{ base: '0px', lg: '60px' }}
                        banner={{ url: listBanner[0]?.props?.values?.imageUrl?.url }}

                    />
                </Box>
                <Box display={{ base: 'flex', lg: 'none' }}>
                    <Banner
                        mt={{ base: '20px', lg: '50px' }}
                        pl={{ base: '0px', lg: '60px' }}
                        pr={{ base: '0px', lg: '60px' }}
                        banner={{ url: listBanner[0]?.props?.values?.imageUrl?.urlMobile }}

                    />
                </Box>
            </>
            {bestSeller?.length > 0 ? <ListProducts products={bestSeller} title={'Best Seller'} /> : null}
            <HightLight carousels={carousels} homepageContentData={homepageContentData} banner={bannerHighlight[0]?.props?.values?.imageUrl?.urlMobile}
                flashSaleHighlight={flashSaleHighlight[0]?.props?.values?.imageUrl?.urlMobile} />
            <ListSlideView carousels={carousels} homepageContentData={homepageContentData} />
            {recommend?.length > 0 ? <ListProducts products={recommend} title='Recommended Products' /> : null}

            {/* <ComingSoon /> */}
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    try {

        let homepageContent = await useGetHomePage()
        let bestSeller = await useGetProductByCollection(10)
        let recommend = await useGetProductByCollection(13)


        return {
            props: {

                homepageContent: homepageContent,
                bestSeller: bestSeller,
                recommend: recommend
            },
            revalidate: 60,
        };
    } catch (err: any) {
        console.log('err.message', err);

        return { props: { errors: err.message } };
    }
};

export default IndexPage;
