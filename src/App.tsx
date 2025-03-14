import './App.css';
import React, { useSyncExternalStore, useState } from 'react';
import Message from './components/Message';
import Search from './components/Search';
import Button from './components/Submit';
import { getGender } from './utils/api'

function App() {
  const [word, setWord] = useState('');
  const [genderInfo, setGenderInfo] = useState<string | null>(null);

  const handleSearch = (input: string) => {
    setWord(input);
  }

  const handleSubmit = () => {
    getGender(word).then(response => {
      setGenderInfo(response);
      console.log(response);
    }).catch(error => {
      console.error(error);
    })
  }
  
  return (
    <div>
      <Message />
      <Search onSearch={handleSearch}/>
      <Button onClick={handleSubmit}/>
      {genderInfo && <p>{genderInfo}</p>}
    </div>
  );
}

export default App;
