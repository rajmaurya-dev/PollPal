import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

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
    polls: Poll[];
    handleVote: (pollId: string, option: string, optionId: string) => void;
    showCreator?: boolean;
    showDelete?: boolean;
    handleDelete?: any;
}

const PollList: React.FC<PollListProps> = ({ polls, handleVote, showCreator, showDelete, handleDelete }) => {

    return (
        <ul className='flex gap-3 justify-around flex-wrap'>
            {polls.map((poll) => (
                <li
                    key={poll._id}
                    className="bg-white bg-opacity-25 rounded-md shadow-md p-4 mb-4 w-[270px] min-h-[200px] pb-2 backdrop-blur-md"
                >
                    <div>
                        <div className='h-[50px]'>

                            <h3 className="text-xl font-semibold text-blue-500 mb-2">
                                {poll.title}
                            </h3>
                        </div>
                        {
                            showCreator && <p className="text-orange-500">
                                Created by: {poll.user.username}
                            </p>
                        }

                        <p className="text-blue-500 mt-2">Options:</p>
                        <ul className="list-disc pl-6">
                            {poll.options.map((option) => (
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
                    {
                        showDelete &&
                        <div className='flex justify-end'>
                            <Button onClick={() => handleDelete(poll._id)} variant='ghost' className='rounded-full text-white hover:bg-red-500 hover:text-white hover:shadow hover:shadow-red-800'>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </Button>

                        </div>
                    }
                </li>

            ))}
        </ul>
    );
};

export default PollList;
