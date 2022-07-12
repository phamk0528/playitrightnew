import { URL_BASE } from '../constants';

export const useGetBanners = async () => {
    try {
        const data = await fetch(URL_BASE + `/config-banners`, {
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
