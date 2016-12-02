import React from 'react';
import Navigation from './components/navigation';
import Intro from './components/intro';
import { Row, Card,  Col } from 'react-materialize';

const App = React.createClass({
  getInitialState: function () {
    return {
      selectedFoods: [],
    };
  },
  render: function () {
    return (
      <div className='App' id="top">
		<Row>
			<Navigation/>
		</Row>
		{this.props.children}
      </div>
    );
  },
});

export default App;
