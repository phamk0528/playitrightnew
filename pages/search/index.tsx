import React from 'react';

import { GetStaticProps } from 'next';
import SearchResult from '../../components/views/search/searchResult';
type Props = {
    errors?: string;
};

const SearchResultPage = () => {
    return (
        <>
            <SearchResult />
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    try {
        return { props: {}, revalidate: 10 };
    } catch (err: any) {
        console.log('err.message', err);
        return { props: { errors: err.message } };
    }
};

export default SearchResultPage;
