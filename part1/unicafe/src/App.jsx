import { useState } from 'react'

const Title = () => {
  const title_text = "give feedback"


  return (
    <div>
      <h2>{title_text}</h2>
    </div>

  )

}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
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

  if (props.valuesNumbers[0] == 0 && props.valuesNumbers[1] == 0 && props.valuesNumbers[2] == 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <StatisticsLine text="good" value={props.valuesNumbers[0]}/>
      <StatisticsLine text="neutral" value={props.valuesNumbers[1]}/>
      <StatisticsLine text="bad" value={props.valuesNumbers[2]}/>

      <StatisticsLine text="all" value={props.allNumber}/>
      <StatisticsLine text="average" value={props.averageNumber}/>
      <StatisticsLine text="positive" value={props.positiveNumber}/>

    </div>

  )

}

const StatisticsLine = (props) => {

  return (
    <div>
      {props.text} {props.value}
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
  let positive_percentage = positive+"%"

  const StatisticsProps = {allNumber:all, averageNumber:average, positiveNumber:positive_percentage ,valuesNumbers:values}

  return (
    <div>
        <Title/>
        <Button text="good" onClick={() => setGood(good_value + 1)}/>
        <Button text="neutral" onClick={() => setNeutral(neutral_value + 1)}/>
        <Button text="bad" onClick={() => setBad(bad_value + 1)}/>
        <StatisticsTitle/>
        <Statistics {...StatisticsProps}/>
    </div>
  )
}

export default App