import { URL_BASE } from '../constants';

export const useGetAllEvents = async () => {
    try {
        const data = await fetch(URL_BASE + `/events`, {
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
export const useGetEventsByParams = async (param: string) => {
    try {
        const data = await fetch(URL_BASE + `/events?` + param, {
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
