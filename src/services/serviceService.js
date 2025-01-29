import ApiService from './apiService';

class ServiceService extends ApiService {
  constructor() {
    super('/services');
  }

  async getActiveServices(params = {}) {
    try {
      const response = await this.getAll({ ...params, status: 'active' });
      return response.data;
    } catch (error) {
      console.error('Error fetching active services:', error);
      throw new Error('Failed to fetch active services');
    }
  }

  async getInactiveServices(params = {}) {
    try {
      const response = await this.getAll({ ...params, status: 'inactive' });
      return response.data;
    } catch (error) {
      console.error('Error fetching inactive services:', error);
      throw new Error('Failed to fetch inactive services');
    }
  }

  async getBySlug(slug) {
    try {
      const response = await this.axiosInstance.get(`${this.resourcePath}/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching service by slug:', error);
      throw new Error('Failed to fetch service by slug');
    }
  }

  async getByCategory(category, params = {}) {
    try {
      const response = await this.getAll({ ...params, category });
      return response.data;
    } catch (error) {
      console.error('Error fetching services by category:', error);
      throw new Error('Failed to fetch services by category');
    }
  }

  async getFeatured(params = {}) {
    try {
      const response = await this.getAll({ ...params, featured: true });
      return response.data;
    } catch (error) {
      console.error('Error fetching featured services:', error);
      throw new Error('Failed to fetch featured services');
    }
  }

  async getPopular(params = {}) {
    try {
      const response = await this.getAll({ ...params, sort: '-popularity' });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular services:', error);
      throw new Error('Failed to fetch popular services');
    }
  }

  async activate(id) {
    try {
      const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/activate`);
      return response.data;
    } catch (error) {
      console.error('Error activating service:', error);
      throw new Error('Failed to activate service');
    }
  }

  async deactivate(id) {
    try {
      const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/deactivate`);
      return response.data;
    } catch (error) {
      console.error('Error deactivating service:', error);
      throw new Error('Failed to deactivate service');
    }
  }

  async feature(id) {
    try {
      const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/feature`);
      return response.data;
    } catch (error) {
      console.error('Error featuring service:', error);
      throw new Error('Failed to feature service');
    }
  }

  async unfeature(id) {
    try {
      const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/unfeature`);
      return response.data;
    } catch (error) {
      console.error('Error unfeaturing service:', error);
      throw new Error('Failed to unfeature service');
    }
  }

  async addSubService(serviceId, data) {
    try {
      const response = await this.axiosInstance.post(`${this.resourcePath}/${serviceId}/sub-services`, data);
      return response.data;
    } catch (error) {
      console.error('Error adding sub-service:', error);
      throw new Error('Failed to add sub-service');
    }
  }

  async updateSubService(serviceId, subServiceId, data) {
    try {
      const response = await this.axiosInstance.patch(
        `${this.resourcePath}/${serviceId}/sub-services/${subServiceId}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error updating sub-service:', error);
      throw new Error('Failed to update sub-service');
    }
  }

  async deleteSubService(serviceId, subServiceId) {
    try {
      const response = await this.axiosInstance.delete(
        `${this.resourcePath}/${serviceId}/sub-services/${subServiceId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting sub-service:', error);
      throw new Error('Failed to delete sub-service');
    }
  }

  async getSubServices(serviceId, params = {}) {
    try {
      const response = await this.axiosInstance.get(`${this.resourcePath}/${serviceId}/sub-services`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching sub-services:', error);
      throw new Error('Failed to fetch sub-services');
    }
  }

  async addPricing(serviceId, data) {
    try {
      const response = await this.axiosInstance.post(`${this.resourcePath}/${serviceId}/pricing`, data);
      return response.data;
    } catch (error) {
      console.error('Error adding pricing:', error);
      throw new Error('Failed to add pricing');
    }
  }

  async updatePricing(serviceId, pricingId, data) {
    try {
      const response = await this.axiosInstance.patch(
        `${this.resourcePath}/${serviceId}/pricing/${pricingId}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error updating pricing:', error);
      throw new Error('Failed to update pricing');
    }
  }

  async deletePricing(serviceId, pricingId) {
    try {
      const response = await this.axiosInstance.delete(
        `${this.resourcePath}/${serviceId}/pricing/${pricingId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting pricing:', error);
      throw new Error('Failed to delete pricing');
    }
  }

  async getPricing(serviceId, params = {}) {
    try {
      const response = await this.axiosInstance.get(`${this.resourcePath}/${serviceId}/pricing`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching pricing:', error);
      throw new Error('Failed to fetch pricing');
    }
  }

  async addFAQ(serviceId, data) {
    try {
      const response = await this.axiosInstance.post(`${this.resourcePath}/${serviceId}/faqs`, data);
      return response.data;
    } catch (error) {
      console.error('Error adding FAQ:', error);
      throw new Error('Failed to add FAQ');
    }
  }

  async updateFAQ(serviceId, faqId, data) {
    try {
      const response = await this.axiosInstance.patch(
        `${this.resourcePath}/${serviceId}/faqs/${faqId}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error updating FAQ:', error);
      throw new Error('Failed to update FAQ');
    }
  }

  async deleteFAQ(serviceId, faqId) {
    try {
      const response = await this.axiosInstance.delete(
        `${this.resourcePath}/${serviceId}/faqs/${faqId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      throw new Error('Failed to delete FAQ');
    }
  }

  async getFAQs(serviceId, params = {}) {
    try {
      const response = await this.axiosInstance.get(`${this.resourcePath}/${serviceId}/faqs`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      throw new Error('Failed to fetch FAQs');
    }
  }

  async getCategories() {
    try {
      const response = await this.axiosInstance.get(`${this.resourcePath}/categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  }

  async getStats() {
    try {
      const response = await this.axiosInstance.get(`${this.resourcePath}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw new Error('Failed to fetch stats');
    }
  }
}

export default new ServiceService();