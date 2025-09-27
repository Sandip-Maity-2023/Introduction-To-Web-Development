import React from 'react'
import ReactDOM from 'react-dom'

class Test extends React.Component{
    constructor(probs){
        super(probs);
        this.state={hello:'world'};
    }
    componentDidMount(){
        console.log('componentDidMount()');
    }
    changeState(){
        this.setState({hello:'Geek!'});
    }
    render(){
        return (
            <div>
                <h1>
                    Geeks.org,hello {this.state.hello}
                </h1>
                <h2>
                    <a onClick={this.changeState.bind(this)}>Press Here</a>
                </h2>
            </div>
        );
    }
    shouldComponentUpdate(nextProbs,nextState){
        console.log('shouldComponentUpdate()');
        return true;
    }
    componentDidUpdate(){
        console.log(this.componentDidUpdate());
        return true;
    }
}

const root=ReactDOM.createRoot(
    document.getElementById('root')
);
root.render(<Test/>);