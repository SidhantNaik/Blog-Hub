import { useEffect, useState } from "react"

export const useFetch =  (url, options = {}, dependencies = []) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    
    useEffect(() => {
        
        const fetData = async () => {
            setLoading(true)
            try {
                    const respones = await fetch(url, options)
                    const responesData = await respones.json()

                    if (!respones.ok) {
                        throw new Error(`Error: ${respones.statusText},${respones.status}`)
                    }

                    setData(responesData)
                    setError()

                } catch (error) {
                    setError(error)
                } finally {
                    setLoading(false)
                }

        }
        fetData()
    }, dependencies)



    return { data, loading, error }
}