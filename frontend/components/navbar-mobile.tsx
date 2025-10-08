'use client'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

function MobileNavbar() {

    const [isMenuOpen, setIsmenuOpen] = useState<boolean>(false)

    return (
        <header className='w-full lg:hidden'>
            <div className='flex justify-between items-center relative'>
                <div className='flex justify-start items-center'>
                    <svg className='w-[50px]' fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="#635ae7"></path>
                    </svg>
                    <Link href={'/'} className='font-bold text-2xl text-gray-900'>Ticketly</Link>
                </div>
                <div onClick={() => setIsmenuOpen(!isMenuOpen)}>
                    <Menu />
                </div>
            </div>
            <div className={`h-50 p-3 flex justify-center items-center absolute bg-white shadow-md w-full left-0 rounded-b-sm transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-50 opacity-0 pointer-events-none'}`}>
                <ul className='text-gray-400 text-[15px] font-semibold flex flex-col justify-between items-center h-full'>
                    <li><Link href={'/'}>Home</Link></li>
                    <li><Link href={'/explore'}>Explore</Link></li>
                    <li><Link href={'/create'}>Create Event</Link></li>
                    <li className='mb-3'><Link href={'/register'} className='bg-purple text-white p-btn'>Sign Up</Link></li>
                    <li><Link href={'/login'} className='bg-light text-dark p-btn'>Login</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default MobileNavbar
