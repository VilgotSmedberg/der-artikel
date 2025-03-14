import React, { useState } from 'react';

interface SearchProps {
    onSearch: (word: string) => void;
}

function Search({ onSearch }: SearchProps) {
    const [input, setInput] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div>
            <input type="text" value={input} onChange={handleInputChange} placeholder='search for word' />
        </div>
    )
}

export default Search;