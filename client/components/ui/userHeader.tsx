import Link from 'next/link'
import React from 'react'
import { Button } from './button'
import { useUserStore } from '@/utils/features'

const UserHeader = () => {
    const user = useUserStore(state => state.user)

    return (

        (user.id) ? (<div className='bg-white bg-opacity-25 backdrop-blur-md rounded-md mx-10 my-5 py-2 px-2 md:py-10 md:px-10 flex gap-3 flex-wrap  justify-around md:w-[90%]'>
            <Link href='/dashboard'>
                <Button variant={'outline'} className='bg-white  text-gray-700 bg-opacity-40 backdrop-blur-md drop-shadow-2xl shadow-2xl shadow-orange-500 w-[120px]'>Dashboard</Button>
            </Link>
            <Link href='/polls'>
                <Button variant={'outline'} className='bg-white  text-gray-700 bg-opacity-40 backdrop-blur-md drop-shadow-2xl shadow-2xl shadow-green-500 w-[120px]'>Trending</Button>
            </Link>
            {/* <Link href='/create'>
           <Button className='bg-gray-700  w-[120px]'>Create Poll</Button>
       </Link> */}
            <Link href='/mypolls'>
                <Button variant={'outline'} className='bg-white  text-gray-700 bg-opacity-40 backdrop-blur-md drop-shadow-2xl shadow-2xl shadow-blue-500 w-[120px]'>My Polls</Button>
            </Link>
        </div>) : (<div className='bg-white bg-opacity-25 backdrop-blur-md rounded-md mx-10 my-5 py-2 px-2 md:py-10 md:px-10 flex gap-10 flex-wrap  justify-center md:w-[90%]'>
            <Link href='/auth'>
                <Button variant={'outline'} className='bg-white  text-gray-700 bg-opacity-40 backdrop-blur-md drop-shadow-2xl shadow-2xl shadow-orange-500 w-full hover:bg-orange-500'>Create your Account now or login to vote make awesome polls</Button>
            </Link>


        </div>)
    )
}

export default UserHeader