import React from 'react';
import { useRef, useState } from 'react';
import type { country } from './App';
import Autosuggest from 'react-autosuggest';

interface InputProps {
    input: string;
    setInput: (guess: string) => void;// React.Dispatch<React.SetStateAction<string>>;
    handleGuess: any;
    countries: country[];
};

const Input = ({ input, setInput, handleGuess, countries }: InputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    return (
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
            <button className="border-3"
                    type='submit'
                    area-label='Make Guess'
                    onClick={() => {
                        if(inputRef.current !== null) {
                            inputRef.current.focus()
                        }
                    }}
                >Guess</button>
        </form>
        // <form className='guessForm' onSubmit={handleGuess}>
        //     <label htmlFor='guessForm'>Guess here</label>
        //     <input
        //         autoFocus
        //         ref={ inputRef }
        //         type='text'
        //         list='countries'
        //         placeholder='Guess a country, territory...'
        //         value={input}
        //         onChange={(e) => setInput(e.target.value)}
        //         required
        //     />
        //     <datalist id='countries'>
        //         <option>America</option>
        //         <option>America2</option>
        //         <option>America3</option>

        //     </datalist>
        //     <button
        //         type='submit'
        //         area-label='Make Guess'
        //         onClick={() => {
        //             if(inputRef.current !== null) {
        //                 inputRef.current.focus()
        //             }
        //         }}
        //     >Guess</button>

        // </form>
    );
};

export default Input;