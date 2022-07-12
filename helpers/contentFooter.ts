import { URL_BASE } from '../constants';

export const useGetTermsOfUse = async () => {
    try {
        const data = await fetch(URL_BASE + `/terms-of-use`, {
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

export const useGetAboutUs = async () => {
    try {
        const data = await fetch(URL_BASE + `/about-us`, {
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
export const useGetContactUs = async () => {
    try {
        const data = await fetch(URL_BASE + `/contact-us`, {
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
export const useGetPrivacyPolicy = async () => {
    try {
        const data = await fetch(URL_BASE + `/privacy-policy`, {
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
export const useUrlSocial = async () => {
    try {
        const data = await fetch(URL_BASE + `/config-url-social`, {
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
