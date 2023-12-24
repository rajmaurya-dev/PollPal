'use client'
import UserHeader from '@/components/ui/userHeader';
import { useUserStore } from '@/utils/features';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PollList from '../components/PollList';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface Option {
    _id: string;
    option: string;
    votes: number;
}

interface User {
    _id: string;
    username: string;
}

interface Poll {
    _id: string;
    user: User;
    title: string;
    options: Option[];
}
export default function Page() {

    const user = useUserStore(state => state.user)
    const [refresh, setRefresh] = useState(false);
    const [polls, setPolls] = useState<Poll[]>([]);
    useEffect(() => {

        const fetchPolls = async () => {
            try {
                const { data } = await axios.get<Poll[]>(
                    `${process.env.NEXT_PUBLIC_SERVER_PATH}/polls/user`,
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    },
                );
                setPolls(data);
            } catch (error: any) {
                toast.error('Failed to fetch polls. Please try again.')

            }
        };
        fetchPolls();

    }, [refresh])

    const handleDelete = async (pollId: any) => {
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_SERVER_PATH}/polls/${pollId}`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                },
            );

            toast.success('Poll deleted successfully')
            setRefresh(!refresh);

        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }
    const handleVote = async (pollId: string, option: string, optionId: string) => {
        try {

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_PATH}/polls/${pollId}`,
                { answer: option },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            const updatedPoll = response.data;
            setPolls((prevPolls) =>
                prevPolls.map((poll) =>
                    poll._id === updatedPoll._id ? updatedPoll : poll
                )
            );


        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    };
    if (!user.id) return redirect("/auth");

    return (
        <section className='mx-2 md:mx-20 mt-8'>
            <div className='mx-20'>

                <h1 className='text-orange-500 text-xl md:text-6xl'>Polls of, <span className='text-blue-500 text-lg'>{user.username}</span> </h1>
            </div>
            <UserHeader />
            <div className='flex gap-3 justify-around  flex-wrap'>
                {polls.length === 0 && <div className=''>
                    <h1 className='text-gray-500 text-xl md:text-6xl'>no polls yet</h1>
                    <Link className='text-blue-600 mt-3 flex items-center ' href={'/dashboard'}>create one <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    </span> </Link>
                </div>}
                <PollList polls={polls} handleVote={handleVote} showDelete={true} handleDelete={handleDelete} />
            </div>
        </section>
    )
}
