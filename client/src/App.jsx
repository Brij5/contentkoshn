import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { store, persistor } from './store';
import { useSelector } from 'react-redux';
import { selectTheme } from './store/slices/themeSlice';
import { lightTheme, darkTheme } from './theme';
import AppRoutes from './routes';
import GlobalStyles from './styles/GlobalStyles';
import 'react-toastify/dist/ReactToastify.css';

const AppContent = () => {
  const theme = useSelector(selectTheme);
  const currentTheme = theme.mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme.mode}
      />
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;