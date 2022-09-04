import React, { useState, useEffect } from 'react';
import countries from './data.json';
import Input from './Input';
import Header from './Header';
import Guesses from './Guesses';
import Help from './Help';

type colorinfo = {
  colour: string,
  hex: string,
  percent: number
}

type country = {
  Code: string,
  Name: string,
  Colours: colorinfo[],
  Continent: string
};

function App() {
  const url = "https://countryflagsapi.com/svg/";
  const [input, setInput] = useState('');
  const [biglist, setBigList] = useState<country[]>(countries.countries);
  const [id, setId] = useState(Math.floor((Math.random() * 249)));
  const [streak, setStreak] = useState(0);
  const [guesses, setGuesses] = useState<country[]>(new Array(6).fill(null));
  const [guessnum, setGuessNum] = useState(0);
  const [won, setWon] = useState(0);
  const [help, setHelp] = useState(false);
  
  const handleGuess = (e: any) => {
    e.preventDefault(); 

    let found = false;
    for(let i = 0; i < biglist.length; i++) {
      if(input.toLowerCase() === biglist[i].Name.toLowerCase()) {
        found = true;
        let guesse = guesses;
        guesse[guessnum] = biglist[i];
        setGuesses(guesse);
          setGuessNum(guessnum + 1);
        break;
      }
    }
    if(!found) {
      alert("Invalid guess");
      console.log("invalid input!");
    }

    if(input.toLowerCase() === biglist[id].Name.toLowerCase()) {
      handleEnd("win");
    }
    else if(guessnum === 5) {
      handleEnd("lose");
    }
    setInput('');
  };

  const handleEnd = (word: string) => {
    if(word === "win") {
      setWon(1);
      setStreak(streak + 1);

    }
    else if(word === "lose") {
      setWon(2);
      setStreak(0);
    }
    
  };

  const handleNew = () => {
    setGuessNum(0);
    setGuesses(new Array(6).fill(null));
    setId(Math.floor((Math.random() * biglist.length)))
    setWon(0);

  };
  
  return (
    help ? 
      <Help
        settings={help}
        setSettings={setHelp}
        biglist={biglist}
      />

    :

    <>
      <div className="flex flex-col justify-center items-center m-auto h-screen w-full max-width-screen-sm border-8 border-indigo-400">
        <Header
          streak={streak}
          answer={biglist[id]}
          settings={help}
          setSettings={setHelp}
        />
        <div className="flex justify-center flex-col grow items-start overflow-y-auto border-8 border-amber-400">
          <img alt="trying to cheat huh?" className="pointer-events-none border-4 border-gray-500 max-w-3xl grayscale" src={`${url}${biglist[id].Code}`} width="800"/>
          <div className="w-full">
            {guesses.map((guess: country) => 
              <Guesses
                guess={guess}
                answer={biglist[id]}
              />
            )}
            <Input
              input={input}
              setInput={setInput}
              handleGuess={handleGuess}
              countries={biglist}
              won={won}
              handleNew={handleNew}
              answer={biglist[id]}
              guesses={guesses}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
export type { country, colorinfo };
