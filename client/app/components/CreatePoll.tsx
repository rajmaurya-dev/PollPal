'use client'
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MoreHorizontal, Wand } from 'lucide-react'
interface CreatePollProps { }

const CreatePoll: React.FC<CreatePollProps> = () => {
    const [topic, setTopic] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [option1, setOption1] = useState<string>('');
    const [option2, setOption2] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!title.trim() || !option1.trim() || !option2.trim()) {
                toast.error('Please provide a title and exactly two options.');
                return;
            }
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_PATH}/polls`,
                {
                    title,
                    options: [option1, option2],
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            toast.success('Poll created successfully!');
            setTitle('');
            setOption1('');
            setOption2('');
        } catch (error) {
            console.error('Error creating poll:', error);
            toast.error('Failed to create poll. Please try again.');
        }
    };

    const generateByAI = async (e: React.FormEvent) => {
        try {
            setTitle('');
            setOption1('');
            setOption2('');
            setLoading(true);
            const response = await axios.post('/api/pollbyAi', { topic })
            const responseText = response.data.aiResponse;
            const questionMatch = responseText.match(/^(.*?)poll option 1:(.*?)poll option 2:(.*)$/);

            if (questionMatch) {
                const question = questionMatch[1].trim();
                const option1 = questionMatch[2].trim();
                const option2 = questionMatch[3].trim();

                // Set state with extracted values
                setTitle(question);
                setOption1(option1);
                setOption2(option2);
                setLoading(false);
            } else {
                toast.error('Failed to get data from AI. Please try again.');
            }

        } catch (error) {
            console.error('Error creating poll:', error);
            toast.error('Failed to get data. Please try again.');
        }
    }

    return (
        <div className="bg-white bg-opacity-25 rounded-xl p-6 backdrop-blur-md shadow-md w-[400px]">
            <h2 className="text-2xl text-blue-500 mb-4">Create a Poll</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                    <span className="text-orange-500">Title:</span>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 pl-2 block w-full rounded-md bg-white outline-none bg-opacity-50 text-blue-500"
                    />
                </label>
                <label className="block">
                    <span className="text-orange-500">Option 1:</span>
                    <input
                        type="text"
                        value={option1}
                        onChange={(e) => setOption1(e.target.value)}
                        required
                        className="mt-1 pl-2 block w-full rounded-md bg-white outline-none bg-opacity-50 text-blue-500"
                    />
                </label>
                <label className="block">
                    <span className="text-orange-500">Option 2:</span>
                    <input
                        type="text"
                        value={option2}
                        onChange={(e) => setOption2(e.target.value)}
                        required
                        className="mt-1 pl-2 block w-full rounded-md bg-white outline-none bg-opacity-50 text-blue-500"
                    />
                </label>
                <div className='flex items-center gap-3'>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder='enter any topic'
                        className="mt-1 pl-2 py-2 block w-full rounded-md bg-white outline-none bg-opacity-50 text-blue-500"
                    />
                    <button onClick={generateByAI} className='py-2 px-4 rounded-md text-sm bg-gradient-to-r from-red-400 via-gray-300 to-blue-500 text-white'>
                        {loading ? <MoreHorizontal className='animate-spin' /> : <Wand />}
                    </button>
                </div>
                <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">Create Poll</button>
            </form>
        </div>

    );
};

export default CreatePoll;
