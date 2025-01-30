import React, { useState, useEffect } from 'react';
import { FiClock, FiUser, FiArrowRight } from 'react-icons/fi';
import {
  SectionContainer,
  SectionContent,
  SectionHeader,
  Title,
  Description,
  BlogGrid,
  BlogCard,
  ImageContainer,
  Content,
  BlogTitle,
  BlogMeta,
  MetaItem,
  BlogExcerpt,
  ReadMore,
  LoadMoreButton
} from './BlogsSection.styled';

const sampleBlogs = [
  {
    id: 1,
    title: 'How AI is Revolutionizing Content Creation',
    excerpt: 'Discover how artificial intelligence is transforming the way we create and manage content in the digital age.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: '5 min read',
    image: '/images/blog-1.jpg'
  },
  {
    id: 2,
    title: 'Best Practices for Content Organization',
    excerpt: 'Learn the most effective strategies for organizing and managing your content library for maximum efficiency.',
    author: 'Michael Chen',
    date: '2024-01-12',
    readTime: '4 min read',
    image: '/images/blog-2.jpg'
  },
  {
    id: 3,
    title: 'The Future of Content Management Systems',
    excerpt: 'Explore the upcoming trends and innovations that will shape the future of content management systems.',
    author: 'Emily Davis',
    date: '2024-01-10',
    readTime: '6 min read',
    image: '/images/blog-3.jpg'
  }
];

const BlogsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBlogs(sampleBlogs);
      setLoading(false);
    }, 1000);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <SectionContainer>
        <SectionContent>
          <SectionHeader>
            <Title>Loading blogs...</Title>
          </SectionHeader>
        </SectionContent>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <SectionContent>
        <SectionHeader>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Latest from Our <span>Blog</span>
          </Title>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Stay updated with our latest insights, tips, and industry trends
          </Description>
        </SectionHeader>

        <BlogGrid
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {blogs.map((blog) => (
            <BlogCard key={blog.id} variants={itemVariants}>
              <ImageContainer>
                <img src={blog.image} alt={blog.title} />
              </ImageContainer>
              <Content>
                <BlogTitle>{blog.title}</BlogTitle>
                <BlogMeta>
                  <MetaItem>
                    <FiUser />
                    {blog.author}
                  </MetaItem>
                  <MetaItem>
                    <FiClock />
                    {blog.readTime}
                  </MetaItem>
                </BlogMeta>
                <BlogExcerpt>{blog.excerpt}</BlogExcerpt>
                <ReadMore className="read-more">
                  Read More <FiArrowRight />
                </ReadMore>
              </Content>
            </BlogCard>
          ))}
        </BlogGrid>

        <LoadMoreButton
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Load More
        </LoadMoreButton>
      </SectionContent>
    </SectionContainer>
  );
};

export default BlogsSection;
