import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Login() {
    return (
        <section className='w-full h-[90vh]'>
            <div className='w-full max-w-[1440px] flex justify-between items-center p-5 lg:-20 h-full'>
                <div className='hidden lg:flex w-[45%] relative h-full'>
                    <Image className='rounded-md' src={'/auth-image.png'} fill priority alt='Image of people purchasing tickets' />
                </div>
                <form className='flex flex-col justify-center items-center w-full lg:w-[calc(100%-45%)] space-y-6'>
                    <div className='flex justify-center items-center'>
                        <svg className='w-[50px]' fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="#635ae7"></path>
                        </svg>
                        <Link href={'/'} className='font-bold text-3xl text-gray-900'>Ticketly</Link>
                    </div>
                    <div>
                        <h2 className='text-dark font-bold text-[30px]'>Welcome Back</h2>
                        <p className='text-gray-500'>Don't have an account? <Link href={'/auth/register'} className='text-purple'>Sign up</Link></p>
                    </div>
                    <div className='w-full lg:w-1/2 bg-gray-300 rounded-lg'>
                        <input type="email" placeholder='Email Adress' className='w-full p-3 focus:outline-none' />
                        <div className='w-full h-[1px] bg-gray-400'></div>
                        <input type="password" placeholder='Password' className='w-full p-3 focus:outline-none' />
                    </div>
                    <button className='w-full lg:w-1/2 bg-purple rounded-md text-white font-semibold p-3 hover:cursor-pointer shadow-md'>Login</button>
                    <div className='flex justify-center items-center w-full lg:w-1/2 text-gray-500 space-x-3'>
                        <div className='w-1/2 h-[1px] bg-gray-400'></div>
                        <p>or</p>
                        <div className='w-1/2 h-[1px] bg-gray-400'></div>
                    </div>
                    <button className='flex justify-center items-center w-full lg:w-1/2 bg-white rounded-md text-gray-500 shadow-md border-1 border-gray-400 font-semibold p-3 hover:cursor-pointer'><Image src={'/google_logo.png'} width={25} height={25} alt='Google logo' priority className='mr-3' />Continue with google</button>
                </form>
            </div>
        </section>
    )
}

export default Login
