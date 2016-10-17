import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TableComponent from './Table';

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <TableComponent/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
