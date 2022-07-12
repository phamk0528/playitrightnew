import { URL_BASE } from '../constants';

export const useGetContentArticles = async () => {
    try {
        const data = await fetch(URL_BASE + `/config-articles`, {
            headers: {
                Accept: 'application/json, text/plain, */*',
                'User-Agent': '*',
            },
        });
        return await data.json();
    } catch (error) {
        console.log('error', error);
    }
};

export const useGetAllArticles = async () => {
    try {
        const data = await fetch(URL_BASE + `/articles`, {
            headers: {
                Accept: 'application/json, text/plain, */*',
                'User-Agent': '*',
            },
        });
        return await data.json();
    } catch (error) {
        console.log('error', error);
    }
};

export const useGetArticlesByParams = async (param: string) => {
    try {
        const data = await fetch(URL_BASE + `/articles?` + param, {
            headers: {
                Accept: 'application/json, text/plain, */*',
                'User-Agent': '*',
            },
        });
        return await data.json();
    } catch (error) {
        console.log('error', error);
    }
};
