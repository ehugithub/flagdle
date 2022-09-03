import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { country } from './App'


interface HeaderProps {
    streak: number;
    answer: country;
    settings: boolean;
    setSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ streak, answer, settings, setSettings }: HeaderProps) => {
    const notify = () => toast(`This country/territory is in ${answer.Continent}`);

    return (
        <div className="border-4 w-full border-green-300 flex flex-col items-center">
            <div className="text-4xl">Flagdle</div>
            <hr className="w-full border-2 bg-black"></hr>
            <div className="mx-3">Streak: {streak}</div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <hr className="w-full border-2 bg-black"></hr>
            <div className="flex flex-row justify-center items-center">
                <div className="cursor-pointer rounded-full px-2 bg-indigo-400 hover:bg-indigo-500 focus:bg-indigo-600 mx-2" onClick={(e) => setSettings(!settings)}>How to play</div>
                <div className="cursor-pointer rounded-full px-2 bg-indigo-400 hover:bg-indigo-500 focus:bg-indigo-600 mx-2" onClick={notify}>Click here for a hint!</div>
            </div>
            {/* <div className="cursor-pointer" onClick={(e) => alert(`This country/territory is in ${answer.Continent}`)}>Click here for a hint!</div> */}
        </div>
    );
};

export default Header;