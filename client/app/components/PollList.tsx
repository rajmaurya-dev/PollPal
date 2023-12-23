import { Button } from '@/components/ui/button';
import Link from 'next/link';
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
                <div className={`${handleDelete ? `bg-green-700 bg-opacity-25 rounded-md my-2` : ''}`} key={poll._id}>


                    <li
                        key={poll._id}
                        className="bg-white bg-opacity-25 rounded-md shadow-md p-4 mb-4 w-[270px] min-h-[200px] pb-2 backdrop-blur-md"
                    >
                        <Link href={`/polls/${poll._id}`} className='w-fit inline-block absolute -right-1 -top-2 text-green-700  p-2 rounded-full opacity-25 bg-white backdrop-blur-md'  >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-600">
                                <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                            </svg>

                        </Link>
                        <div>
                            <div className='h-[50px] my-2 py-2'>

                                <h3 className="text-xl font-semibold text-blue-500 mb-2 line-clamp-2">
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


                    </li>

                    {
                        showDelete &&
                        <div className='flex justify-end'>
                            <Button onClick={() => handleDelete(poll._id)} variant='ghost' className='rounded-full text-white hover:bg-red-500 hover:text-white hover:shadow hover:shadow-red-800'>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  text-gray-900 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </Button>

                        </div>}
                </div>

            ))
            }
        </ul >
    );
};

export default PollList;
