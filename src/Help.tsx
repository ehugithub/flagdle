import React from 'react'
import Guesses from './Guesses'

import type { country, colorinfo } from './App'

interface HelpProps {
    settings: boolean;
    setSettings: React.Dispatch<React.SetStateAction<boolean>>;
    biglist: country[];
};

const Help = (({ settings, setSettings, biglist }: HelpProps) => {
    console.log(biglist.filter((country: country) => country.Name === "Canada")[0]);


    return (
        <div className="flex flex-col justify-center align-center w-1/3 m-auto">
            <div className="text-4xl m-auto">How to play</div>
            <hr className="w-full border-2 border-black my-2"></hr>
            <div className="my-2">Guess the flag of the country / territory in six guesses or fewer.</div>
            <div className="my-2">You are given a monochrome image of a flag. With each guess, you will be provided with which colors the target country / territory's and the guess's flag have in common.</div>
            <div className="my-2">Example: suppose France's flag, a tricolor composed of red, white and blue, was shown, and the guess was Canada.</div>
            <Guesses
                answer={biglist.filter((country: country) => country.Name === "France")[0]}
                guess={biglist.filter((country: country) => country.Name === "Canada")[0]}
            />
            <div className="my-2">The green indicates that this flag contains red and white, so you're one step closer to guessing it!</div>
            <div className="my-2">Now suppose Germany was guessed. This will be the result: </div>
            <Guesses
                answer={biglist.filter((country: country) => country.Name === "France")[0]}
                guess={biglist.filter((country: country) => country.Name === "Germany")[0]}
            />
            <div className="my-2">The grey implies the the flag does not contain black nor yellow, so any country / territory whose flag contains those colors can be safely ruled out.</div>
            <div className="my-2">If you are stuck, you can click the button in the header to receive a helpful hint.</div>
            <div className="my-2">One thing to note is that some overseas territories have the same flags as their protectorate states, so be careful!</div>

            <div className="my-2">Insipired by the popular word game Wordle.</div>
            
            <button className="rounded-full bg-red-600 hover:bg-red-700 focus:bg-red-800 w-full py-1 m-auto" onClick={(e) => setSettings(!settings)}>Back</button>
        </div>
    )
});

export default Help;