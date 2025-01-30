import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { Provider } from 'react-redux';
import { store } from './store';
import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from './contexts/ThemeContext'; // Use this if it's needed
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyles />
        <ThemeProvider> {/* Use ThemeProvider if it's needed */}
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;