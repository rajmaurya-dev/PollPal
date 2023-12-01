import { Button } from '@/components/ui/button';
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
}

const PollList: React.FC<PollListProps> = ({ polls, handleVote, showCreator }) => {
    return (
        <ul className='flex gap-3 justify-around flex-wrap'>
            {polls.map((poll) => (
                <li
                    key={poll._id}
                    className="bg-white bg-opacity-25 rounded-md shadow-md p-4 mb-4 w-[270px] min-h-[200px] pb-2 backdrop-blur-md"
                >
                    <div>
                        <h3 className="text-xl font-semibold text-blue-500 mb-2">
                            {poll.title}
                        </h3>
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

            ))}
        </ul>
    );
};

export default PollList;
