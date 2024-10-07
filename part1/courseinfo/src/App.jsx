const Part = (props) => {
  return (
    <div>
      <p>N: {props.part} <br></br>E: {props.ex}</p>
    </div>
  )
}


const Content = (props) => {
  return (
    <div>
      <Part part = {props.seal[0].part} ex = {props.seal[0].ex} />
      <Part part = {props.seal[1].part} ex = {props.seal[1].ex} />
      <Part part = {props.seal[2].part} ex = {props.seal[2].ex} />

    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      Total: {props.total[0].ex + props.total[1].ex + props.total[2].ex}
    </div>

  )

}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const array = [
    { part: part1, ex: exercises1},
    { part: part2, ex: exercises2},
    { part: part3, ex: exercises3},

  ]


  return (
    <div>
      <Header course={course}/>
      <Content seal = {array}/>
      <Total total = {array}/>
    </div>
  )
}

export default App