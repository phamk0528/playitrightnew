import { URL_BASE } from '../constants';

export const useGetContentHomePage = async () => {
    try {
        const data = await fetch(URL_BASE + `/config-homepage`, {
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
