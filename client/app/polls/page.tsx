'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

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
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchPolls();
    }, [])

    return (
        <div className=" mx-20 mt-8">
            <ul className='flex gap-3 items-center justify-around flex-wrap'>
                {polls.map((poll) => (
                    <li
                        key={poll._id}
                        className="bg-white rounded-md shadow-md p-4 mb-4 w-[300px] h-[200px]"
                    >
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {poll.title}
                            </h3>
                            <p className="text-gray-600">
                                Created by: {poll.user.username}
                            </p>
                            <p className="text-gray-600 mt-2">Options:</p>
                            <ul className="list-disc pl-6">
                                {poll.options.map((option) => (
                                    <li
                                        key={option._id}
                                        className="text-gray-700 mb-2 flex items-center"
                                    >
                                        <span
                                            className="w-4 h-4 rounded-full mr-2 bg-[#F4714C]"

                                        />
                                        {option.option} - Votes: {option.votes}
                                    </li>
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