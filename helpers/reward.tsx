import { URL_BASE } from '../constants';

export const useGetContentReward = async () => {
    try {
        const data = await fetch(URL_BASE + `/config-rewards`, {
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
