import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import { toast } from "react-hot-toast";
import apiService from "../../../services/apiService";
import { getImageUrl } from "../../../utils/imageUtils";

const AdminNewsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "announcement",
    status: "published",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [errors, setErrors] = useState({});

  const fetchNewsItem = useCallback(async () => {
    try {
      setInitialLoading(true);
      const response = await apiService.get(`/admin/news/${id}`);
      const newsItem = response.data.data;

      setFormData({
        title: newsItem.title || "",
        content: newsItem.content || "",
        category: newsItem.category || "announcement",
        status: newsItem.status || "published",
      });

      // Set image previews if exists
      if (newsItem.images && newsItem.images.length > 0) {
        // Use the new images array - store both previews and existing image data
        setImagePreviews(newsItem.images.map((img) => getImageUrl(img.url)));
        // Store existing images info for backend processing
        setExistingImages(newsItem.images);
      } else if (newsItem.image?.url) {
        // Backward compatibility with single image
        setImagePreviews([getImageUrl(newsItem.image.url)]);
        setExistingImages([newsItem.image]);
      }
    } catch (error) {
      console.error("Error fetching news item:", error);
      toast.error("Failed to load news item");
      navigate("/admin/news");
    } finally {
      setInitialLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (isEditing) {
      fetchNewsItem();
    }
  }, [isEditing, fetchNewsItem]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;

    // Calculate total images including existing ones
    const totalExistingImages = existingImages.length;
    const totalCurrentFiles = selectedFiles.length;
    const totalAfterUpload =
      totalExistingImages + totalCurrentFiles + files.length;

    // Validate total number of images (max 5)
    if (totalAfterUpload > 5) {
      toast.error(
        `Maximum 5 images allowed. You currently have ${
          totalExistingImages + totalCurrentFiles
        } images.`
      );
      return;
    }

    // Validate each file
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select only image files");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Each file size must be less than 5MB");
        return;
      }
    }

    try {
      // Add new files to existing ones
      const newFiles = [...selectedFiles, ...files];
      setSelectedFiles(newFiles);

      // Create preview URLs for new files
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);

      toast.success(`${files.length} image(s) added successfully`);
    } catch (error) {
      console.error("Error handling files:", error);
      toast.error("Error handling files");
    }
  };

  const removeImage = (index) => {
    // Check if this is an existing image or a new file
    const existingImagesCount = existingImages.length;

    if (index < existingImagesCount) {
      // Remove from existing images
      const newExistingImages = existingImages.filter((_, i) => i !== index);
      setExistingImages(newExistingImages);
    } else {
      // Remove from new selected files
      const fileIndex = index - existingImagesCount;
      const newFiles = selectedFiles.filter((_, i) => i !== fileIndex);
      setSelectedFiles(newFiles);
    }

    // Remove from previews
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);

    // Reset file input if no new files left
    if (selectedFiles.length <= 1 && index >= existingImagesCount) {
      const fileInput = document.getElementById("images");
      if (fileInput) fileInput.value = "";
    }
  };

  const removeAllImages = () => {
    setSelectedFiles([]);
    setImagePreviews([]);
    setExistingImages([]);
    // Reset file input
    const fileInput = document.getElementById("images");
    if (fileInput) fileInput.value = "";
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      setLoading(true);

      // Create FormData for multipart form submission
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("content", formData.content);
      submitData.append("category", formData.category);
      submitData.append("status", formData.status);

      // Add image files if selected
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          submitData.append("images", file);
        });
      }

      // Send existing images info to preserve them
      if (existingImages.length > 0) {
        submitData.append("existingImages", JSON.stringify(existingImages));
      }

      if (isEditing) {
        await apiService.put(`/admin/news/${id}`, submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("News updated successfully");
      } else {
        await apiService.post("/admin/news", submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("News created successfully");
      }

      navigate("/admin/news");
    } catch (error) {
      console.error("Error saving news:", error);

      // Try to extract error message from response
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.join(", ") ||
        "Failed to save news";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/admin/news")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Edit News" : "Add College Update"}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditing
              ? "Update the college news or announcement"
              : "Create a new college announcement, news, or update"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="space-y-6">
          {/* Title */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${
                errors.title ? "border-red-300" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter announcement or news title"
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Category */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="announcement">📢 Announcement</option>
              <option value="news">📰 News</option>
              <option value="event">📅 Event</option>
              <option value="achievement">🏆 Achievement</option>
              <option value="admission">🎓 Admission</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Images (Maximum 5)
            </label>

            {/* File input */}
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="images"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB each (Max 5 images)
                  </p>
                </div>
                <input
                  id="images"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {/* Image previews */}
            {imagePreviews.length > 0 && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700">
                    Selected Images ({imagePreviews.length}/5)
                    {existingImages.length > 0 && (
                      <span className="text-xs text-gray-500 ml-2">
                        ({existingImages.length} existing +{" "}
                        {selectedFiles.length} new)
                      </span>
                    )}
                  </h4>
                  <button
                    type="button"
                    onClick={removeAllImages}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove All
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => {
                    const isExisting = index < existingImages.length;
                    return (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
                          title="Remove image"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                          {index + 1}
                        </div>
                        {isExisting && (
                          <div className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-1 rounded">
                            Existing
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <p className="text-sm text-gray-500 mt-2">
              Add up to 5 images to make your announcement more engaging
              (optional). The first image will be used as the main featured
              image.
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={15}
              className={`w-full px-3 py-2 border ${
                errors.content ? "border-red-300" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Write your announcement or news content here..."
            />
            {errors.content && (
              <p className="text-red-600 text-sm mt-1">{errors.content}</p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              Write clear and informative content about the college update,
              announcement, or news.
            </p>
          </div>

          {/* Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="published">
                ✅ Published (Visible to everyone)
              </option>
              <option value="draft">📝 Draft (Save for later)</option>
            </select>
          </div>

          {/* Submit Buttons */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {loading
                  ? "Saving..."
                  : isEditing
                  ? "Update News"
                  : "Publish News"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/news")}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminNewsForm;
