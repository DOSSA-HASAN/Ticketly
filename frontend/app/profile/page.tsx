'use client'
import Link from 'next/link'
import React, { useState } from 'react'

function page() {

    const [user, setUser] = useState({
        name: "John Doe",
        email: "example@gmail.com",
        tel: "+254 7123456789",
        isEmailVerified: true,
        isPhoneVerified: true
    })

    const displayDots = "123456"
    const passwordArray = Array.from(displayDots)

    return (
        <section className='w-full bg-gray-100 p-5 lg:p-20'>
            <div className='w-full max-w-[1440px] m-auto flex flex-col justify-center items-center lg:h-screen'>
                <h1 className='text-dark text-3xl font-bold w-[80%] m-15'>Profile Settings</h1>
                <form className='w-full lg:w-[80%] lg:h-[500px] shadow-md rounded-md bg-white flex flex-col justify-center items-center px-5 py-10 space-y-7'>
                    <div className='w-full lg:w-[80%]'>
                        <label htmlFor="name" className='text-gray-600 font-medium text-[18px] flex flex-col justify-center items-start'>Full Name</label>
                        <input type="text" id='name' value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className='p-3 w-full rounded-[20px] border-1 border-gray-300 bg-black/5 focus:outline-purple' />
                    </div>
                    <div className='w-full lg:w-[80%] flex flex-col justify-center items-start'>
                        <label htmlFor="email" className='text-gray-600 font-medium text-[18px]'>Email</label>
                        <div className='w-full flex flex-col lg:flex-row justify-between items-center'>
                            <input type="email" id='email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className='p-3 w-full lg:flex-[3] rounded-[20px] border-1 border-gray-300 bg-black/5 focus:outline-purple' />
                            {
                                user.isEmailVerified ?
                                    <Link className='text-center w-full lg:flex-1 text-purple font-semibold bg-gray-300 hover:bg-gray-300/80 p-3 rounded-[900px] mt-5 lg:mt-0 lg:ml-10' href={'/change/email'}>Change Email</Link>
                                    :
                                    <Link className='text-center w-full lg:flex-1 text-purple font-semibold bg-gray-300 hover:bg-gray-300/80 p-3 rounded-[900px] mt-5 lg:mt-0 lg:ml-10' href={'/verify/email'}>Verify Email</Link>
                            }
                        </div>
                    </div>
                    <div className='w-full lg:w-[80%] flex flex-col justify-center items-start'>
                        <label htmlFor="tel" className='text-gray-600 font-medium text-[18px]'>Phone</label>
                        <div className='w-full flex flex-col lg:flex-row justify-between items-center'>
                            <input type="tel" id='tel' value={user.tel} onChange={(e) => setUser({ ...user, tel: e.target.value })} className='p-3 w-full lg:flex-[3] rounded-[20px] border-1 border-gray-300 bg-black/5 focus:outline-purple' />
                            {
                                user.isEmailVerified ?
                                    <Link className='text-center w-full lg:flex-1 text-purple font-semibold bg-gray-300 hover:bg-gray-300/80 p-3 rounded-[900px] mt-5 lg:mt-0 lg:ml-10' href={'/change/email'}>Change Number</Link>
                                    :
                                    <Link className='text-center w-full lg:flex-1 text-purple font-semibold bg-gray-300 hover:bg-gray-300/80 p-3 rounded-[900px] mt-5 lg:mt-0 lg:ml-10' href={'/verify/email'}>Verify Number</Link>
                            }
                        </div>
                    </div>
                    <div className='w-full lg:w-[80%]'>
                        <label htmlFor="pass" className='text-gray-600 font-medium text-[18px] flex flex-col justify-center items-start'>Full Name</label>
                        <input type="text" id='pass' value={passwordArray.map(() => ("•")).join("")} onChange={(e) => setUser({ ...user, name: e.target.value })} className='p-3 w-full rounded-[20px] border-1 border-gray-300 bg-black/5 focus:outline-purple' />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default page
