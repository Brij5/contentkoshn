import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiClock, FiUser, FiArrowRight } from 'react-icons/fi';

const Section = styled.section`
  padding: 6rem 2rem;
  background: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;

  span {
    color: #2196F3;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const BlogCard = styled(motion.article)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);

    img {
      transform: scale(1.05);
    }

    .read-more {
      color: #2196F3;
      gap: 0.75rem;
    }
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const BlogTitle = styled.h3`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 0.75rem;
  line-height: 1.4;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BlogExcerpt = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMore = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  transition: all 0.3s ease;
`;

const LoadMore = styled(motion.button)`
  background: transparent;
  color: #2196F3;
  border: 2px solid #2196F3;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin: 3rem auto 0;
  display: block;
  transition: all 0.3s ease;

  &:hover {
    background: #2196F310;
    transform: translateY(-2px);
  }
`;

const blogs = [
  {
    id: 1,
    title: 'The Future of Content Management Systems',
    excerpt: 'Explore the upcoming trends and innovations that will shape the future of content management systems.',
    author: 'Sarah Johnson',
    readTime: '5 min read',
    image: '/images/blog-1.svg'
  },
  {
    id: 2,
    title: 'Optimizing Content for Better Engagement',
    excerpt: 'Learn effective strategies to optimize your content and increase user engagement across platforms.',
    author: 'Michael Chen',
    readTime: '4 min read',
    image: '/images/blog-2.svg'
  },
  {
    id: 3,
    title: 'AI-Powered Content Creation Tools',
    excerpt: 'Discover how artificial intelligence is revolutionizing the way we create and manage content.',
    author: 'Emily Davis',
    readTime: '6 min read',
    image: '/images/blog-3.svg'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
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

const BlogsSection = () => {
  return (
    <Section>
      <Container>
        <Header>
          <Title
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Latest <span>Insights</span> & Updates
          </Title>
          <Description
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Stay informed with our latest articles, tips, and industry insights.
          </Description>
        </Header>

        <Grid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ImageContainer>
                <img src={blog.image} alt={blog.title} loading="lazy" />
              </ImageContainer>
              <Content>
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
                <BlogTitle>{blog.title}</BlogTitle>
                <BlogExcerpt>{blog.excerpt}</BlogExcerpt>
                <ReadMore className="read-more">
                  Read More <FiArrowRight />
                </ReadMore>
              </Content>
            </BlogCard>
          ))}
        </Grid>

        <LoadMore
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Load More Articles
        </LoadMore>
      </Container>
    </Section>
  );
};

export default BlogsSection;
