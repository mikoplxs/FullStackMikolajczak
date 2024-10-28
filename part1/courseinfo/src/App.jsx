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
      <Part part = {props.seal[0].name} ex = {props.seal[0].exercises} />
      <Part part = {props.seal[1].name} ex = {props.seal[1].exercises} />
      <Part part = {props.seal[2].name} ex = {props.seal[2].exercises} />

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
      Total: {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}
    </div>

  )

}

const App = () => {
  const course = 'Half Stack application development'

  const parts = [
    {
      name:  'Fundamentals of React',
      exercises: 10   
    },
    {
      name:  'Using props to pass data',
      exercises: 7   
    },
    {
      name:  'State of a component',
      exercises: 14   
    }
  ]  

  return (
    <div>
      <Header course={course}/>
      <Content seal = {parts}/>
      <Total total = {parts}/>
    </div>
  )
}

export default App