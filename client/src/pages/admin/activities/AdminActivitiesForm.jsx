import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  ArrowLeft,
  Save,
  Calendar,
  MapPin,
  Users,
  FileText,
  Upload,
  X,
  Image,
  Trash2,
} from "lucide-react";
import AdminLayout from "../../../components/admin/AdminLayout";
import apiService from "../../../services/apiService";

const AdminActivitiesForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [photoGallery, setPhotoGallery] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "event",
    category: "Academic",
    venue: "",
    date: "",
    startTime: "",
    endTime: "",
    organizer: "",
    capacity: "",
    registrationRequired: false,
    registrationDeadline: "",
    fees: "",
    contactInfo: "",
    requirements: "",
    status: "upcoming",
    featured: false,
    published: true,
  });

  const activityTypes = [
    { value: "event", label: "Event" },
    { value: "photo-gallery", label: "Photo Gallery" },
    { value: "achievement", label: "Achievement" },
    { value: "announcement", label: "Announcement" },
    { value: "competition", label: "Competition" },
    { value: "workshop", label: "Workshop" },
  ];

  const activityCategories = [
    { value: "Sports", label: "Sports" },
    { value: "Academic", label: "Academic" },
    { value: "Cultural", label: "Cultural" },
    { value: "Social", label: "Social" },
    { value: "Alumni", label: "Alumni" },
    { value: "Co-Curricular", label: "Co-Curricular" },
    { value: "Other", label: "Other" },
  ];

  const fetchActivity = useCallback(async () => {
    if (!isEditing) return;

    try {
      setLoading(true);
      const response = await apiService.get(`/admin/activities/${id}`);
      const activity = response.data.data; // Changed from response.data.data.activity

      // Format dates for input fields
      const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
      };

      const formatTime = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toTimeString().slice(0, 5);
      };

      setFormData({
        title: activity.title || "",
        description: activity.description || "",
        type: activity.type || "event",
        category: activity.category || "Academic",
        venue: activity.venue || "",
        date: formatDate(activity.date),
        startTime: formatTime(activity.startTime),
        endTime: formatTime(activity.endTime),
        organizer: activity.organizer || "",
        capacity: activity.capacity || "",
        registrationRequired: activity.registrationRequired || false,
        registrationDeadline: formatDate(activity.registrationDeadline),
        fees: activity.fees || "",
        contactInfo: activity.contactInfo || "",
        requirements: activity.requirements || "",
        status: activity.status || "upcoming",
        featured: activity.featured || false,
        published: activity.published !== undefined ? activity.published : true,
      });

      // Load photo gallery if available
      if (activity.photoGallery && activity.photoGallery.length > 0) {
        setPhotoGallery(activity.photoGallery);
      }
    } catch (error) {
      console.error("Error fetching activity:", error);
      toast.error("Failed to fetch activity details");
      navigate("/admin/activities");
    } finally {
      setLoading(false);
    }
  }, [id, isEditing, navigate]);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      setUploadingImages(true);
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("category", "activity");

        const response = await apiService.post(
          "/admin/gallery/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return {
          imageUrl: response.data.data.imageUrl,
          thumbnailUrl:
            response.data.data.thumbnailUrl || response.data.data.imageUrl,
          caption: "",
          description: "",
          isActive: true,
          order: photoGallery.length,
        };
      });

      const uploadedImages = await Promise.all(uploadPromises);
      setPhotoGallery((prev) => [...prev, ...uploadedImages]);
      toast.success(`${files.length} image(s) uploaded successfully!`);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images");
    } finally {
      setUploadingImages(false);
    }
  };

  // Remove image from gallery
  const removeImage = (index) => {
    setPhotoGallery((prev) => prev.filter((_, i) => i !== index));
  };

  // Update image details
  const updateImageDetails = (index, field, value) => {
    setPhotoGallery((prev) =>
      prev.map((img, i) => (i === index ? { ...img, [field]: value } : img))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title.trim()) {
      toast.error("Please enter an activity title");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Please enter an activity description");
      return;
    }
    if (!formData.date) {
      toast.error("Please select an activity date");
      return;
    }

    try {
      setSubmitting(true);

      // Prepare data for submission
      const submitData = {
        ...formData,
        capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
        fees: formData.fees ? parseFloat(formData.fees) : undefined,
        photoGallery: photoGallery,
      };

      if (isEditing) {
        await apiService.put(`/admin/activities/${id}`, submitData);
        toast.success("Activity updated successfully!");
      } else {
        await apiService.post("/admin/activities", submitData);
        toast.success("Activity created successfully!");
      }

      navigate("/admin/activities");
    } catch (error) {
      console.error("Error saving activity:", error);
      toast.error(error.response?.data?.message || "Failed to save activity");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="bg-white shadow rounded-lg p-6">
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-10 bg-gray-200 rounded"></div>
                ))}
              </div>
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
            onClick={() => navigate("/admin/activities")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Activities
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Edit Activity" : "Add New Activity"}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEditing
              ? "Update activity information"
              : "Create a new activity for the college"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Activity Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter activity title"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter activity description"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Activity Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {activityTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {activityCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Gallery Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Image className="h-5 w-5 mr-2" />
              Photo Gallery
            </h2>

            <div className="space-y-6">
              {/* Upload Section */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Upload Activity Photos
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">
                        PNG, JPG, GIF up to 10MB each. Multiple files allowed.
                      </span>
                      <input
                        id="photo-upload"
                        name="photo-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImages}
                      />
                      <span className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                        {uploadingImages ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Choose Files
                          </>
                        )}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Photo Gallery Preview */}
              {photoGallery.length > 0 && (
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-4">
                    Uploaded Photos ({photoGallery.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {photoGallery.map((photo, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 bg-gray-50"
                      >
                        <div className="relative mb-3">
                          <img
                            src={
                              photo.imageUrl.startsWith("http")
                                ? photo.imageUrl
                                : `http://localhost:5000${photo.imageUrl}`
                            }
                            alt={photo.caption || `Photo ${index + 1}`}
                            className="w-full h-32 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Photo caption"
                            value={photo.caption || ""}
                            onChange={(e) =>
                              updateImageDetails(
                                index,
                                "caption",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <textarea
                            placeholder="Photo description"
                            value={photo.description || ""}
                            onChange={(e) =>
                              updateImageDetails(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            rows={2}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`active-${index}`}
                              checked={photo.isActive}
                              onChange={(e) =>
                                updateImageDetails(
                                  index,
                                  "isActive",
                                  e.target.checked
                                )
                              }
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor={`active-${index}`}
                              className="ml-2 text-sm text-gray-700"
                            >
                              Active
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule & Location
            </h2>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="venue"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Venue
                </label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter venue/location"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="startTime"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="endTime"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Organization Details
            </h2>

            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="organizer"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Organizer
                  </label>
                  <input
                    type="text"
                    id="organizer"
                    name="organizer"
                    value={formData.organizer}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter organizer name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="capacity"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Capacity
                  </label>
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Maximum participants"
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contactInfo"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Contact Information
                </label>
                <textarea
                  id="contactInfo"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contact person, phone, email, etc."
                />
              </div>

              <div>
                <label
                  htmlFor="requirements"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Requirements
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any special requirements or prerequisites"
                />
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Registration & Fees
            </h2>

            <div className="space-y-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="registrationRequired"
                  name="registrationRequired"
                  checked={formData.registrationRequired}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="registrationRequired"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Registration Required
                </label>
              </div>

              {formData.registrationRequired && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="registrationDeadline"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Registration Deadline
                    </label>
                    <input
                      type="date"
                      id="registrationDeadline"
                      name="registrationDeadline"
                      value={formData.registrationDeadline}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="fees"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Registration Fees (₹)
                    </label>
                    <input
                      type="number"
                      id="fees"
                      name="fees"
                      value={formData.fees}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter amount (0 for free)"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Display Settings
            </h2>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="featured"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Featured Activity
                </label>
                <span className="ml-2 text-xs text-gray-500">
                  (Will be highlighted on the website)
                </span>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  checked={formData.published}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="published"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Published
                </label>
                <span className="ml-2 text-xs text-gray-500">
                  (Visible to public)
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/admin/activities")}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {isEditing ? "Update Activity" : "Create Activity"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminActivitiesForm;
