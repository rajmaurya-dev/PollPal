'use client'
import { useBookStore, useUserStore } from '@/utils/features';
import { redirect } from 'next/navigation';
import React from 'react'

const Page = () => {
    const user = useUserStore(state => state.user)
    const amount = useBookStore(state => state.amount)
    const updateAmount = useBookStore(state => state.updateAmount)
    console.log(user)
    // if (!user.id) return redirect("/login");
    console.log(user)
    return (
        <section>
            <div>

            </div>
        </section>
    )
}

export default Page