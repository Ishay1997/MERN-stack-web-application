import { useEffect, useState } from 'react';
import './App.css';
import {Outlet, Link } from 'react-router-dom';
import { deleteDeck } from './api/deleteDeck';
import { getDecks, TDeck } from './api/getDecks';
import { createDeck } from './api/createDeck';

function App() {
  // Using the useState hook to manage the 'title' state
  const [title, setTitle] = useState('');
  const [decks, setDecks] = useState<TDeck[]>([]);
  async function handleCreateDeck(e:React.FormEvent){
  e.preventDefault();
  const deck = await createDeck(title);
  setDecks([...decks, deck])
  setTitle("");
}
async function handleDeleteDeck(deckId:string){
  await deleteDeck(deckId);
  setDecks(decks.filter((deck)=>deck._id !==deckId));
}
useEffect(()=>{
  async function fetchDecks(){
    const newDecks = await getDecks();
    setDecks(newDecks);
  }
  fetchDecks();
  }, []);

  return (
    <div className="App">
      <ul className='decks'>
        {decks.map((deck)=>(
              <li key={deck._id}>
                <button onClick={()=>handleDeleteDeck(deck._id)}>X
                  </button>
                  <Link to={`decks/${deck._id}`}>{deck.title}</Link>
              </li>
            ))}
        </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input
          id="deck-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button>Create Deck</button>
      </form>
      {/* Displaying the current value of 'title' */}
      <p>Current Title: {title}</p>
    </div>
  );
}

export default App;
