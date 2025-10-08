import { events } from '@/lib/events'
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

function FeaturedEvents() {

    dayjs.extend(advancedFormat)

    return (
        <section className='w-full p-5 lg:p-20'>
            <div className='w-full max-w-[1440px] m-auto'>
                <h2 className='text-dark font-bold text-[35px]'>Featured Events</h2>
                <ul className='w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-rows-auto gap-5 lg:gap-10'>
                    {
                        events.map((event) => (
                            <li className='flex flex-col justify-between items-start h-[350px] m-auto' key={event.id}>
                                <Link href={`/event/${event.id}`}>
                                    <div className='relative w-[250px] h-[250px]'>
                                        <Image className='rounded-md' src={event.image} alt={event.name + " image"} fill priority />
                                    </div>
                                    <div className='space-y-1 mt-4 w-[250px]'>
                                        <h3 className='text-dark font-semibold text-lg'>{event.name}</h3>
                                        <p className='text-gray-400 text-sm'>{dayjs(event.date).format("MMMM Do YYYY")} · {event.location}</p>
                                        <p className='text-purple font-bold'>{isNaN(Number(event.price)) ? "" : "$"}{isNaN(Number(event.price)) ? event.price : Number.parseFloat(event.price)}</p>
                                    </div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}

export default FeaturedEvents
