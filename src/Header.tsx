import React from 'react';

import type { country } from './App'

const Header = ({ streak, answer }: {streak: number, answer: country}) => {
    return (
        <div className="border-4 w-full border-green-300 flex flex-col items-center">
            <div className="text-4xl">Flagdle</div>
            <hr className="w-full border-2 bg-black"></hr>
            <div className="mx-3">Streak: {streak}</div>
            <hr className="w-full border-2 bg-black"></hr>
            <div className="cursor-pointer" onClick={(e) => alert(`This country/territory is in ${answer.Continent}`)}>Click here for a hint!</div>
        </div>
    );
};

export default Header;