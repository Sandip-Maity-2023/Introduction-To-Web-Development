import React, { Component } from "react";

// class Event extends Component{
//     constructor(props){
//         super(props);
//         this.state={
//             message:'welcome'
//         }
//     }

//     click=()=>{
//         this.setState({message:'thank you'})
//     }
//   render() {
//     return (
//       <div>
//         <h3>
//             {this.state.message}
//         </h3>
//       <button onClick={this.click}>Change</button>
//       </div>
//     );
//   }
// }
// export default Event;


import './Joke.css'

function Eventdefault() {
  const handleprevent = (e) => {
    e.preventDefault();
    console.log("clicked prevent default");
  };

  const propagation = (e) => {
    e.stopPropagation();
    console.log("clicked stop propagation");
  };

  const inside = (e) => {
    e.stopPropagation();
    console.log(" clicked inside div");
  };

  return (
    <div className="EventDefault">
      <form action="/submit" method="post">
        Type anything:
        <input />
        <button type="submit" onClick={handleprevent}>
          preventDefault();
        </button>
        <span onClick={propagation}>
          <span onClick={inside}>Inside</span>
          stopPropagation();
        </span>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Eventdefault;
