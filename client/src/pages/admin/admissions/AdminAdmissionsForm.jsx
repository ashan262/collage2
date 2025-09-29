import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeft, Save, GraduationCap } from "lucide-react";
import AdminLayout from "../../../components/admin/AdminLayout";
import apiService from "../../../services/apiService";

const AdminAdmissionsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "announcement",
    program: "HSSC",
    academicYear: "",
    applicationStartDate: "",
    applicationEndDate: "",
    eligibility: "",
    isPublished: true,
    isFeatured: false,
  });

  const fetchAdmission = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiService.get(`/admin/admissions/${id}`);
      const admission = response.data.data;
      
      setFormData({
        ...admission,
        applicationStartDate: admission.applicationStartDate ? admission.applicationStartDate.split('T')[0] : "",
        applicationEndDate: admission.applicationEndDate ? admission.applicationEndDate.split('T')[0] : "",
      });
    } catch (error) {
      console.error("Error fetching admission:", error);
      toast.error("Failed to load admission");
      navigate("/admin/admissions");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (isEditing) {
      fetchAdmission();
    }
  }, [isEditing, fetchAdmission]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please enter a description");
      return;
    }

    try {
      setSaving(true);
      
      if (isEditing) {
        await apiService.put(`/admin/admissions/${id}`, formData);
        toast.success("Admission updated successfully!");
      } else {
        await apiService.post("/admin/admissions", formData);
        toast.success("Admission created successfully!");
      }
      
      navigate("/admin/admissions");
    } catch (error) {
      console.error("Error saving admission:", error);
      toast.error(error.response?.data?.message || "Failed to save admission");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="bg-white rounded-lg p-6 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/admissions")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admissions
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Edit Admission" : "Create New Admission"}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEditing 
              ? "Update admission information" 
              : "Add a new admission announcement, policy, or update"
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Admission Information
            </h2>
            
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., BS Computer Science Admission 2025"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the admission details, requirements, or announcement..."
                  required
                />
              </div>

              {/* Type, Program, Academic Year */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="announcement">Announcement</option>
                    <option value="merit-list">Merit List</option>
                    <option value="policy">Policy</option>
                    <option value="schedule">Schedule</option>
                    <option value="fee-structure">Fee Structure</option>
                    <option value="requirement">Requirement</option>
                    <option value="form">Form</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Program *
                  </label>
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="HSSC">HSSC Only</option>
                    <option value="BS">BS Only</option>
                    <option value="Both">Both HSSC & BS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Year *
                  </label>
                  <input
                    type="text"
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2024-2025"
                    required
                  />
                </div>
              </div>

              {/* Application Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application Start Date
                  </label>
                  <input
                    type="date"
                    name="applicationStartDate"
                    value={formData.applicationStartDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application End Date
                  </label>
                  <input
                    type="date"
                    name="applicationEndDate"
                    value={formData.applicationEndDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Eligibility */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Eligibility Criteria <span className="text-gray-500">(Optional)</span>
                </label>
                <textarea
                  name="eligibility"
                  value={formData.eligibility}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Minimum 60% marks in FSc Pre-Medical or equivalent..."
                />
              </div>

              {/* Display Settings */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Display Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isPublished"
                      name="isPublished"
                      checked={formData.isPublished}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
                      <span className="font-medium">Published</span> - Visible to students and public
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                      <span className="font-medium">Featured</span> - Highlighted and shown prominently
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pb-8">
            <button
              type="button"
              onClick={() => navigate("/admin/admissions")}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  {isEditing ? "Update Admission" : "Create Admission"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminAdmissionsForm;