import { URL_BASE } from '../constants';

export const useGetAllCarousels = async () => {
    try {
        const data = await fetch(URL_BASE + `/carousels`, {
            headers: {
                Accept: 'application/json, text/plain, */*',
                'User-Agent': '*',
            },
        });
        console.log('statusCode-Carousel:', data);
        return await data.json();
    } catch (error) {
        console.log('error', error);
    }
};

export const useGetHomePage = async () => {
    try {
        const data = await fetch('https://api.playitright.com/websiteLayouts', {
            headers: {
                Accept: 'application/json, text/plain, */*',
                Referer: 'https://playitright.com/',
            },
        });
        console.log('statusCode-Carousel:', data);
        return await data.json();
    } catch (error) {
        console.log('error', error);
    }
};

export const useGetProductByCollection = async (id: number) => {
    try {
        const data = await fetch(`https://api.playitright.com/products?collection=${id}`, {
            headers: {
                Accept: 'application/json, text/plain, */*',
                Referer: 'https://playitright.com/',
            },
        });
        console.log('statusCode-Carousel:', data);
        return await data.json();
    } catch (error) {
        console.log('error', error);
    }
};
