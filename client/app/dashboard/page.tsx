'use client'
import UserHeader from '@/components/ui/userHeader';
import { useUserStore } from '@/utils/features';

import { redirect } from 'next/navigation';
import React from 'react'
import CreatePoll from '../components/CreatePoll';


const Page = () => {
    const user = useUserStore(state => state.user)



    if (!user.id) return redirect("/auth");

    return (
        <section className=' mx-2 md:mx-20 mt-8'>
            <div className='mx-20'>
                <h1 className='text-orange-500 text-xl md:text-6xl'>Welcome, <span className='text-blue-300 text-lg'>{user.username}</span> </h1>
            </div>
            <UserHeader />

            <div className='mx-auto py-20 flex justify-center'>
                <CreatePoll />
            </div>
        </section>
    )
}

export default Page