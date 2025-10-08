import React from 'react'
import Link from 'next/link'
import MobileNavbar from './navbar-mobile'

function Navbar() {
    return (
        <nav className='w-full shadow-md p-4 relative z-20'>
            <header className='hidden lg:flex max-w-[1440px] justify-between items-center m-auto'>
                <div className='flex justify-between items-center'>
                    <svg className='w-[50px]' fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="#635ae7"></path>
                    </svg>
                    <ul className='w-[350px] flex items-center justify-between text-gray-400 text-[15px] font-semibold'>
                        <li className='font-bold text-2xl text-gray-900'><Link href={'/'}>Ticketly</Link></li>
                        <li><Link href={'/'}>Home</Link></li>
                        <li><Link href={'/explore'}>Explore</Link></li>
                        <li><Link href={'/create'}>Create Event</Link></li>
                    </ul>
                </div>
                <div>
                    <Link href={'/register'} className='bg-purple text-white p-btn mr-5'>Sign Up</Link>
                    <Link href={'/login'} className='bg-light text-dark p-btn'>Login</Link>
                </div>
            </header>
            <MobileNavbar />
        </nav>
    )
}

export default Navbar
