import React from 'react'
import type { country, colorinfo } from './App'

interface GuessesProps {
    guess: country,
    answer: country
}

const Guesses = ({ guess, answer }: GuessesProps) => {
    return (
        <div className="flex justify-start border-2 border-yellow-300 bg-slate-300 my-1">
            { (guess === null) ?
                <>
                    <div>Not guessed yet!</div>
                </> :
                <div className="w-full flex justify-start"> 
                    <div className="border border-red-500 w-1/4">Guess:{guess.Code}</div>
                    <div className="flex justify-around border border-green-500 w-3/4">
                        {guess.Colours.map((color: colorinfo) =>
                            <div className="flex h-full border border-amber-700 w-1/6" style={{backgroundColor: `${(answer.Colours.filter((anscolor: colorinfo) => anscolor.colour === color.colour)).length > 0 ? "#29b007" : "#4e4f4d"}`}}>
                                <div className="my-0.5 h-5 w-5 border-2 border-blue-200" style={{backgroundColor: `${color.hex}`}}></div>
                                <div>%{color.percent.toFixed(1)}</div>
                            </div>
                            )
                        }
                    </div>
                </div>}
        </div>
    );
}

export default Guesses;