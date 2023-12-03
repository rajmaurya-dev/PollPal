'use client'
import UserHeader from '@/components/ui/userHeader';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import PollList from '../components/PollList';



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

interface PollListProps {
    data: Poll[];
}
const AllPolls: React.FC = () => {
    const [polls, setPolls] = useState<Poll[]>([]);
    useEffect(() => {

        const fetchPolls = async () => {
            try {
                const { data } = await axios.get<Poll[]>(
                    `${process.env.NEXT_PUBLIC_SERVER_PATH}/polls/`,
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
    }, [])


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


            setPolls((prevPolls) =>
                prevPolls.map((poll) =>
                    poll._id === updatedPoll._id ? updatedPoll : poll
                )
            );
            toast.success('Voted successfully!');
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    };
    return (
        <div style={{ backgroundImage: "url('/hero.png')" }} className="mx-2 md:mx-20 mt-8" >
            <h1 className='text-orange-500 text-xl md:text-6xl mx-20'>Trending Polls</h1>
            <div>

                <UserHeader />
            </div>
            <ul className='flex gap-3 justify-around  flex-wrap'>
                <PollList polls={polls} handleVote={handleVote} showCreator={true} />

            </ul>
        </div>
    )
}

export default AllPolls