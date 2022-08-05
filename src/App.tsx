import React, { useState, useEffect } from 'react';
import countries from './data.json';
import Input from './Input';
import Header from './Header';
import { isValidInputTimeValue } from '@testing-library/user-event/dist/utils';

type country = {
  Code: string,
  Name: string
};

function App() {
  const url = "https://countryflagsapi.com/svg/";
  const [input, setInput] = useState('');
  const [biglist, setBigList] = useState<country[]>(countries.countries);
  const [id, setId] = useState(Math.floor((Math.random() * 249)));
  const [streak, setStreak] = useState(0);

  const handleGuess = (e: any) => {
    e.preventDefault();

    

    if(input.toLowerCase() === biglist[id].Name.toLowerCase()) {
      setStreak(streak + 1);
      setId(Math.floor((Math.random() * biglist.length)))
      console.log("correct");
    }
    else {
      setStreak(0);
      // setId(Math.floor((Math.random() * biglist.length)))
      console.log("incorrect");
    }
    setInput('');
  };

  return (
    <div className="flex flex-col justify-center items-center m-auto h-screen w-full max-width-screen-sm">
      <Header streak={streak}/>
      <div className="flex justify-center flex-col grow items-start overflow-y-auto">
        <button onClick={(e) => setId(Math.floor((Math.random() * biglist.length)))}>Change flag</button>
        <img className="border-4 border-gray-500 max-w-3xl " src={`${url}${biglist[id].Code}`}/>
        {/* <img className="border-4 border-gray-500 max-w-3xl" src={"./af.svg"}/> */}
        <div className="w-full">
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
export type { country };
