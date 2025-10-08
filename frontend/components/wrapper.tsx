import React from 'react'

function Wrapper({ children }: { children: React.ReactNode }) {
    return (
        <section className='w-full m-auto px-4 py-5'>
            {children}
        </section>
    )
}

export default Wrapper
