import { URL_BASE } from '../constants'

export const useGetInstagram = async () => {
    const configInstagram = await fetch(URL_BASE + `/config-instagram`);
    const dataConfig = await configInstagram.json();

    const accessToken = await fetch(`https://graph.facebook.com/v10.0/${dataConfig.id_instagram}/media?access_token=${dataConfig.access_token}`);
    const data = await accessToken.json();

    return {
        token: dataConfig,
        data: data
    }
}
