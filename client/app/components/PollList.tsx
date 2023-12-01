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
}

const PollList: React.FC<PollListProps> = ({ polls, handleVote }) => {
    return (
        <ul className='flex gap-3 justify-around flex-wrap'>
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
    );
};

export default PollList;
