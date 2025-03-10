import {useCallback, useState} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [status, setStatus] = useState("waiting")

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        setLoading(true)
        setStatus("loading")
        try{
            const response = await fetch(url, {method, body, headers})

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            setLoading(false);
            return data
        } catch(e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);
        const clearError = useCallback(()=>{
            setError(null)
            setStatus("waiting")
        }, [])

        return {loading, error, clearError, request, status, setStatus}
}