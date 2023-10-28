import React, { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    classNames?: string;
}

const Container = ({ children, classNames }: ContainerProps) => {
    return (
        <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${classNames}`}>
            {children}
        </div>
    );
};

export default Container;
