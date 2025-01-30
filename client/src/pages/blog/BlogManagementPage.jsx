import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../hooks/useData';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../services/blogService';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import { toast } from 'react-toastify';

interface Theme {
  textColor: string;
  backgroundColor: string;
  primaryColor: string;
  cardBackground: string;
  borderColor: string;
  textMuted: string;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogData {
  title: string;
  content: string;
  image?: string;
}

interface StyledProps {
  theme: Theme;
}

interface BlogImageProps {
  $src?: string;
}

interface ActionButtonProps {
  $variant?: 'edit' | 'delete';
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }: StyledProps) => theme.textColor};
  margin: 0;
`;

const CreateButton = styled.button`
  background: ${({ theme }: StyledProps) => theme.primaryColor};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  i {
    font-size: 1rem;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const BlogCard = styled.div`
  background: ${({ theme }: StyledProps) => theme.cardBackground};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const BlogImage = styled.div<BlogImageProps>`
  height: 200px;
  background-size: cover;
  background-position: center;
  background-image: ${({ $src }) => $src ? `url(${$src})` : 'none'};
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogTitle = styled.h3`
  color: ${({ theme }: StyledProps) => theme.textColor};
  margin: 0 0 1rem;
  font-size: 1.2rem;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }: StyledProps) => theme.textMuted};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const BlogActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button<ActionButtonProps>`
  background: ${({ theme, $variant }: StyledProps & ActionButtonProps) =>
    $variant === 'edit'
      ? theme.primaryColor + '11'
      : $variant === 'delete'
        ? '#ff000011'
        : theme.backgroundColor};
  color: ${({ theme, $variant }: StyledProps & ActionButtonProps) =>
    $variant === 'edit' ? theme.primaryColor : $variant === 'delete' ? '#ff0000' : theme.textColor};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme, $variant }: StyledProps & ActionButtonProps) =>
      $variant === 'edit'
        ? theme.primaryColor
        : $variant === 'delete'
          ? '#ff0000'
          : theme.primaryColor};
    color: white;
  }

  i {
    font-size: 1rem;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }: StyledProps) => theme.cardBackground};
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${({ theme }: StyledProps) => theme.textColor};
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  background: ${({ theme }: StyledProps) => theme.backgroundColor};
  border: 1px solid ${({ theme }: StyledProps) => theme.borderColor};
  color: ${({ theme }: StyledProps) => theme.textColor};
  padding: 0.8rem;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }: StyledProps) => theme.primaryColor};
  }
`;

const TextArea = styled.textarea`
  background: ${({ theme }: StyledProps) => theme.backgroundColor};
  border: 1px solid ${({ theme }: StyledProps) => theme.borderColor};
  color: ${({ theme }: StyledProps) => theme.textColor};
  padding: 0.8rem;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 200px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }: StyledProps) => theme.primaryColor};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const BlogManagementPage: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const { data: blogs, loading, error, mutate } = useData('/api/blogs', () => getBlogs());

  const handleCreate = () => {
    setSelectedBlog(null);
    setIsModalOpen(true);
  };

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleDelete = async (blogId: string) => {
    try {
      await deleteBlog(blogId);
      toast.success('Blog deleted successfully');
      mutate();
    } catch (error) {
      toast.error('Failed to delete blog');
      console.error('Error deleting blog:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const blogData: BlogData = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      image: formData.get('image') as string,
    };

    try {
      if (selectedBlog) {
        await updateBlog(selectedBlog._id, blogData);
        toast.success('Blog updated successfully');
      } else {
        await createBlog(blogData);
        toast.success('Blog created successfully');
      }
      setIsModalOpen(false);
      mutate();
    } catch (error) {
      toast.error(selectedBlog ? 'Failed to update blog' : 'Failed to create blog');
      console.error('Error saving blog:', error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load blogs" />;

  return (
    <Container>
      <Header>
        <Title>Blog Management</Title>
        <CreateButton onClick={handleCreate}>
          <i className="fas fa-plus" /> Create New Blog
        </CreateButton>
      </Header>

      <BlogGrid>
        {blogs?.map((blog) => (
          <BlogCard key={blog._id}>
            <BlogImage $src={blog.image} />
            <BlogContent>
              <BlogTitle>{blog.title}</BlogTitle>
              <BlogMeta>
                <span>Created: {new Date(blog.createdAt).toLocaleDateString()}</span>
                <span>Updated: {new Date(blog.updatedAt).toLocaleDateString()}</span>
              </BlogMeta>
              <BlogActions>
                <ActionButton $variant="edit" onClick={() => handleEdit(blog)}>
                  <i className="fas fa-edit" /> Edit
                </ActionButton>
                <ActionButton $variant="delete" onClick={() => handleDelete(blog._id)}>
                  <i className="fas fa-trash-alt" /> Delete
                </ActionButton>
              </BlogActions>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  name="title"
                  defaultValue={selectedBlog?.title || ''}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Content</Label>
                <TextArea
                  name="content"
                  defaultValue={selectedBlog?.content || ''}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Image URL</Label>
                <Input
                  type="url"
                  name="image"
                  defaultValue={selectedBlog?.image || ''}
                />
              </FormGroup>
              <ButtonGroup>
                <ActionButton type="submit">
                  {selectedBlog ? 'Update' : 'Create'} Blog
                </ActionButton>
                <ActionButton type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </ActionButton>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default BlogManagementPage; 