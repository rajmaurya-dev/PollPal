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
                console.log(data)
                setPoll(data);
            } catch (error: any) {
                console.log(error.response.data.message)

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
                className="bg-white bg-opacity-25 rounded-md shadow-md p-4 mb-4 md:max-w-[470px] min-h-[200px] pb-2 backdrop-blur-md"
            >
                <div>
                    <div className='h-[50px]'>

                        <h3 className="text-xl font-semibold text-blue-500 mb-2">
                            {poll?.title}
                        </h3>
                    </div>
                    <p className="text-orange-500">
                        Created by: {poll?.user?.username}
                    </p>


                    <p className="text-blue-500 mt-2">Options:</p>
                    <ul className="list-disc pl-6 flex flex-col md:flex-row gap-2">
                        {poll?.options?.map((option) => (
                            <Button
                                key={option._id}
                                onClick={() => handleVote(poll._id, option.option, option._id)}
                                className="text-white mb-2 flex items-center bg-orange-600 py-2 px-4 rounded-md hover:bg-orange-700 hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-orange-500 w-[220px]"
                            >
                                <button
                                    className="w-4 h-4 rounded-full mr-2 bg-blue-500"
                                />
                                {option.option} - Votes: {option.votes}
                            </Button>
                        ))}
                    </ul>
                </div>

            </div> : <h1>loading</h1>}

        </div>
    )
}

export default SinglePoll