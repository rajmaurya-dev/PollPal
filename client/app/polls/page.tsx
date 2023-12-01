'use client'
import UserHeader from '@/components/ui/userHeader';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Poll from 'react-polls';
const pollStyles1 = {
    questionSeparator: true,
    questionSeparatorWidth: "question",
    questionBold: true,
    questionColor: "#ffffff",
    align: "center",
    theme: "purple"
};

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
    const handleVoteChange = (
        pollId: string,
        optionId: string,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newPolls = polls.map((poll) => {
            if (poll._id === pollId) {
                const newOptions = poll.options.map((option) => {
                    if (option._id === optionId) {
                        return { ...option, votes: Number(event.target.value) };
                    }
                    return option;
                });

                return { ...poll, options: newOptions };
            }
            return poll;
        });

        setPolls(newPolls);
    };
    const handleVote = (vote: number, pollId: string) => {
        // Implement your logic to update votes on the server
        // Update the state or send a request to your API
        console.log(`Voted for option ${vote} in poll ${pollId}`);
    };
    const customVote = async (vote: number, pollId: string) => {
        try {

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_PATH}/polls/${pollId}`,
                { answer: vote },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            // Optionally, you can handle the response here

            console.log(`Voted for option ${vote} in poll ${pollId}`);
        } catch (error) {
            console.error('Error voting:', error);
            // Handle the error if needed
        }
    };

    return (
        <div className="mx-2 md:mx-20 mt-8">
            <h1 className='text-orange-500 text-xl md:text-6xl mx-20'>Trending Polls</h1>
            <div>

                <UserHeader />
            </div>
            <ul className='flex gap-3 justify-around  flex-wrap'>
                {/* {polls.map((poll) => (
                    <li
                        key={poll._id}
                        className="bg-[#43547A] rounded-md shadow-md p-4 mb-4 w-[270px] h-[200px]"
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
                                    <li
                                        key={option._id}
                                        className="text-white mb-2 flex items-center"
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
                ))} */}
                {polls.map((poll) => (
                    <div className='min-w-[280px] min-h-[200px] rounded-md text-white bg-[#43547a6a]'>

                        <Poll
                            key={poll._id}
                            question={poll.title}
                            pollStyles={pollStyles1}
                            questionBold={true}
                            answers={poll.options.map((option) => ({
                                option: option.option,
                                votes: option.votes,
                            }))}
                            onVote={(vote) => customVote(vote, poll._id)}
                            noStorage={true}
                        />
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default AllPolls