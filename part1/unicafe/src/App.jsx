import { useState } from 'react'

const Title = () => {
  const title_text = "give feedback"


  return (
    <div>
      <h2>{title_text}</h2>
    </div>

  )

}

const StatisticsTitle = () => {
  const title_text = "statistics"

  return (
    <div>
      <h2>{title_text}</h2>
    </div>
  )
}

const Statistics = (props) => {

  return (
    <div>
      <div>
        good {props.counter[0]}
      </div>
      <div>
        neutral {props.counter[1]}
      </div>
      <div>
        bad {props.counter[2]}
      </div>
    </div>

  )

}

const App = () => {
  // save clicks of each button to its own state

  const [good_value, setGood] = useState(0)
  const [neutral_value, setNeutral] = useState(0)
  const [bad_value, setBad] = useState(0)
  
  const values = [good_value, neutral_value, bad_value]

  return (
    <div>
        <Title/>
        <div>
          <button onClick={() => setGood(good_value + 1)}>
            good
          </button>
          <button onClick={() => setNeutral(neutral_value + 1)}>
            neutral
          </button>
          <button onClick={() => setBad(bad_value + 1)}>
            bad
          </button>
        </div>

        <StatisticsTitle/>
        <Statistics counter={values}/>
    </div>
  )
}

export default App