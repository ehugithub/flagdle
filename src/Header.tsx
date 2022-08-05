import React from 'react';

const Header = ({ streak }: {streak: number}) => {
    return (
        <header>
            <div className="text-4xl"
            >
                Flagdle</div>
            <hr></hr>
            <div>Streak: {streak}</div>
        </header>
    );
};

export default Header;