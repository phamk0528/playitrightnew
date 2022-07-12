import { GetStaticProps } from 'next';
import { useGetAllStores, useGetStoresByParams } from '../../helpers/stores';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { useRouter } from 'next/router';
import { Box, Center, Text } from '@chakra-ui/react';
import StoreDetails from '../../components/views/stores/StoresDetails';
import OtherStores from '../../components/views/stores/OrtherStores';

type Props = {
    banners?: any;
    stores?: any;
    otherStores?: any;
    morePosts?: any;
    errors?: string;
};

const StoreDetail = ({ stores, otherStores }: Props) => {
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
                title={stores.name}
                description={stores.name}
                canonical={process.env.NEXT_PUBLIC_BASE_URL_CLIENT + `/stores/${stores.id}`}
                openGraph={{
                    url: process.env.NEXT_PUBLIC_BASE_URL_CLIENT + `/stores/${stores.id}`,
                    title: stores.name,
                    description: stores.name,
                    images: [
                        {
                            url: process.env.NEXT_PUBLIC_BASE_URL + `${stores.photos[0].url}`,
                            width: 800,
                            height: 600,
                            alt: 'Og Image Alt',
                        },
                        {
                            url: process.env.NEXT_PUBLIC_BASE_URL + `${stores.photos[0].url}`,
                            width: 900,
                            height: 800,
                            alt: 'Og Image Alt Second',
                        },
                        { url: process.env.NEXT_PUBLIC_BASE_URL + `${stores.photos[0].url}` },
                        { url: process.env.NEXT_PUBLIC_BASE_URL + `${stores.photos[0].url}` },
                    ],
                }}
            />
            <ArticleJsonLd
                url={process.env.NEXT_PUBLIC_BASE_URL_CLIENT + `/events/${stores.id}`}
                title={stores.name}
                images={[process.env.NEXT_PUBLIC_BASE_URL + `${stores.photos[0].url}`]}
                datePublished={stores.published_at}
                dateModified={stores.createdAt}
                authorName="i12 Katong"
                publisherName="i12 Katong"
                publisherLogo={process.env.NEXT_PUBLIC_BASE_URL + `${stores.photos[0].url}`}
                description={stores.name}
            />
            <StoreDetails store={stores} />
            <OtherStores stores={otherStores} />
        </>
    );
};

export default StoreDetail;

export async function getStaticPaths() {
    let data = await useGetAllStores();
    const paths = data?.map((store: any) => {
        return {
            params: {
                slug: store.id.toString(),
            },
        };
    });
    return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const slug = params?.slug;
        let data = await useGetStoresByParams(`id=${slug}`);
        let dataOrther = await useGetStoresByParams(`id_ne=${slug}&_sort=published_at`);
        return { props: { stores: data[0], otherStores: dataOrther }, revalidate: 10 };
    } catch (err: any) {
        console.log('err.message', err);
        return { props: { errors: err.message } };
    }
};
