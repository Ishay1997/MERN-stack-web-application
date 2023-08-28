import { useEffect, useState } from 'react';
import './App.css';
import {Outlet, Link } from 'react-router-dom';
type TDeck={
  title:string;
  _id:string;
};
function App() {
  // Using the useState hook to manage the 'title' state
  const [title, setTitle] = useState('');
  const [decks, setDecks] = useState<TDeck[]>([]);
async function handleCreateDeck(e:React.FormEvent){
  e.preventDefault();
  const response = await fetch('http://localhost:5000/decks',{
    method:'POST',
    body:JSON.stringify({
      title,
    }),
    headers: {
      "Content-Type":"application/json",
    },
  });
  const deck = await response.json();
  setDecks([...decks, deck])
  setTitle("");
}
async function handleDeleteDeck(deckId:string){
  await fetch(`http://localhost:5000/decks/${deckId}`,{
    method:'DELETE',
  });
  setDecks(decks.filter((deck)=>deck._id !==deckId));
}
useEffect(()=>{
  async function fetchDecks(){
    const response = await fetch("http://localhost:5000/decks");
    const newDecks = await response.json();
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
                  {deck.title}
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
