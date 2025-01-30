import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const BlogContainer = styled.article`
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease-out;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.primaryColor};
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryColor}11;
  }

  i {
    font-size: 1.2rem;
  }
`;

export const BlogHeader = styled.header`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

export const BlogTitle = styled.h1`
  color: ${({ theme }) => theme.textColor};
  font-size: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.3;
`;

export const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  color: ${({ theme }) => theme.textColor}99;
  font-size: 0.9rem;
`;

export const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  i {
    color: ${({ theme }) => theme.primaryColor};
  }
`;

export const BlogImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

export const BlogContent = styled.div`
  color: ${({ theme }) => theme.textColor};
  line-height: 1.8;
  font-size: 1.1rem;

  p {
    margin-bottom: 1.5rem;
  }

  h2 {
    color: ${({ theme }) => theme.primaryColor};
    font-size: 1.8rem;
    margin: 2rem 0 1rem;
  }

  ul,
  ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.primaryColor};
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: ${({ theme }) => theme.textColor}cc;
  }
`;

export const ShareSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

export const ShareTitle = styled.h3`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

export const ShareButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ShareButton = styled.button`
  background: ${({ theme }) => theme.primaryColor}11;
  color: ${({ theme }) => theme.primaryColor};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryColor};
    color: white;
  }

  i {
    font-size: 1.2rem;
  }
`;