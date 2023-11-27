'use client'
import { useBookStore, useUserStore } from '@/utils/features';
import { redirect } from 'next/navigation';
import React from 'react'

const page = () => {
    const user = useUserStore(state => state.user)
    const amount = useBookStore(state => state.amount)
    const updateAmount = useBookStore(state => state.updateAmount)
    console.log(user)
    // if (!user.id) return redirect("/login");
    console.log(user)
    return (
        <div> Welcome
            <h1>Books: {amount} </h1>
            <button
                onClick={() => updateAmount(10)}
            > Update Amount </button>
            <h1>Welcome, {user.username}</h1>
        </div>
    )
}

export default page