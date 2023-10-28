import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
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
                        <Link href="/signin" className='text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium'>
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
