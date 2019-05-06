import React from 'react';
import logo from './logo.svg';
import './App.scss';


// class OurFirstComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       clicks: 0
//     }
//   }
//   onClick = () => {
//     this.setState({
//       clicks: this.state.clicks + 1
//     });
//   }
//   render() {
//     var content = this.props.title || "Our default title";
//     return (
//       <div class="OurFirstComponent">
//         <h1>{content}</h1>
//         <div>
//           I've been clicked {this.state.clicks} times.
//         </div>
//         <button onClick={this.onClick}>Click Me</button>
//       </div>
//     );
//   }
// }

function OurFirstComponent(props) {
  var content = props.title || "Our default title";
  const [clicks, setClicks] = React.useState(0);
  const onClick = () => {
    setClicks(clicks + 1);
  };
  return (
    <div>
      <h1>{content}</h1>
      <div>
        I've been clicked {clicks} times.
      </div>
      <button onClick={onClick}>Click Me</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <OurFirstComponent title="Our third component" />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <OurFirstComponent title="Down here too" />
      </header>
    </div>
  );
}

export default App;
