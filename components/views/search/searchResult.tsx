import React, { useEffect, useState } from 'react';
import { Box, Center, Text, SimpleGrid, Heading } from '@chakra-ui/react';

import ListArticles from '../articles/ListArticles';
import ListDeals from '../whatsOn/ListDeals';
import ListEvents from '../whatsOn/ListEvents';
import StoreCard from '../../cards/StoreCard';

import { useGetArticlesByParams } from '../../../helpers/articles';
import { useGetStoresByParams } from '../../../helpers/stores';
import { useGetEventsByParams } from '../../../helpers/events';
import { useGetDealsByParams } from '../../../helpers/deals';
import { useRecoilState } from 'recoil';
import { SearchKeyword } from '../../../recoil/search';

const SearchResult = () => {
    const [articles, setArticles] = useState([]);
    const [deals, setDeals] = useState([]);
    const [events, setEvents] = useState([]);
    const [stores, setStores] = useState([]);
    const [searchKeyword, setSearchKeyword] = useRecoilState(SearchKeyword);
    useEffect(() => {
        useGetArticlesByParams(`_q=` + searchKeyword).then((result) => {
            setArticles(result);
        });
        useGetStoresByParams(`_q=` + searchKeyword).then((result) => {
            setStores(result);
        });
        useGetEventsByParams(`_q=` + searchKeyword).then((result) => {
            setEvents(result);
        });
        useGetDealsByParams(`_q=` + searchKeyword).then((result) => {
            setDeals(result);
        });
    }, [searchKeyword]);

    return (
        <>
            {articles?.length !== 0 || deals?.length !== 0 || stores?.length !== 0 || events?.length !== 0 ? (
                <Box d="flex" flexDirection={{ base: 'column', lg: 'row' }}>
                    <Box
                        pl={{ base: '0px', lg: '70px' }}
                        pr={{ base: '0px', lg: '70px' }}
                        d="flex"
                        flexDirection="column"
                        flex="4"
                        as="section"
                        marginY={'.7em'}
                    >
                        {articles.length !== 0 ? (
                            <>
                                <Heading
                                    transition="ease-in 0.15s"
                                    fontSize="2xl"
                                    bottom="30px"
                                    textAlign="center"
                                    fontFamily="Arial"
                                >
                                    ARITCLES
                                </Heading>
                                <ListArticles articles={articles} />
                            </>
                        ) : null}
                        {deals?.length !== 0 ? <ListDeals deals={deals} /> : null}
                        {events?.length !== 0 ? <ListEvents events={events} /> : null}
                        {stores?.length !== 0 ? (
                            <Heading
                                transition="ease-in 0.15s"
                                fontSize="2xl"
                                bottom="30px"
                                textAlign="center"
                                fontFamily="Arial"
                            >
                                STORES
                            </Heading>
                        ) : null}
                        <SimpleGrid
                            pt={3}
                            columns={[1, null, 4]}
                            spacing="5px"
                            pl={{ base: '0px', lg: '65px' }}
                            pr={{ base: '0px', lg: '65px' }}
                        >
                            {stores.length !== 0
                                ? stores.map((store: any) => (
                                      <Box pt={{ base: '5%', lg: '10px' }} key={'listEvent' + store.id}>
                                          <StoreCard column store={store} idStore={store.id} titleFontSize={'1em'} />
                                      </Box>
                                  ))
                                : null}
                        </SimpleGrid>
                        {/* {stores.length !==0 ? <ListStores stores={stores}/>  : null} */}
                    </Box>
                </Box>
            ) : (
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
                        <Text fontWeight="bold" fontSize="xl"></Text>
                    </Center>
                </Box>
            )}
        </>
    );
};

export default SearchResult;
