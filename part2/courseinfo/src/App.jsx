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
      {props.course.map(part => 
        <Part key={part.id} part={part.name} ex={part.exercises}/>
      )}
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
        <Header course={props.seal.name} />
        <Content course={props.seal.parts}/>

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

// const Total = (props) => {
//   return (
//     <div>
//       Total: {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}
//     </div>

//   )

// }

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
      },
      
    ]
  }

  return (
    <div>
      <Course seal={course}></Course>
    </div>
  )
}

export default App