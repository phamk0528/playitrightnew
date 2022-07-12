import { URL_BASE } from '../constants';

export const useGetContentAboutUs = async () => {
    try {
        const data = await fetch(URL_BASE + `/config-about-us`, {
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
