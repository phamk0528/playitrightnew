import { URL_BASE } from '../constants';

export const useGetAllStores = async () => {
    try {
        const data = await fetch(URL_BASE + `/stores`, {
            headers: {
                Accept: 'application/json, text/plain, */*',
                'User-Agent': '*',
            },
        });
        return await data.json();
    } catch (error) {
        console.log(error);
    }
};

export const useGetStoresByParams = async (param: string) => {
    try {
        const data = await fetch(URL_BASE + `/stores?` + param, {
            headers: {
                Accept: 'application/json, text/plain, */*',
                'User-Agent': '*',
            },
        });
        return await data.json();
    } catch (error) {
        console.log(error);
    }
};

export const useGetAllCategories = async () => {
    try {
        const data = await fetch(URL_BASE + `/config-store-categories`, {
            headers: {
                Accept: 'application/json, text/plain, */*',
                'User-Agent': '*',
            },
        });
        return await data.json();
    } catch (error) {
        console.log(error);
    }
};
