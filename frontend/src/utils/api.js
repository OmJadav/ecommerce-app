import axios from 'axios'
import backendUrl from './backendUrl'
export const fetchDataApi = async (url) => {
    try {
        const response = await axios.get(backendUrl + url)
        return response.data
    } catch (error) {
        console.error("ERROR in fetching data API: " + error.message);
        return error
    }
}
export const sendDataApi = async (url, newData) => {
    try {
        const response = await axios.post(backendUrl + url, newData)
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error("ERROR in sending data API: " + error.message);
        return error
    }
}