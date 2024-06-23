import { useEffect, useState } from "react"
import { fetchDataApi } from "../../utils/api"

const useFetch = (endpoint) => {
    const [data, setData] = useState()
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const makeApiCall = async () => {
            setLoading(true);
            try {
                const res = await fetchDataApi(endpoint);
                setData(res);
            } catch (err) {
                setError(err.error);
            } finally {
                setLoading(false);
            }
        };

        if (endpoint) {
            makeApiCall();
        }
    }, [endpoint]);
    return { data, error, loading }
}

export default useFetch