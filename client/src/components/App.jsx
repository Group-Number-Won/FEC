import React from 'react';
import axios from 'axios';
import Overview from './overview/Overview.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      holder: ''
    }
  }

  render() {
    return (
      <div>
        <h1>Holder</h1>
        <Overview className='overview' />
      </div>
    );
  }
};


export default App;