import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useGetAllStores, useGetAllCategories, useGetStoresByParams } from '../../helpers/stores';
import { NextSeo } from 'next-seo';
import { Text, Center, Button } from '@chakra-ui/react';
import useColorTheme from '../../hooks/useColorTheme';
import ListStores from '../../components/views/stores/ListStores';

type Props = {
    stores?: any;
    categories?: any;
    errors?: string;
    storesLoading: any;
};

const StoresPage = ({ stores, categories, storesLoading }: Props) => {
    const colors = useColorTheme();
    console.log("LIST STORE", stores)
    const [items, setItems] = useState<Array<any>>(storesLoading);
    const [start, setStart] = useState(0);
    const [isShow, setIsShow] = useState(true);
    const [keyFilter, setKeyFilter] = useState(true);

    const defaultAticlesShowed = 12;
    const handelLoadMore = (result: any) => {
        setIsShow(false);
        setItems((pre) => {
            return [...pre, ...result];
        });
    };

    useEffect(() => {
        if (start === 0) return;
        useGetStoresByParams(`_sort=name:ASC&_start=${start}&_limit=${defaultAticlesShowed}`).then((result) => {
            result.length === 0 || result.length < defaultAticlesShowed
                ? handelLoadMore(result)
                : setItems((pre) => {
                    return [...pre, ...result];
                });
        });
    }, [start]);
    return (
        <>
            <NextSeo
                title="Stores"
                description="This is Stores Of i12 Katong"
                canonical="https://www.canonicalurl.ie/"
                openGraph={{
                    url: 'https://www.canonicalurl.ie/',
                    title: 'Home',
                    description: `This is Stores Of i12 Katong`,
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
                mb={{ base: '10px', lg: '50px' }}
                fontFamily="Arial;"
            >
                STORES
            </Text>
            <ListStores
                stores={stores}
                storeLoading={items}
                categories={categories?.Categories}
                setKeyFilter={(e: boolean) => setKeyFilter(e)}
            />
            {isShow && keyFilter && (
                <Center h="100px" color={colors.primary}>
                    <Button
                        bgColor="white"
                        height={{ base: '30px', md: '40px' }}
                        onClick={() => setStart((pre) => pre + defaultAticlesShowed)}
                        borderRadius={30}
                        border="1px"
                        borderColor={colors.primary}
                    >
                        Load More
                    </Button>
                </Center>
            )}
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    const defaultAticlesShowed = 12;
    try {
        let stores = await useGetStoresByParams(`_sort=name:ASC&_start=0&_limit=${10000}`);

        let storesLoading = await useGetStoresByParams(`_sort=name:ASC&_start=0&_limit=${defaultAticlesShowed}`);
        let categories = await useGetAllCategories();

        return { props: { stores: stores, categories: categories, storesLoading: storesLoading }, revalidate: 10 };
    } catch (err: any) {
        console.log('err.message', err);
        return { props: { errors: err?.message } };
    }
};

export default StoresPage;
