import axios from 'axios'
import backendUrl from './backendUrl'
import toast from 'react-hot-toast'
export const fetchDataApi = async (url) => {
    try {
        const response = await axios.get(backendUrl + url, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.error("ERROR in fetching data API: " + error.message);
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
    }
}
export const sendDataApi = async (url, newData) => {
    try {
        const response = await axios.post(backendUrl + url, newData, {
            withCredentials: true,
        })
        // console.log(response.data);
        return response.data
    } catch (error) {
        console.error("ERROR in sending data API: " + error.message);
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
    }
}
