import moment from 'moment';
import _ from 'lodash';
import Resizer from 'react-image-file-resizer';

export const getUrlImage = (image: string) => {
    return image;
};

export const getCategories = (categories: string) => {
    const data = categories?.split(';').map((category: any) => {
        const result = category.charAt(0) === ' ' ? category.substr(1) : category;
        return result;
    });

    return data?.sort((a, b) => a?.localeCompare(b));
};

export const getProductIds = (ids: string) => {
    return ids.split(',');
};

export const formatDatePublic = (datePublic: any) => {
    return moment(datePublic).format('Do MMM YY');
};

export const sortBy = async (obj: [], filter: string, asc: string, callBack: any) => {
    const orderBy = await _.orderBy(obj, [filter], [asc === 'asc' ? 'asc' : 'asc']);
    callBack(orderBy);
};

export const FileToBase64 = (file: any) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const resizeFile = (file: any) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            300,
            300,
            'JPEG',
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            'base64',
        );
    });
