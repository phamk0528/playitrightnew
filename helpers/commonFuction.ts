import _ from 'lodash';

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
