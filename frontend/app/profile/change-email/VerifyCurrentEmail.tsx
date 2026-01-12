import Logo from '@/components/logo'
import React, {useState} from 'react'

function VerifyCurrentEmail() {

    const [otp, setOtp] = useState(Array.length(6).fill(""))

    return (
        <section className='w-full bg-gray-100'>
            <div className='w-full max-w-[1440px] m-auto flex flex-col justify-center items-center h-screen'>
                <Logo />
                <form className='flex flex-col justify-center items-center bg-white shadow-md rounded-md p-5'>
                    <h1 className='text-dark text-2xl font-bold'>Verify Your Email</h1>
                    <p className='text-gray-500'>Please enter the 6-digit code sent to your email address</p>

                </form>
            </div>
        </section>
    )
}

export default VerifyCurrentEmail
