import { URL_BASE } from '../constants';

export const useGetContentFooter = async () => {
    try {
        const data = await fetch(URL_BASE + `/config-content-footer`, {
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
