import { GetStaticProps } from 'next';
import { useGetAllDeals, useGetDealsByParams } from '../../helpers/deals';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { useRouter } from 'next/router';
import { Box, Center, Text } from '@chakra-ui/react';
import DealDeatails from '../../components/views/promotions/DealDeatails';
import OrtherDeals from '../../components/views/promotions/OrtherDeals';

type Props = {
    deal?: any;
    otherDeals?: any;
    morePosts?: any;
    errors?: string;
};

const EventDetail = ({ deal, otherDeals }: Props) => {
    const router = useRouter();
    if (router.isFallback) {
        return (
            <Box
                pl={{ base: '0px', lg: '70px' }}
                pr={{ base: '0px', lg: '70px' }}
                d="flex"
                flexDirection="column"
                flex="4"
                as="section"
                marginY={'.7em'}
            >
                <Center>
                    <Text fontWeight="bold" fontSize="xl">
                        Loading Page
                    </Text>
                </Center>
            </Box>
        );
    }

    return (
        <>
            <NextSeo
                title={deal.title}
                description={deal.summary}
                canonical={process.env.NEXT_PUBLIC_BASE_URL_CLIENT + `/promotions/${deal.id}`}
                openGraph={{
                    url: process.env.NEXT_PUBLIC_BASE_URL_CLIENT + `/promotions/${deal.id}`,
                    title: deal.title,
                    description: deal.summary,
                    images: [
                        {
                            url: process.env.NEXT_PUBLIC_BASE_URL + `${deal?.photos[0]?.url}`,
                            width: 800,
                            height: 600,
                            alt: 'Og Image Alt',
                        },
                        {
                            url: process.env.NEXT_PUBLIC_BASE_URL + `${deal?.photos[0]?.url}`,
                            width: 900,
                            height: 800,
                            alt: 'Og Image Alt Second',
                        },
                        { url: process.env.NEXT_PUBLIC_BASE_URL + `${deal?.photos[0]?.url}` },
                        { url: process.env.NEXT_PUBLIC_BASE_URL + `${deal?.photos[0]?.url}` },
                    ],
                }}
            />
            <ArticleJsonLd
                url={process.env.NEXT_PUBLIC_BASE_URL_CLIENT + `/promotions/${deal.id}`}
                title={deal.title}
                images={[process.env.NEXT_PUBLIC_BASE_URL + `${deal?.photos[0]?.url}`]}
                datePublished={deal.published_at}
                dateModified={deal.createdAt}
                authorName={deal?.title}
                publisherName={deal?.title}
                publisherLogo={process.env.NEXT_PUBLIC_BASE_URL + `${deal?.photos[0]?.url}`}
                description={deal?.title}
            />
            <DealDeatails deal={deal} />
            <OrtherDeals deals={otherDeals} />
        </>
    );
};

export default EventDetail;

export async function getStaticPaths() {
    let data = await useGetAllDeals();
    const paths = data?.map((deal: any) => {
        return {
            params: {
                slug: deal.id.toString(),
            },
        };
    });
    return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const slug = params?.slug;
        let data = await useGetDealsByParams(`id=${slug}`);
        let dataOrther = await useGetDealsByParams(`id_ne=${slug}&_sort=published_at`);

        return {
            props: {
                deal: data[0],
                otherDeals: dataOrther?.sort(function (a: any, b: any) {
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
