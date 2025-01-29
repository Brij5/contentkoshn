import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import GlobalStyles from './styles/GlobalStyles';
import ServicesSection from './components/ServicesSection';

// Temporary Home component
const Home = () => (
  <div>
    <h1 style={{ textAlign: 'center', padding: '2rem' }}>Welcome to ContentKosh</h1>
    <ServicesSection />
  </div>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
