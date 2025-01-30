import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiEye, 
  FiSearch,
  FiFilter,
  FiDownload
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? `
    background: ${theme.colors.primary};
    color: white;
    border: none;
    
    &:hover {
      background: ${theme.colors.primaryDark};
    }
  `
      : `
    background: transparent;
    color: ${theme.colors.text};
    border: 1px solid ${theme.colors.border};
    
    &:hover {
      background: ${theme.colors.backgroundSecondary};
    }
  `}
`;

const Toolbar = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  
  input {
    flex: 1;
    border: none;
    background: none;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.875rem;
    
    &:focus {
      outline: none;
    }
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

const Table = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 100px;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  span {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const TableRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 100px;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const Status = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
  
  ${({ $status, theme }) => {
    switch ($status) {
      case 'published':
        return `
          background: ${theme.colors.success}20;
          color: ${theme.colors.success};
        `;
      case 'draft':
        return `
          background: ${theme.colors.warning}20;
          color: ${theme.colors.warning};
        `;
      default:
        return `
          background: ${theme.colors.error}20;
          color: ${theme.colors.error};
        `;
    }
  }}
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${({ theme, $color }) => theme.colors[$color]};
  }
`;

const ContentManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [content, setContent] = useState([]);

  useEffect(() => {
    // Simulated data - replace with actual API call
    setContent([
      {
        id: 1,
        title: 'Getting Started with React',
        author: 'John Doe',
        date: '2024-01-30',
        status: 'published'
      },
      {
        id: 2,
        title: 'Advanced TypeScript Tips',
        author: 'Jane Smith',
        date: '2024-01-29',
        status: 'draft'
      },
      {
        id: 3,
        title: 'CSS Grid Layout Guide',
        author: 'Mike Johnson',
        date: '2024-01-28',
        status: 'published'
      }
    ]);
  }, []);

  const handleCreate = () => {
    navigate('/admin/content/create');
  };

  const handleEdit = (id) => {
    navigate(`/admin/content/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/admin/content/view/${id}`);
  };

  const handleDelete = (id) => {
    // Add confirmation dialog here
    setContent(content.filter(item => item.id !== id));
    dispatch(addToast({
      type: 'success',
      message: 'Content deleted successfully'
    }));
  };

  const handleExport = () => {
    // Implement export functionality
    dispatch(addToast({
      type: 'info',
      message: 'Exporting content...'
    }));
  };

  return (
    <PageContainer>
      <Header>
        <Title>Content Management</Title>
        <ActionButtons>
          <Button onClick={handleExport}>
            <FiDownload size={16} />
            Export
          </Button>
          <Button $variant="primary" onClick={handleCreate}>
            <FiPlus size={16} />
            Create Content
          </Button>
        </ActionButtons>
      </Header>

      <Toolbar>
        <SearchInput>
          <FiSearch size={16} />
          <input
            type="text"
            placeholder="Search content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchInput>
        <Button>
          <FiFilter size={16} />
          Filter
        </Button>
      </Toolbar>

      <Table>
        <TableHeader>
          <span>Title</span>
          <span>Author</span>
          <span>Date</span>
          <span>Status</span>
          <span>Actions</span>
        </TableHeader>
        {content.map((item, index) => (
          <TableRow
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div>{item.title}</div>
            <div>{item.author}</div>
            <div>{new Date(item.date).toLocaleDateString()}</div>
            <Status $status={item.status}>{item.status}</Status>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <ActionButton
                onClick={() => handleView(item.id)}
                $color="info"
                title="View"
              >
                <FiEye size={16} />
              </ActionButton>
              <ActionButton
                onClick={() => handleEdit(item.id)}
                $color="warning"
                title="Edit"
              >
                <FiEdit2 size={16} />
              </ActionButton>
              <ActionButton
                onClick={() => handleDelete(item.id)}
                $color="error"
                title="Delete"
              >
                <FiTrash2 size={16} />
              </ActionButton>
            </div>
          </TableRow>
        ))}
      </Table>
    </PageContainer>
  );
};

export default ContentManagement; 