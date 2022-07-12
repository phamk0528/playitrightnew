import { URL_BASE } from '../constants';

export const useGetContentWhatsOn = async () => {
    try {
        const data = await fetch(URL_BASE + `/congfig-whatson`, {
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
