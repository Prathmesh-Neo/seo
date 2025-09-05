"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { RiMenuLine } from "react-icons/ri";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useUser } from '@/app/AuthContext';

function Navbar() {
    const [isOpen, setIsopen] = useState(false);
    const { user, logout } = useUser();

    return (
        <div>
            {/* Desktop Navbar */}
            <nav className='shadow-xl h-18 bg-[#000128] text-white lg:flex hidden items-center justify-between px-10'>
                <div>
                    <h1 className='text-xl font-semibold'>Welcome</h1>
                </div>
                <div className='space-x-5'>
                    <Link href='/'>About</Link>
                    {user ? (
                        <>
                            <span>{user.name}</span>
                            <button onClick={logout} className="ml-3 text-red-400">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link href='/login'>Login</Link>
                            <Link href='/signup'>Signup</Link>
                        </>
                    )}
                </div>
            </nav >

            {/* Mobile Navbar */}
            <nav className='lg:hidden shadow-xl h-18 bg-[#000128] text-white flex px-5 items-center justify-between'>
                <div>
                    <h1 className='text-xl font-semibold'>Welcome</h1>
                </div>
                <div>
                    <RiMenuLine size={30} onClick={() => setIsopen(!isOpen)} />
                    <div className={isOpen ? 'absolute left-0 top-0 bg-[#000128] h-screen w-[95vw] ease-linear transition duration-100' : 'absolute -top-96 ease-linear transition duration-100'}>
                        <div className='absolute right-1 m-5' onClick={() => setIsopen(false)}>
                            <IoCloseCircleOutline size={35} />
                        </div>
                        <div className='flex flex-col space-y-5 mt-14 pl-5 '>
                            <Link href='/' onClick={() => setIsopen(false)}>About</Link>
                            {user ? (
                                <>
                                    <span>{user.name}</span>
                                    <button onClick={() => { logout(); setIsopen(false); }} className="absolute bottom-20 border border-gray-400 text-center  py-2 w-[83vw] text-red-600">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link href='/login' onClick={() => setIsopen(false)} className='border border-gray-400 text-center py-2 w-[83vw]'>Login</Link>
                                    <Link href='/signup' onClick={() => setIsopen(false)} className='border border-gray-400 text-center py-2 w-[83vw]'>Signup</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div >
    )
}

export default Navbar
