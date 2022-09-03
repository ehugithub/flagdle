import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import type { country } from './App';
import Autosuggest from 'react-autosuggest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface InputProps {
    input: string;
    setInput: (guess: string) => void;
    handleGuess: any;
    countries: country[];
    won: number;
    handleNew: () => void;
    answer: country;
    guesses: country[];
};

const Input = ({ input, setInput, handleGuess, countries, won, handleNew, answer, guesses}: InputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const notify = (text: string) => toast(text);

    useEffect(() => {
        if(won === 2) {
            notify(`${answer.Name}`);
        }
        else if(won === 1) {
            notify("Congratulations!")
        }
    }, [guesses, won, answer.Name])

    return (
        (won > 0) ?
        <>
            <div className='text-center w-full rounded-full cursor-pointer bg-green-500 hover:bg-green-600 focus:bg-green-700'
                onClick={handleNew}
            >Play Again!</div>
            
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
        </>

        :

        <>
            <form onSubmit={handleGuess}>
                <Autosuggest
                    theme = {{ suggestionHighlighted: "font-bold" }}
                    shouldRenderSuggestions = {() => true}
                    highlightFirstSuggestion = {true}
                    suggestions = { suggestions }
                    onSuggestionsFetchRequested = {
                        ({ value }) => {
                            setSuggestions(countries.map((country => country.Name))
                            .filter((name) => name.toLowerCase().includes(value.toLowerCase())))
                        }
                    }
                    onSuggestionsClearRequested = {() => setSuggestions([])}
                    getSuggestionValue = {(suggestion) => suggestion}
                    renderSuggestion = {(suggestion) => (
                        <div className="m-0.5 bg-white p-1 cursor-pointer">
                            {suggestion}
                        </div>
                    )}
                    inputProps = {{
                        ref: inputRef,
                        className: "w-full p-1 ",
                        type: 'text',
                        placeholder: 'Guess a country, territory...',
                        value: input,
                        onChange: (event, { newValue }) => setInput(newValue),
                    }}
                    containerProps = {{
                        className: "border-2 rounded flex-auto relative",
                    }}
                    renderSuggestionsContainer = {({ containerProps, children, query }) => (
                        <div
                            {...containerProps}
                            className={`${containerProps.className} rounded absolute bottom-full bg-gray-300 mb-1 divide-x-2 max-h-52 overflow-auto w-full`}>
                                {children}
                        </div>
                    )}
                />
                <button className="w-full rounded-full bg-green-500 hover:bg-green-600 focus:bg-green-700"
                        type='submit'
                        area-label='Make Guess'
                        onClick={() => {
                            if(inputRef.current !== null) {
                                inputRef.current.focus()
                            }
                        }}
                    >Guess</button>
            </form>
        </>
    );
};

export default Input;