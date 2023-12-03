'use client'
import UserHeader from '@/components/ui/userHeader';
import { useUserStore } from '@/utils/features';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PollList from '../components/PollList';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
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
                console.log(error.response.data.message)

            }
        };
        fetchPolls();

    }, [refresh])
    const router = useRouter()
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
            router.refresh()
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }
    const handleVote = async (pollId: string, option: string, optionId: string) => {
        try {
            console.log(`Voted for option ${option} in poll ${pollId}`)
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_PATH}/polls/${pollId}`,
                { answer: option },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            const updatedPoll = response.data;

            // Update the state with the new poll data
            setPolls((prevPolls) =>
                prevPolls.map((poll) =>
                    poll._id === updatedPoll._id ? updatedPoll : poll
                )
            );


        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    };
    return (
        <section className='mx-2 md:mx-20 mt-8'>
            <div className='mx-20'>

                <h1 className='text-orange-500 text-xl md:text-6xl'>Polls of, <span className='text-blue-300 text-lg'>{user.username}</span> </h1>
            </div>
            <UserHeader />
            <div className='flex gap-3 justify-around  flex-wrap'>
                <PollList polls={polls} handleVote={handleVote} showDelete={true} handleDelete={handleDelete} />
            </div>
        </section>
    )
}
