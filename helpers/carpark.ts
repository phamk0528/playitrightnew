import { CAR_PARK_URL } from '../constants';
import axios from 'axios';
export const useGetCarParkAvailble = async () => {
    try {
        const data = await axios.get(CAR_PARK_URL);
        return data;
    } catch (error) {
        console.log(error);
    }
};
