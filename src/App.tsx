import React, { useState, useEffect } from 'react';
import countries from './data.json';
import Input from './Input';
import Header from './Header';
import Guesses from './Guesses';

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
  
  const handleGuess = (e: any) => {
    e.preventDefault(); 

    if(input.toLowerCase() === biglist[id].Name.toLowerCase()) {
      handleEnd("win");
      console.log("correct");
    }
    else {
      if(guessnum !== 5) {
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
      }

      else {
        handleEnd("lose");
      }

      // setId(Math.floor((Math.random() * biglist.length)))
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
    
    setGuessNum(0);
    setGuesses(new Array(6).fill(null));
    setId(Math.floor((Math.random() * biglist.length)))
  };


  // for (const country of biglist) {
  //   let cols = country.Colours;
  //   let total = 0;
  //   for(const colinfo of cols) {
  //     total += colinfo.percent;
  //   }
  //   if(Math.abs(total - 100) >= 0.1) {
  //     console.log(country.Name);
  //     console.log(total);
  //   }
  // }

  return (
    <div className="flex flex-col justify-center items-center m-auto h-screen w-full max-width-screen-sm border-8 border-indigo-400">
      <Header
        streak={streak}
        answer={biglist[id]}
      />
      <div className="flex justify-center flex-col grow items-start overflow-y-auto border-8 border-amber-400">
        {/* <button onClick={(e) => setId(Math.floor((Math.random() * biglist.length)))}>Change flag</button> */}
        <img alt="countryFlag(trying to cheat huh?)" className="pointer-events-none border-4 border-gray-500 max-w-3xl grayscale" src={`${url}${biglist[id].Code}`}/>
        {/* <img className="border-4 border-gray-500 max-w-3xl" src={"./af.svg"}/> */}
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
          />
        </div>
      </div>
    </div>
  );
}

export default App;
export type { country, colorinfo };
