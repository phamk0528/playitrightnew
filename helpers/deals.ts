import { URL_BASE } from '../constants';

export const useGetAllDeals = async () => {
    try {
        const data = await fetch(URL_BASE + `/deals`, {
            headers: {
                'User-Agent': '*',
            },
        });
        return await data.json();
    } catch (error) {
        console.log(error);
    }
};

export const useGetDealsByParams = async (param: string) => {
    try {
        const data = await fetch(URL_BASE + `/deals?` + param, {
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
