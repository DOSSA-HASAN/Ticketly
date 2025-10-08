import Link from 'next/link'
import React from 'react'

function ExploreCategories() {

    const categories = ["Music", "Sports", "Conferences", "Festivals", "Theater", "Exhibitions"]

    return (
        <section className='w-full p-5 lg:p-20'>
            <div className='m-auto w-full max-w-[1440px] flex flex-col justify-center items-center'>
                <h2 className='text-dark text-2xl lg:text-4xl font-bold mb-10'>Explore Categories</h2>
                <ul className='flex lg:justify-between justify-center items-center w-full md:w-[80%] flex-wrap'>
                    {
                        categories.map((category, index) => (
                            <li className='text-purple font-semibold bg-purple/20 px-5 py-3 rounded-[900px] m-2 ml-0' key={index}><Link href={`events/${category}`}>{category}</Link></li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}

export default ExploreCategories
