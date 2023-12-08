'use client'
import Link from 'next/link';
import { useUserStore } from '@/utils/features';
import axios from 'axios';
import { Button } from './button';
import { redirect } from 'next/navigation'

const Navbar: React.FC = () => {
    const user = useUserStore(state => state.user)
    const { setUser } = useUserStore.getState()

    const logoutHandler = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_PATH}/auth/logout`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            setUser(data)
            redirect('/auth')
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    return (
        <nav className="">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/">

                            <img className="h-16 w-auto" src="/logo.png" alt="Logo" />

                        </Link>
                    </div>
                    <div className="flex items-center">
                        {
                            user.id ? <Button variant={'ghost'} onClick={logoutHandler} className='text-red-500 hover:text-gray-300 hover:bg-red-500 px-3 py-2 rounded-md text-sm font-medium'>
                                Logout
                            </Button> : <Link href="/auth" className='text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium'>
                                Signin </Link>
                        }

                        {user.id &&

                            <Link href="/dashboard" className='text-[#F4714C] hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium'>
                                Dashboard
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
