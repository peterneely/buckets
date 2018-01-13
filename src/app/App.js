import React from 'react';
// import PropTypes from 'prop-types';
import Bucket from './Bucket';
import Target from './Target';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <div>
        <Bucket id="left" />
        <Bucket id="right" />
        <Target />
      </div>
    );
  }
}

// App.propTypes = {

// };

export default App;