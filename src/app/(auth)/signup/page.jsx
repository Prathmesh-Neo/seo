"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { signup } from '@/services/auth'
function page() {
    const [formData, setFormData] = useState({
        name: '', email: '', contact: "", password: '', confirmPass: ''
    })
    const [errs, setErrs] = useState({})

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
        setErrs({ ...errs, [name]: ' ' })
    }
    const validation = () => {
        let Err = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!formData.name) Err.name = 'please enter your name'
        if (!formData.contact) Err.contact = 'please enter contact details'
        if (!formData.email) Err.email = 'please enter your email';
        if (formData.email && !emailRegex.test(formData.email)) Err.email = 'enter valid email'
        if (!formData.password) Err.password = 'please enter your password'
        if (formData.password && formData.password.length < 7) Err.password = 'please enter password 8 chars'
        if (!formData.confirmPass) Err.confirmPass = 'please enter confirm password'
        if (formData.password !== formData.confirmPass) Err.confirmPass = "Password not matching "
        setErrs(Err)
        return Object.keys(Err).length === 0;
    }
    const handleOnSingUp = async (e) => {
        e.preventDefault();
        if (!validation()) return;
        try {
            const res = await signup(formData);
            const data = await res.data;
            console.log(data.message)
        } catch (error) {
            console.log(error?.response?.message);
        }
    }
    return (
        <div className="h-screen flex justify-center items-center bg-[url('/login.jpg')] bg-cover">
            <form onSubmit={handleOnSingUp} className='lg:w-1/3 bg-white shadow-2xl lg:p-10 p-5 w-full m-2 space-y-5'>
                <h1 className='font-semibold text-xl text-center'>Create account</h1>
                <div className='input-flex'>
                    <label htmlFor="name">Name</label>
                    <input type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleOnChange}
                        placeholder='enter your full name'
                    />
                    <p className='h-3 text-sm text-red-600'>{errs.name}</p>

                </div>
                <div className='input-flex'>
                    <label htmlFor="email">Email</label>
                    <input type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleOnChange}
                        placeholder='Enter your email'
                    />
                    <p className='h-3 text-sm text-red-600'>{errs.email}</p>
                </div>
                <div className='input-flex'>
                    <label htmlFor="contact">Contact No</label>
                    <input type="number"
                        name="contact"
                        value={formData.contact}
                        onChange={handleOnChange}
                        placeholder='Enter your moobile number'
                    />
                    <p className='h-3 text-sm text-red-600'>{errs.contact}</p>
                </div>
                <div className='input-flex'>
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleOnChange}
                        placeholder='Enter your password'
                    />
                    <p className='h-3 text-sm text-red-600'>{errs.password}</p>
                </div>
                <div className='input-flex'>
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input type="text"
                        name="confirmPass"
                        value={formData.confirmPass}
                        onChange={handleOnChange}
                        placeholder='Enter your Confirm password'
                    />
                    <p className='h-3 text-sm text-red-600'>{errs.confirmPass}</p>
                </div>
                <div className='flex justify-end'>
                    <button className='bg-blue-600  w-full'>SignUp</button>
                </div>
                <div className='text-center flex items-center justify-center'>
                    <p>Already have an account ? </p>
                    <Link href='/login'> &nbsp; Login</Link>
                </div>
            </form>
        </div>
    )
}

export default page