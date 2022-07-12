import React from 'react';
import TrendingCard from '../components/views/homepage/Trending';
import ListEvents from '../components/views/homepage/ListEvents';
import ListDeals from '../components/views/homepage/ListDeals';
import { Box } from '@chakra-ui/react';
import Banner from '../components/banner/Banner';
import { GetStaticProps } from 'next';
import { useGetAllCarousels, useGetHomePage } from '../helpers/carousels';
import { useGetEventsByParams } from '../helpers/events';
import { useGetDealsByParams } from '../helpers/deals';
import { useGetContentHomePage } from '../helpers/homepage';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import ComingSoon from '../components/views/comingSoon';
import _ from 'lodash';
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
};

const IndexPage = ({ carousels, events, deals, banners, homepageContent }: Props) => {
    const homepageContentData = _.values(homepageContent?.homepage_content)
    const listContent = homepageContentData?.filter((x: any) => {
        return x?.id === "Y12VF8Q9" || x?.id === "qq1ON/UD"
    })
    const listArraivel = homepageContentData?.filter((x: any) => {
        return x?.id === "YferTLSC" || x?.id === "jGekaT+o"
    })?.map((x: any, i: any) => { return { ...x, textContent: listContent[+i]?.props?.values?.text } })

    console.log("homepageContentData", homepageContent)

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




            {/* <ComingSoon /> */}
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    try {

        let homepageContent = await useGetHomePage()

        return {
            props: {

                homepageContent: homepageContent
            },
            revalidate: 60,
        };
    } catch (err: any) {
        console.log('err.message', err);

        return { props: { errors: err.message } };
    }
};

export default IndexPage;
