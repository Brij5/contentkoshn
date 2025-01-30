import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiSearch, FiX } from 'react-icons/fi';
import { useDebounce } from '../../hooks/useDebounce';
import { searchContent } from '../../services/api';

const SearchContainer = styled.div`
  position: relative;
  width: 300px;

  @media (max-width: 768px) {
    width: auto;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.inputBackground};
  border: 2px solid ${({ theme, $focused }) => 
    $focused ? theme.primaryColor : theme.borderColor};
  border-radius: 8px;
  padding: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primaryColor}80;
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    right: 0;
    width: ${({ $expanded }) => ($expanded ? '300px' : '40px')};
    overflow: hidden;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  padding: 0 0.5rem;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.875rem;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.textColorLight};
  }

  @media (max-width: 768px) {
    display: ${({ $expanded }) => ($expanded ? 'block' : 'none')};
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColorLight};
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
  }
`;

const ResultsDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  background: ${({ theme }) => theme.dropdownBackground};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
`;

const ResultItem = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryColor}10;
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  }
`;

const ResultIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: ${({ theme }) => theme.primaryColor}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primaryColor};
`;

const ResultContent = styled.div`
  flex: 1;
`;

const ResultTitle = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 0.25rem;
`;

const ResultDescription = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textColorLight};
`;

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFocused(false);
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await searchContent(debouncedQuery);
        setResults(response.data);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleInputFocus = () => {
    setFocused(true);
    setExpanded(true);
  };

  const handleSearchClick = () => {
    if (!expanded) {
      setExpanded(true);
    }
  };

  const handleClearClick = () => {
    setQuery('');
    setResults([]);
  };

  const handleResultClick = (result) => {
    setQuery('');
    setResults([]);
    setFocused(false);
    setExpanded(false);
    navigate(`/${result.type}/${result.slug}`);
  };

  return (
    <SearchContainer ref={searchRef}>
      <SearchWrapper $focused={focused} $expanded={expanded}>
        <IconButton onClick={handleSearchClick}>
          <FiSearch size={18} />
        </IconButton>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
          $expanded={expanded}
        />
        {query && expanded && (
          <IconButton onClick={handleClearClick}>
            <FiX size={18} />
          </IconButton>
        )}
      </SearchWrapper>

      {focused && results.length > 0 && (
        <ResultsDropdown>
          {results.map((result) => (
            <ResultItem
              key={result.id}
              onClick={() => handleResultClick(result)}
            >
              <ResultIcon>
                <FiSearch size={16} />
              </ResultIcon>
              <ResultContent>
                <ResultTitle>{result.title}</ResultTitle>
                <ResultDescription>{result.description}</ResultDescription>
              </ResultContent>
            </ResultItem>
          ))}
        </ResultsDropdown>
      )}
    </SearchContainer>
  );
};

export default SearchBar; 