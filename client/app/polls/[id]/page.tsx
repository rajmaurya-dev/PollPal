'use client'
import { Button } from '@/components/ui/button';
import UserHeader from '@/components/ui/userHeader';
import { useUserStore } from '@/utils/features';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
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


interface SinglePollProps {
    params: any;
}

const SinglePoll: React.FC<SinglePollProps> = ({ params }) => {
    const user = useUserStore(state => state.user)

    const pollId = params.id
    const [poll, setPoll] = useState<Poll | null>(null);

    useEffect(() => {

        const fetchPolls = async (pollId: any) => {
            try {
                const { data } = await axios.get<Poll>(
                    `${process.env.NEXT_PUBLIC_SERVER_PATH}/polls/${pollId}`,
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    },
                );
                setPoll(data);
            } catch (error: any) {
                toast.error('Failed to fetch polls. Please try again.')

            }
        };
        fetchPolls(pollId);

    }, [pollId])
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
            toast.success('Voted successfully')
            const updatedPoll = response.data;

            setPoll(updatedPoll);

        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    };

    return (
        <div className='w-full h-[80vh] flex flex-col justify-center items-center'>
            {user.id && <UserHeader />}

            {poll ? <div
                key={poll._id}
                className="bg-white bg-opacity-25 rounded-md shadow-md p-4 mb-4 md:min-w-[470px] md:max-w-[800px] min-h-[200px] pb-2 backdrop-blur-md mx-2"
            >
                <div>
                    <div className='h-[50px] my-2 py-2'>

                        <h3 className="text-xl font-semibold text-blue-500 mb-2">
                            {poll?.title}
                        </h3>
                    </div>
                    <p className="text-orange-500">
                        Created by: {poll?.user?.username}
                    </p>


                    <p className="text-blue-500 mt-2">Options:</p>
                    <ul className="list-disc pl-6 flex flex-col md:flex-row gap-2 my-5">
                        {poll?.options?.map((option) => (
                            <Button
                                key={option._id}
                                onClick={() => handleVote(poll._id, option.option, option._id)}
                                className="text-white mb-2 flex items-center justify-between bg-blue-600 py-2 px-4 rounded-md hover:bg-orange-700 h-auto min-w-[220px]"
                            >
                                <span className='capitalize font-semibold '>
                                    {option.option}
                                </span>
                                <span className='ml-1 bg-white text-black w-5 rounded-full text-center'>
                                    {option.votes}
                                </span>
                            </Button>
                        ))}
                    </ul>
                </div>

            </div> : <h1>loading</h1>}

        </div>
    )
}

export default SinglePoll