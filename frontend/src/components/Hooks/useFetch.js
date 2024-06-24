import { useEffect, useState } from "react"
import { fetchDataApi } from "../../utils/api"

const useFetch = (endpoint) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const makeApiCall = async () => {
            setLoading(true);
            try {
                const res = await fetchDataApi(endpoint);
                setData(res);
                setError(null);
            } catch (err) {
                setError(err.error);
                setData(null);
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