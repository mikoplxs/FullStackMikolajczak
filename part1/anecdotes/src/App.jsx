import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]


  const [selected, setSelected] = useState(0)
  const [anecdotes_votes, setValue] = useState([1,5,3,2,1,6,4,2])
  const [anecdote_highest_text, setText] = useState(anecdotes[selected])
  const [anecdote_highest_vote, setVote] = useState(0)


  const voteClick = () => {
    const votes_copy = {...anecdotes_votes}
    votes_copy[selected] += 1
    setValue(votes_copy)

    setVote(Math.max(...anecdotes_votes))


  }
  

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <div>
        has {anecdotes_votes[selected]} votes
      </div>
      <div>
        <button onClick={() => setSelected(Math.floor(Math.random() * ((anecdotes.length - 1) + 1)))}>
          next anecdote
        </button>
        <button onClick={() => voteClick()}>
          vote
        </button>

      </div>
      <h2>Anecdote with most votes</h2>
      {anecdote_highest_text}
      {anecdote_highest_vote}
    </div>
  )
}

export default App