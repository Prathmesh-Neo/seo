"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useUser } from '@/app/AuthContext'
import { toast } from 'react-toastify'
import { login_api } from '@/services/auth'
import { useRouter } from 'next/navigation'
function page() {
    const [formData, setFormData] = useState({
        email: '', password: ''
    })
    const [errs, setErrs] = useState({
        email: '', password: ''
    })
    const { login } = useUser();
    const router = useRouter()
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
        setErrs({ ...errs, [name]: '' })
    }
    const validation = () => {
        let Err = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!formData.email) Err.email = 'please enter your email';
        if (formData.email && !emailRegex.test(formData.email)) Err.email = 'enter valid email'
        if (!formData.password) Err.password = 'please enter your password'
        setErrs(Err)
        return Object.keys(Err).length === 0;
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!validation()) return;

        try {
            const res = await login_api(formData)
            const data = await res.data;
            console.log(data.message)
            if (res.status === 200) {
                toast.success(data.message);
                login(res.data.user)
                router.push('/dashboard')

            }
        } catch (error) {
            console.log(error?.response?.data?.message || "Something went wrong");
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    }
    return (
        <div className="bg-[url('/login.jpg')] h-screen bg-cover flex items-center lg:justify-center">
            <form onSubmit={handleOnSubmit} className='bg-white lg:p-10 p-5 lg:w-[30%] w-full m-1 space-y-5 shadow'>
                <h1 className='font-semibold text-xl'>Welcome Back</h1>
                <div className='input-flex'>
                    <label htmlFor="email">Email</label>
                    <input type="email"
                        name='email'
                        value={formData.email}
                        onChange={handleOnChange}
                        placeholder='Enter your email'
                    />
                    <h1 className='h-3 text-sm text-red-600'>{errs.email}</h1>
                </div>
                <div className='input-flex'>
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleOnChange}
                        placeholder='Enter your password' />
                    <p className='h-0.5 text-sm text-red-600 '>{errs.password}</p>
                </div>
                <div className='flex flex-col justify-end items-end'>
                    <Link href='/' className='text-blue-600 mb-1'>Forgot Password ? </Link>
                    <button type='submit' className='bg-blue-600 w-full text-white'>Login</button>
                </div>
                <div className='text-center flex items-center justify-center'>
                    <p>Don't have an account ? </p>
                    <Link href='/signup' > &nbsp; Singup</Link>
                </div>
            </form>
        </div>
    )
}

export default page