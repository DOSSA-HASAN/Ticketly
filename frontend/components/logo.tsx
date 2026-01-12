import React from 'react'

function Logo() {
    return (
        <div className='flex justify-center items-center'>
            <svg className='w-[50px]' fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="#635ae7"></path>
            </svg>
            <p className='font-bold text-2xl text-gray-900'>Ticketly</p>
        </div>
    )
}

export default Logo
