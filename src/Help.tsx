import React from 'react'

interface HelpProps {
    settings: boolean;
    setSettings: React.Dispatch<React.SetStateAction<boolean>>;
};

const Help = (({ settings, setSettings }: HelpProps) => {
    return (
        <div className="flex flex-col justify-center items-center align-center border-8 border-indigo-400 w-1/3 m-auto">
            <div className="text-4xl">How to play</div>
            <hr className="w-full border-2 border-black"></hr>
        </div>
    )
});

export default Help;