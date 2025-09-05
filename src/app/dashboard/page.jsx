'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { get_products } from '@/apis/dashboard';

function Page() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        handleOnfetchProducts();
    }, [])

    const handleOnfetchProducts = async () => {
        try {
            const res = await get_products();
            setProducts(res.data.products)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="px-5 lg:px-16 py-10">
            <h1 className="text-2xl font-bold mb-6">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product,index) => (
                    <div key={index}
                        className="border rounded-xl shadow-sm hover:shadow-lg transition duration-300 bg-white p-4 cursor-pointer"
                    >
                        <div className="flex justify-center items-center h-56">
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={200}
                                height={200}
                                className="max-h-52 object-contain"
                            />
                        </div>
                        <h2 className="text-sm font-medium mt-3 line-clamp-2">{product.title}</h2>
                        <p className="text-lg font-bold text-green-700 mt-2">
                            ${product.price}
                        </p>
                        <div className="text-yellow-500 text-sm font-semibold mt-1">
                            ★★★★☆
                            <span className='text-black'>  {product.rating.count}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page;
