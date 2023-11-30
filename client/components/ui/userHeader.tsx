import Link from 'next/link'
import React from 'react'
import { Button } from './button'

const UserHeader = () => {
    return (
        <div className='heading bg-[#43547A] rounded-md mx-10 my-5 py-2 md:py-10 md:px-10 flex gap-3 flex-wrap  justify-around md:w-[90%]'>
            <Link href='/dashboard'>
                <Button className='bg-orange-600 w-[120px]'>Dashboard</Button>
            </Link>
            <Link href='/polls'>
                <Button className='bg-orange-600 w-[120px]'>Trending</Button>
            </Link>
            <Link href='/'>
                <Button className='bg-orange-600  w-[120px]'>Create Poll</Button>
            </Link>
            <Link href='/'>
                <Button className='bg-orange-600 w-[120px]'>My Polls</Button>
            </Link>
        </div>
    )
}

export default UserHeader