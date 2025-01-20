import { useState } from 'react'

const Title = (props) => {
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdote}<br></br>
      has {props.vote} votes
    </div>


  )
}

const Button = (props) => {  
  return (
    <button onClick={props.onclick}>{props.text}</button>

  )

}

const MostVotes = (props) => {


  return (
    <div>
          <h2>Anecdote with most votes</h2>
          {props.anecdote}<br></br>
          has {props.vote} votes
    </div>
  )
}

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
  const [anecdotes_votes, setValue] = useState([0,0,0,0,0,0,0,0])
  const [anecdote_highest_text, setText] = useState("...")
  const [anecdote_highest_vote, setVote] = useState(0)

  const voteClick = () => {
    const votes_copy = [...anecdotes_votes]
    votes_copy[selected] += 1
    const updated_votes = votes_copy
  
    setValue(updated_votes)

    const max = Math.max(...updated_votes)
    const index = updated_votes.indexOf(max)
    setVote(max)
    setText(anecdotes[index])
    console.log(anecdotes_votes)
  }
  
  return (
    <div>
      <Title anecdote={anecdotes[selected]} vote={anecdotes_votes[selected]}/>
      <Button text="next anecdote" onclick={() => setSelected(Math.floor(Math.random() * ((anecdotes.length - 1) + 1)))}/>
      <Button text="vote" onclick={() => voteClick()}/>
      <MostVotes anecdote={anecdote_highest_text} vote={anecdote_highest_vote}/>
    </div>
  )
}

export default App