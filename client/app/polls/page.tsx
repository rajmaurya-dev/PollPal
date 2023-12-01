'use client'
import UserHeader from '@/components/ui/userHeader';
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

        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    };
    return (
        <div className="mx-2 md:mx-20 mt-8">
            <h1 className='text-orange-500 text-xl md:text-6xl mx-20'>Trending Polls</h1>
            <div>

                <UserHeader />
            </div>
            <ul className='flex gap-3 justify-around  flex-wrap'>
                {polls.map((poll) => (
                    <li
                        key={poll._id}
                        className="bg-[#43547A] rounded-md shadow-md p-4 mb-4 w-[270px] h-[270px]"
                    >
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {poll.title}
                            </h3>
                            <p className="text-gray-900">
                                Created by: {poll.user.username}
                            </p>
                            <p className="text-gray-800 mt-2">Options:</p>
                            <ul className="list-disc pl-6">
                                {poll.options.map((option) => (
                                    <button
                                        key={option._id}
                                        onClick={() => handleVote(poll._id, option.option, option._id)}
                                        className="text-white mb-2 flex items-center bg-gray-700 py-2 px-4 rounded-md hover:cursor-pointer"
                                    >
                                        <button
                                            className="w-4 h-4 rounded-full mr-2 bg-[#4c70f4]"

                                        />
                                        {option.option} - Votes: {option.votes}
                                    </button>
                                ))}
                            </ul>

                        </div>
                    </li>
                ))}

            </ul>
        </div>
    )
}

export default AllPolls