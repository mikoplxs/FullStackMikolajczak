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
        good {props.valuesNumbers[0]}
      </div>
      <div>
        neutral {props.valuesNumbers[1]}
      </div>
      <div>
        bad {props.valuesNumbers[2]}
      </div>

      <div>
        {props.allNumber}
      </div>
      <div>
        {props.averageNumber}
      </div>
      <div>
        {props.positiveNumber}%
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

  let all = good_value+neutral_value+bad_value
  let average = 1*good_value + 0*neutral_value + -1*bad_value
  let positive = (good_value / all) * 100

  const StatisticsProps = {allNumber:all, averageNumber:average, positiveNumber:positive ,valuesNumbers:values}

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
        <Statistics {...StatisticsProps}/>
    </div>
  )
}

export default App