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
  
export default Course