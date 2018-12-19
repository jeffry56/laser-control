import React, { Component } from 'react';
import styled, {
  createGlobalStyle,
  ThemeProvider,
} from 'styled-components/macro';
import colors from './colors';
import ControlPanel from './components/ControlPanel';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={colors}>
        <AppLayout>
          <Title>Laser control panel</Title>
          <ControlPanel />
          <GlobalStyle />
        </AppLayout>
      </ThemeProvider>
    );
  }
}

const Title = styled.h1`
  text-align: center;
  font-weight: 300;
  font-size: 2.8em;
  letter-spacing: 5px;
`;
const AppLayout = styled.div`
  padding: 20px;
  min-height: 100vh;
  margin-bottom: 50px;
`;
const GlobalStyle = createGlobalStyle`
*,
*:after,
*:before {
    box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto Mono', monospace;
  font-weight: 400;
  letter-spacing: 1px;
  color: ${colors.baseTextColor};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${colors.mainBackgroundColor};

}

`;

export default App;
