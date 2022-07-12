import { URL_BASE } from '../constants';
const URL_BASE_EMAILS = 'https://integration.bistrobytes.com.sg/cases';
import { toast } from 'react-toastify';
const axios = require('axios').default;

export const useGetContentContactUs = async () => {
    try {
        const data = await fetch(URL_BASE + `/config-contact-us`, {
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

export const uploadImage = async (image: any) => {
    const dataImage = new FormData();
    dataImage.append('files', image);
    const data = await axios({
        method: 'POST',
        url: 'http://localhost:1337/upload',
        data: dataImage,
    });
    return data;
};

export const useContact = async (contact: any) => {
    const response = await fetch(URL_BASE_EMAILS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
    });
    response.status === 200
        ? toast.success(`Your feedback has been successfully submitted.  We'll be in touch with you shortly.`)
        : toast.warning('An error occurred, please try again later');
    return response;
};
