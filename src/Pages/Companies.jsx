import React, { useState, useEffect } from 'react';
import { companyService } from '../api';
import { Plus, Building, Globe, Edit3, Trash2 } from 'lucide-react';
import SearchBar from '../Components/SearchBar';
import toast from 'react-hot-toast';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    description: ''
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    filterCompanies();
  }, [companies, searchTerm]);

  const fetchCompanies = async () => {
    try {
      const response = await companyService.getCompanies();
      if (response.success) {
        setCompanies(response.message);
      }
    } catch (error) {
      toast.error('Failed to fetch companies');
    } finally {
      setIsLoading(false);
    }
  };

  const filterCompanies = () => {
    if (!searchTerm) {
      setFilteredCompanies(companies);
    } else {
      const filtered = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (company.description && company.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredCompanies(filtered);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingCompany) {
        const response = await companyService.updateCompany(editingCompany.id, formData);
        if (response.success) {
          toast.success('Company updated successfully');
          fetchCompanies();
        }
      } else {
        const response = await companyService.addCompany(formData);
        if (response.success) {
          toast.success('Company added successfully');
          fetchCompanies();
        }
      }
      
      setShowAddModal(false);
      setEditingCompany(null);
      setFormData({ name: '', website: '', description: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save company');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setFormData({
      name: company.name,
      website: company.website || '',
      description: company.description || ''
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this company?')) {
      return;
    }

    try {
      const response = await companyService.deleteCompany(id);
      if (response.success) {
        toast.success('Company deleted successfully');
        fetchCompanies();
      }
    } catch (error) {
      toast.error('Failed to delete company');
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingCompany(null);
    setFormData({ name: '', website: '', description: '' });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary font-medium">Loading companies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Company Management</h1>
          <p className="text-secondary mt-2">Manage companies for interview experiences</p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>Add Company</span>
        </button>
      </div>

      {/* Search */}
      <div className="card p-6">
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Search companies by name or description..." 
        />
      </div>

      {/* Companies Grid */}
      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="card card-hover p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-primary truncate">{company.name}</h3>
                    {company.website && (
                      <a
                        href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700 mt-1"
                      >
                        <Globe size={14} />
                        <span className="truncate">Website</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-2">
                  <button
                    onClick={() => handleEdit(company)}
                    className="p-2 text-secondary hover:text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors duration-200"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(company.id)}
                    className="p-2 text-secondary hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {company.description && (
                <p className="text-secondary text-sm leading-relaxed mb-4">
                  {company.description.length > 120 
                    ? company.description.substring(0, 120) + '...' 
                    : company.description}
                </p>
              )}

              <div className="text-xs text-secondary">
                Added {new Date(company.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 card">
          <Building className="w-16 h-16 text-secondary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-primary mb-2">
            {searchTerm ? 'No companies found' : 'No companies yet'}
          </h3>
          <p className="text-secondary mb-6">
            {searchTerm 
              ? 'Try adjusting your search terms.' 
              : 'Add your first company to get started with interview experiences.'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary flex items-center space-x-2 mx-auto"
            >
              <Plus size={18} />
              <span>Add First Company</span>
            </button>
          )}
        </div>
      )}

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-xl max-w-md w-full p-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-primary mb-6">
              {editingCompany ? 'Edit Company' : 'Add New Company'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., Google, Microsoft"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="input-field"
                  placeholder="Brief description about the company..."
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary flex items-center space-x-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>{editingCompany ? 'Update' : 'Add'} Company</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;


