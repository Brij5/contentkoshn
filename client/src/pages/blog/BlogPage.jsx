import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useData } from '../../hooks/useData';
import { getBlog } from '../../services/blogService';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import {
  BlogContainer,
  BackButton,
  BlogHeader,
  BlogTitle,
  BlogMeta,
  MetaItem,
  BlogImage,
  BlogContent,
  ShareSection,
  ShareTitle,
  ShareButtons,
  ShareButton
} from './BlogPage.styled';

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { data: blog, loading, error } = useData(() => getBlog(id), [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!blog) {
    return <ErrorMessage message="Blog post not found" />;
  }

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this article: ${blog.title}`;

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        );
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(blog.title)}`
        );
        break;
      default:
        navigator.clipboard.writeText(url);
    }
  };

  return (
    <BlogContainer>
      <BackButton onClick={() => navigate(-1)}>
        <i className="fas fa-arrow-left"></i>
        Back to Blogs
      </BackButton>

      <BlogHeader>
        <BlogTitle>{blog.title}</BlogTitle>
        <BlogMeta>
          <MetaItem>
            <i className="far fa-calendar"></i>
            {blog.date}
          </MetaItem>
          <MetaItem>
            <i className="far fa-user"></i>
            {blog.author}
          </MetaItem>
          <MetaItem>
            <i className="far fa-clock"></i>
            {blog.readTime || '5 min read'}
          </MetaItem>
        </BlogMeta>
      </BlogHeader>

      {blog.imageUrl && <BlogImage src={blog.imageUrl} alt={blog.title} />}

      <BlogContent>{blog.content}</BlogContent>

      <ShareSection>
        <ShareTitle>Share this article</ShareTitle>
        <ShareButtons>
          <ShareButton onClick={() => handleShare('twitter')}>
            <i className="fab fa-twitter"></i>
            Twitter
          </ShareButton>
          <ShareButton onClick={() => handleShare('facebook')}>
            <i className="fab fa-facebook"></i>
            Facebook
          </ShareButton>
          <ShareButton onClick={() => handleShare('linkedin')}>
            <i className="fab fa-linkedin"></i>
            LinkedIn
          </ShareButton>
          <ShareButton onClick={() => handleShare('copy')}>
            <i className="far fa-copy"></i>
            Copy Link
          </ShareButton>
        </ShareButtons>
      </ShareSection>
    </BlogContainer>
  );
};

export default BlogPage;
