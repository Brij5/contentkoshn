import api from './api';

// Mock data for initial rendering
const mockServices = {
  services: [
    {
      _id: '1',
      title: 'Content Creation',
      description: 'Professional content creation services for your business',
      icon: '📝',
      features: ['Blog Posts', 'Articles', 'Social Media Content'],
      price: '$99/month'
    },
    {
      _id: '2',
      title: 'Content Strategy',
      description: 'Strategic content planning and distribution',
      icon: '🎯',
      features: ['Content Calendar', 'SEO Optimization', 'Analytics'],
      price: '$199/month'
    },
    {
      _id: '3',
      title: 'Content Management',
      description: 'Comprehensive content management solutions',
      icon: '⚙️',
      features: ['Content Organization', 'Version Control', 'Workflow Management'],
      price: '$299/month'
    }
  ]
};

const serviceService = {
  getActiveServices: async () => {
    try {
      // For now, return mock data
      // Later, uncomment this to use actual API
      // const response = await api.get('/services');
      // return response.data;
      return mockServices;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  getServiceById: async (id) => {
    try {
      const response = await api.get(`/services/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching service:', error);
      throw error;
    }
  }
};

export default serviceService;
