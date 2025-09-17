import { useState } from "react";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      anecdote: "If it hurts, do it more often.",
      vote: 0,
    },
    {
      anecdote: "Adding manpower to a late software project makes it later!",
      vote: 0,
    },
    {
      anecdote:
        "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      vote: 0,
    },
    {
      anecdote:
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      vote: 0,
    },
    {
      anecdote: "Premature optimization is the root of all evil.",
      vote: 0,
    },
    {
      anecdote:
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      vote: 0,
    },
    {
      anecdote:
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
      vote: 0,
    },
    {
      anecdote: "The only way to go fast, is to go well.",
      vote: 0,
    },
  ]);

  const anecdotesLength = anecdotes.length;
  const [selected, setSelected] = useState(0);

  const handleRandomSelection = () => {
    const randomSelection = Math.floor(Math.random() * anecdotesLength);
    setSelected(randomSelection);
  };

  const handleVote = () => {
    const newAnecdote = [...anecdotes];
    newAnecdote[selected].vote += 1;
    setAnecdotes(newAnecdote);
  };

  const mostVoted = anecdotes.reduce((prev, current) => {
    return (prev.vote > current.vote) ? prev : current;
  })
  
  return (
    <>  
      <h1>Anecdote of the Day</h1>
      <div>{anecdotes[selected].anecdote}</div>
      <div>has {anecdotes[selected].vote} votes</div>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleRandomSelection}>next anecdote</button>
      <br />
    <h2>Anecdote with most votes</h2>
    <div>{mostVoted.anecdote}</div>
    <div>{mostVoted.vote}</div>
    </>
  );
};

export default App;
