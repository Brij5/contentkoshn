const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// Get all active services (public)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const category = req.query.category;
    const search = req.query.search;

    let query = { status: 'active' };
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const services = await Service.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Service.countDocuments(query);

    res.json({
      services,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalServices: total
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get service by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ message: error.message });
  }
});

// Protected routes
router.use(protect);

// Create service (admin only)
router.post('/', authorize('admin'), upload.single('image'), async (req, res) => {
  try {
    const serviceData = req.body;
    if (req.file) {
      serviceData.imageUrl = req.file.path;
    }
    
    const service = await Service.create(serviceData);
    res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update service (admin only)
router.put('/:id', authorize('admin'), upload.single('image'), async (req, res) => {
  try {
    const serviceData = req.body;
    if (req.file) {
      serviceData.imageUrl = req.file.path;
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: serviceData },
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete service (admin only)
router.delete('/:id', authorize('admin'), async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update service status (admin only)
router.patch('/:id/status', authorize('admin'), async (req, res) => {
  try {
    const { status } = req.body;
    if (!['active', 'inactive', 'draft'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    console.error('Error updating service status:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create sample services (development only)
if (process.env.NODE_ENV !== 'production') {
  router.post('/sample', authorize('admin'), async (req, res) => {
    try {
      const sampleServices = [
        {
          title: 'Academic Writing',
          description: 'Professional academic writing services for students and researchers',
          category: 'academic',
          iconUrl: 'fa-book',
          status: 'active',
          subServices: [
            {
              title: 'Research Papers',
              description: 'High-quality research papers on any topic',
              price: 50,
              duration: '7 days'
            },
            {
              title: 'Thesis Writing',
              description: 'Comprehensive thesis writing and editing',
              price: 100,
              duration: '30 days'
            }
          ]
        },
        {
          title: 'Content Marketing',
          description: 'Strategic content marketing solutions for businesses',
          category: 'marketing',
          iconUrl: 'fa-bullhorn',
          status: 'active',
          subServices: [
            {
              title: 'Blog Posts',
              description: 'SEO-optimized blog posts and articles',
              price: 30,
              duration: '3 days'
            },
            {
              title: 'Social Media Content',
              description: 'Engaging social media content creation',
              price: 40,
              duration: '5 days'
            }
          ]
        }
      ];

      await Service.deleteMany({});
      const createdServices = await Service.create(sampleServices);

      res.status(201).json({
        message: 'Sample services created successfully',
        services: createdServices
      });
    } catch (error) {
      console.error('Error creating sample services:', error);
      res.status(500).json({ message: error.message });
    }
  });
}

module.exports = router; 