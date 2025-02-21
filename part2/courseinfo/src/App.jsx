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
        {props.seal.map(seal => [
          <Header course={seal.name}/>,
          <Content course={seal.parts}/>,
          <Total course={seal.parts}/>]
        )}
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

  const total = props.course.reduce((acc,item) => acc+item.exercises, 0,)

  return (
    <div>
      Total: {total}
    </div>

  )

}

const App = () => {
  const course = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]  

  return (
    <div>
      <Course seal={course}></Course>
    </div>
  )
}

export default App