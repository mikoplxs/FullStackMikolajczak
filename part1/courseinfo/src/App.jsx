const Part = (props) => {
  return (
    <div>
      <p>N: {props.part} <br></br>E: {props.ex}</p>
    </div>
  )
}

const Total = (props) => {

  //const total = props.sealparts[0].exercises + props.sealparts[1].exercises + props.sealparts[2].exercises

  const exercises_seal = props.sealparts.map(ex => ex.exercises)
  const total = exercises_seal.reduce((s,p) => s+p) 


  return (
    <div>
      total: {total}

    </div>
  )

}

const Content = (props) => {
  return (
    <div>
      <Part part = {props.seal.parts[0].name} ex = {props.seal.parts[0].exercises} />
      <Part part = {props.seal.parts[1].name} ex = {props.seal.parts[1].exercises} />
      <Part part = {props.seal.parts[2].name} ex = {props.seal.parts[2].exercises} />

    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header text={props.course.name}/>
      <Content seal={props.course}/>
      <Total sealparts={props.course.parts}/>
    </div>

  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App