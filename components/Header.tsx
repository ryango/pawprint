
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center p-4 md:p-6 border-b border-slate-700">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Pet Pic Party
            </h1>
            <p className="mt-2 text-lg text-slate-400 max-w-2xl mx-auto">
                Upload your pet's photo and let AI create hilarious new versions!
            </p>
        </header>
    );
};

export default Header;
