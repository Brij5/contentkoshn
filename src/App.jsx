import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import AppRoutes from './routes';
import { store } from './store';
import { theme } from './theme';
import GlobalStyles from './styles/GlobalStyles';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
