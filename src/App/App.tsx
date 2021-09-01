import Calendar from '../Calendar/Calendar';
import './App.css';
import { BrowserRouter as Router, NavLink, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components'

import { Colors } from './colors';
import Parser from '../Parser/Parser';
import { useState } from 'react';
import { IAppState } from './app-state.interface';

const StyledNavLink = styled(NavLink)`
  padding: 5px;
`;


const App = () => {
  const [appState, setAppState] = useState<IAppState>({
    files: [],
    calendarMessages: [],
    calendarCalls: [],
  });
  return (
    <Router>
      <div className="App">
        <nav>
          <StyledNavLink
            to="/parser"
            style={{ color: 'blueviolet' }}
            activeStyle={{ color: 'blueviolet', fontWeight: 'bold' }}
          >
            Parser
          </StyledNavLink>
          <StyledNavLink
            to="/messages-by-day"
            style={{ color: 'green' }}
            activeStyle={{ color: 'green', fontWeight: 'bold' }}
          >
            Messages
          </StyledNavLink>
          <StyledNavLink
            to="/call-minutes-by-day"
            style={{ color: 'blue' }}
            activeStyle={{ color: 'blue', fontWeight: 'bold' }}
          >
            Calls
          </StyledNavLink>
        </nav>

        <Switch>
          <Route path="/parser">
            <Parser appState={appState} setAppState={setAppState} />
          </Route>
          <Route path="/messages-by-day">
            <Calendar data={appState?.calendarMessages} colors={Colors.greens} />
          </Route>
          <Route path="/call-minutes-by-day">
            <Calendar data={appState?.calendarCalls} colors={Colors.blues} />
          </Route>
          <Route path="/">
            <Redirect to="/messages-by-day" />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
  ;

export default App;
