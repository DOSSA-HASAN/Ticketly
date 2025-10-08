import { Facebook, Instagram, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className='w-full bg-gray-100 p-5 lg:pt-10 lg:pt-15 lg:pl-20 lg:pr-20 '>
      <div className='m-auto w-full max-w-[1440px] flex flex-col lg:flex-row justify-evenly items-center space-y-7 lg:space-y-0'>
        <div className='flex justify-center items-center'>
          <svg className='w-[50px]' fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="#635ae7"></path>
          </svg>
          <Link href={'/'} className='font-bold text-2xl text-gray-900'>Ticketly</Link>
        </div>
        <ul className='flex justify-center items-center text-gray-500 space-x-10'>
          <li><Link href={'/about'}>About</Link></li>
          <li><Link href={'/contact'}>Contact</Link></li>
          <li><Link href={'/frequently-asked-questions'}>FAQ</Link></li>
        </ul>
        <ul className='flex justify-center items-center text-gray-500 space-x-10'>
          <li><Link href={'/twiiter'}><Twitter /></Link></li>
          <li><Link href={'/ig'}><Instagram /></Link></li>
          <li><Link href={'/fb'}><Facebook /></Link></li>
        </ul>
      </div>
      <div className='m-auto w-[90%] h-[1px] bg-gray-300 mt-7 mb-7'></div>
      <p className='text-center text-gray-400'>&copy; 2025 Ticketly. All rights reserved</p>
    </footer>
  )
}

export default Footer
