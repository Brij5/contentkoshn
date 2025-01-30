import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #ffffff;
    color: #333333;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.2;
    margin: 1em 0 0.5em;
    color: #333333;
  }

  p {
    margin-bottom: 1rem;
    color: #666666;
  }

  a {
    color: #2196F3;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #1976D2;
    }
  }

  button {
    font: inherit;
    color: inherit;
    cursor: pointer;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #2196F3;
    border-radius: 4px;
  }

  /* Selection */
  ::selection {
    background: #2196F3;
    color: white;
  }

  /* Form elements */
  input, textarea, select {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.75rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background-color: white;
    color: #333333;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: #2196F3;
    }
  }

  /* Container */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* Utility classes */
  .text-center {
    text-align: center;
  }

  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }
  .mt-3 { margin-top: 1.5rem; }
  .mt-4 { margin-top: 2rem; }

  .mb-1 { margin-bottom: 0.5rem; }
  .mb-2 { margin-bottom: 1rem; }
  .mb-3 { margin-bottom: 1.5rem; }
  .mb-4 { margin-bottom: 2rem; }
`;

export default GlobalStyles;