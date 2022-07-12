import { GetStaticProps } from 'next';
import { useGetAllArticles, useGetArticlesByParams } from '../../helpers/articles';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { useRouter } from 'next/router';
import { Box, Center, Text } from '@chakra-ui/react';
import ArticleDetails from '../../components/views/articles/ArticleDetails';
import OrtherArticles from '../../components/views/articles/OrtherArticles';

type Props = {
    article?: any;
    otherArticles?: any;
    morePosts?: any;
    errors?: string;
};

const EventDetail = ({ article, otherArticles }: Props) => {
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
                title={article.art_name}
                description={article.art_name}
                canonical={process.env.NEXT_PUBLIC_BASE_URL_CLIENT + `/articles/${article.id}`}
                openGraph={{
                    url: process.env.NEXT_PUBLIC_BASE_URL_CLIENT + `/articles/${article.id}`,
                    title: article?.art_name,
                    description: article?.art_name,
                    images: [
                        {
                            url: process.env.NEXT_PUBLIC_BASE_URL + `${article.photos[0].url}`,
                            width: 800,
                            height: 600,
                            alt: 'Og Image Alt',
                        },
                        {
                            url: process.env.NEXT_PUBLIC_BASE_URL + `${article.photos[0].url}`,
                            width: 900,
                            height: 800,
                            alt: 'Og Image Alt Second',
                        },
                        { url: process.env.NEXT_PUBLIC_BASE_URL + `${article.photos[0].url}` },
                        { url: process.env.NEXT_PUBLIC_BASE_URL + `${article.photos[0].url}` },
                    ],
                }}
            />
            <ArticleJsonLd
                url={process.env.NEXT_PUBLIC_BASE_URL_CLIENT + `/articles/${article.id}`}
                title={article.art_name}
                images={[process.env.NEXT_PUBLIC_BASE_URL + `${article.photos[0].url}`]}
                datePublished={article.published_at}
                dateModified={article.createdAt}
                authorName={article.artist_name}
                publisherName="i12 Katong"
                publisherLogo={process.env.NEXT_PUBLIC_BASE_URL + `${article.photos[0].url}`}
                description={article.art_name}
            />
            <ArticleDetails article={article} />
            <OrtherArticles articles={otherArticles} />
        </>
    );
};

export default EventDetail;

export async function getStaticPaths() {
    let data = await useGetAllArticles();
    const paths = data?.map((article: any) => {
        return {
            params: {
                slug: article.id.toString(),
            },
        };
    });
    return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const slug = params?.slug;
        let data = await useGetArticlesByParams(`id=${slug}`);
        let dataOrther = await useGetArticlesByParams(`id_ne=${slug}&_sort=published_at`);

        return { props: { article: data[0], otherArticles: dataOrther }, revalidate: 10 };
    } catch (err: any) {
        console.log('err.message', err);
        return { props: { errors: err.message } };
    }
};
