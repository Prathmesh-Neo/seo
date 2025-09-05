'use client'
import React, { useEffect, useState } from 'react'
import getData from "@/Components/fetchData";
import About from '@/app/about/page'
function page() {
    const [data, setData] = useState([])
    useEffect(() => {
        handleOnFetchData();
    }, [])

    const handleOnFetchData = async () => {
        try {
            const { data } = await getData({ API_URL: 'https://jsonplaceholder.typicode.com/posts' })
            setData(data);
        } catch (error) {
            console.log(error.message)
        }
    }
    console.log('Client', data)
    return (
        <div>
            page
        </div>
    )
}

export default page