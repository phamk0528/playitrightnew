import { Box, SimpleGrid, Switch, Icon, Text, HStack, Select, Flex } from '@chakra-ui/react';
import React, { useState, useEffect, useMemo } from 'react';
import { sortBy, getCategories } from '../../../helpers/commonFuction';
import StoreCard from '../../cards/StoreCard';
import FilterFirstCharacter from '../../filter/filterFirstCharacter';
import { FaStar, FaMoneyCheckAlt } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
type Props = {
    stores: any;
    categories: any;
    margin?: number;
    containerHeight?: number;
    storeLoading: any;
    setKeyFilter: (e: boolean) => void;
};

type PropsCategories = {
    categories?: any;
    value: any;
    handleCategories: any;
    margin?: number;
    containerHeight?: number;
};

const ListCategories = ({ categories, handleCategories, value }: PropsCategories) => {
    const data = getCategories(categories);
    return (
        <Select
            id="categories"
            name="categories"
            mt={1}
            focusBorderColor="brand.400"
            size="sm"
            rounded="md"
            w={{ base: '100%', lg: '300px' }}
            value={value}
            onChange={(e) => handleCategories(e.target.value)}
        >
            <option value="all">All Categories</option>
            {data?.map((category: any) => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </Select>
    );
};

const ListStores = ({ categories, stores, storeLoading, setKeyFilter }: Props) => {
    const [listStores, setlistStores] = useState(stores);

    const [listStoresSearch, setlistStoresSearch] = useState(stores);

    const [listStoresCatelories, setlistStoresCatelories] = useState(stores);

    const [fristChar, setFristChar] = useState('asc');

    const [category, setCategory] = useState('all');

    const [params, setParams] = useState([false, false, false]);
    console.log("listStores", listStores)
    console.log("fristChar", fristChar)
    useEffect(() => {
        fristChar === 'asc' ? setKeyFilter(true) : setKeyFilter(false);
    }, [fristChar]);

    useEffect(() => {
        if (fristChar === 'asc') {
            sortBy(stores, 'name', 'asc', setlistStores);
            sortBy(stores, 'name', 'asc', setlistStoresSearch);
        } else if (fristChar === '09') {
            const data = stores.filter((store: any) => Number.isInteger(+store.name[0].toUpperCase()));
            setlistStores(data);
            setlistStoresSearch(data);
        } else {
            const data = stores.filter((store: any) => store.name[0].toUpperCase() === fristChar);
            console.log("stores", stores)
            setlistStores(data?.sort((a: any, b: any) => a.name.localeCompare(b.name)));
            setlistStoresSearch(data);
        }
    }, [fristChar]);

    useEffect(() => {
        const data =
            category === 'all'
                ? listStoresSearch
                : listStoresSearch.filter((store: any) => {
                    // if (category.replace(/\s/g, "") === "Food&Beverage") {
                    //   return store.category.replace(/\s/g, "").includes("FoodCourt") || store.category.replace(/\s/g, "").includes("Café&Restaurants") || store.category.replace(/\s/g, "").includes("FoodSpecialties") || store.category.replace(/\s/g, "").includes("Takeaways")
                    // }
                    // store.category.replace(/\s/g, "") === category.replace(/\s/g, "")
                    return store.category.replace(/\s/g, '').includes(category.replace(/\s/g, ''));
                });
        setlistStores(data);
        setlistStoresCatelories(data);
    }, [category, listStoresSearch]);

    useEffect(() => {
        if (params[0] === true && params[1] === true && params[2] === true) {
            console.log('đã rung 1111111111111');
            const data = listStoresCatelories.filter((store: any) => {
                return (
                    store.accept_rewards_points === true ||
                    store.accept_e_voucher === true ||
                    store.accept_shop_online === true
                );
            });
            console.log(data);
            setlistStores(data);
        } else if (params[0] === true && params[1] === true && params[2] === false) {
            const data = listStoresCatelories.filter((store: any) => {
                return store.accept_rewards_points === true || store.accept_e_voucher === true;
            });
            setlistStores(data);
        } else if (params[0] === true && params[1] === false && params[2] === true) {
            const data = listStoresCatelories.filter((store: any) => {
                return store.accept_rewards_points === true || store.accept_shop_online === true;
            });
            setlistStores(data);
        } else if (params[0] === false && params[1] === true && params[2] === true) {
            const data = listStoresCatelories.filter((store: any) => {
                return store.accept_e_voucher === true || store.accept_shop_online === true;
            });
            setlistStores(data);
        } else if (params[0] === false && params[1] === false && params[2] === true) {
            const data = listStoresCatelories.filter((store: any) => {
                return store.accept_shop_online === true;
            });
            setlistStores(data);
        } else if (params[0] === false && params[1] === true && params[2] === false) {
            const data = listStoresCatelories.filter((store: any) => {
                return store.accept_e_voucher === true;
            });
            setlistStores(data);
        } else if (params[0] === true && params[1] === false && params[2] === false) {
            const data = listStoresCatelories.filter((store: any) => {
                return store.accept_rewards_points === true;
            });
            setlistStores(data);
        } else if (params[0] === false && params[1] === false && params[2] === false) {
            const data = listStoresCatelories;

            setlistStores(data);
        } else {
            setlistStores(listStoresCatelories);
        }
    }, [params]);

    const letterCount = useMemo(
        () => (
            <FilterFirstCharacter
                handleFristChar={(value: any) => {
                    setFristChar(value);
                    setCategory('all');
                    setParams([false, false, false]);
                }}
                params={fristChar}
            />
        ),
        [fristChar],
    );
    let height = listStores?.map((item: any) => {
        return item.name.length;
    });
    var largest = Math.max.apply(Math, height);
    return (
        <>
            <Box
                as="section"
                pt={{ base: '0px', lg: '30px' }}
                pl={{ base: '0px', lg: '60px' }}
                pr={{ base: '0px', lg: '60px' }}
            >
                {letterCount}
                <Flex
                    w="100%"
                    paddingX="1rem"
                    paddingY=".5rem"
                    pt={3}
                    spacing="150px"
                    flexDirection={{ base: 'column-reverse', lg: 'row' }}
                >
                    <SimpleGrid
                        w="100%"
                        columns={[1, null, 3]}
                        // paddingX="1rem"
                        // paddingY=".5rem"
                        pt={3}
                        spacing="40px"
                    >
                        <HStack mt={{ base: '10px', lg: 0 }} align="center" direction="row">
                            <Switch
                                onChange={() => setParams([!params[0], params[1], params[2]])}
                                isChecked={params[0]}
                                colorScheme="green"
                                size="md"
                            />
                            <Icon color="#004c45" as={FaStar} h="25px" w="25px" />
                            <Text>Issue Reward Points</Text>
                        </HStack>
                        <HStack align="center" direction="row">
                            <Switch
                                onChange={() => setParams([params[0], !params[1], params[2]])}
                                isChecked={params[1]}
                                colorScheme="green"
                                size="md"
                            />
                            <Icon color="#004c45" as={FaMoneyCheckAlt} h="25px" w="25px" />
                            <Text>Accepts e-Vouchers</Text>
                        </HStack>
                        <HStack align="center" direction="row">
                            <Switch
                                onChange={() => setParams([params[0], params[1], !params[2]])}
                                isChecked={params[2]}
                                colorScheme="green"
                                size="md"
                            />
                            <Icon color="#004c45" as={MdShoppingCart} h="25px" w="25px" />
                            <Text>e-Commerce</Text>
                        </HStack>
                    </SimpleGrid>
                    <ListCategories
                        categories={categories}
                        value={category}
                        handleCategories={(catelory: any) => {
                            setCategory(catelory);
                        }}
                    />
                </Flex>

                <SimpleGrid pt={3} columns={[2, null, 4]} spacing="5px">
                    {fristChar === 'asc' &&
                        params[0] === false &&
                        params[1] === false &&
                        params[2] === false &&
                        category === 'all' ? (
                        storeLoading?.map((store: any) => (

                            <Box pt={{ base: '5%', lg: '10px' }} key={'storeLoading' + store.id}>
                                <StoreCard
                                    column
                                    store={store}
                                    idStore={store.id}
                                    titleFontSize={'1em'}
                                    heightTitle={largest + 15 + 'px'}
                                />
                            </Box>

                        ))
                    ) : listStores?.length !== 0 ? (
                        listStores?.map((store: any) => (
                            <Box pt={{ base: '5%', lg: '10px' }} key={'listEvent' + store.id}>
                                <StoreCard
                                    column
                                    store={store}
                                    idStore={store.id}
                                    titleFontSize={'1em'}
                                    heightTitle={largest + 15 + 'px'}
                                />
                            </Box>
                        ))
                    ) : (
                        <Text>No Result</Text>
                    )}
                </SimpleGrid>
            </Box>
        </>
    );
};

export default ListStores;
