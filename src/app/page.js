"use client";
import { useEffect, useState } from 'react';
import './style.css'

export default function Home() {
  const [result, setResult] = useState([]);
  const [win, setWin] = useState(false);
  const searchWord = (event) => {
    event.preventDefault()
    const input = event.target[0];

    lookForWordTheDay(input.value.toUpperCase());
    input.value = ''
  }

  const getOccurrence = (array, value) => {
    var count = 0;
    array.forEach((v) => (v.status === value && count++));
    return count;
}

  const lookForWordTheDay = (name) => {
    const wordTheDay = 'sorte'.toUpperCase();
    const splited = wordTheDay.split('');
    const selectedSplited = name.split('');
    const list = []

    selectedSplited.forEach(letter => {
      if(selectedSplited.indexOf(letter) === splited.indexOf(letter) ){
        const item = { letter, status: 'corret'}
        return list.push(item);
      }

      if(splited.includes(letter)) {
        const item = { letter, status: 'maybe'}
        return list.push(item);
      }
      const item = { letter, status: 'error'}
      return list.push(item);
    });
    const occurency = getOccurrence(list, 'corret');
    if(occurency === 5) {
      setWin(true);
    }
    let item = result;
    item.push(list);
    setResult(null)
    setResult([...item]);
  }
  useEffect(() => {
    console.log('Loging')
  },[result])
  return (
    <div className="container">
      <form onSubmit={searchWord}>
        <div>
          <input placeholder="Palavra" maxLength={5} minLength={5}/>
        </div>
      </form>
      {win && (<h1>🎉 Você ganhou essa bagaça!!!! 🎉</h1>)}
      <ul>
      {result?.map((item) => (
        <li key={Math.random()}>
          {
            item?.map((letters) => (
              <p key={Math.random()} className={letters.status}>{letters.letter}</p>
            ))
          }
        </li>
      ))}
      </ul>
    </div>
  );
}
