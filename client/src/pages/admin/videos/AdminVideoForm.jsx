import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Youtube, Save, Eye, Star, Clock, User } from "lucide-react";
import { toast } from "react-hot-toast";
import apiService from "../../../services/apiService";

const AdminVideoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    category: "Campus Life",
    duration: "",
    views: "0",
    isPublished: true,
    isFeatured: false,
    tags: [],
  });
  const [preview, setPreview] = useState(null);
  const [urlError, setUrlError] = useState("");

  const categories = [
    "Campus Life",
    "Academics",
    "Student Life",
    "Sports",
    "Events",
    "Facilities",
    "Announcements",
    "Other",
  ];

  // Load video data for editing
  useEffect(() => {
    if (isEditing) {
      const fetchVideo = async () => {
        try {
          setLoading(true);
          const response = await apiService.get(`/admin/videos/${id}`);
          const video = response.data.data;
          setFormData({
            title: video.title || "",
            description: video.description || "",
            videoUrl: video.videoUrl || "",
            category: video.category || "Campus Life",
            duration: video.duration || "",
            views: video.views || "0",
            isPublished:
              video.isPublished !== undefined ? video.isPublished : true,
            isFeatured: video.isFeatured || false,
            tags: video.tags || [],
          });

          // Set preview if video exists
          if (video.videoId) {
            setPreview({
              videoId: video.videoId,
              thumbnail:
                video.thumbnailUrl ||
                `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`,
            });
          }
        } catch (error) {
          console.error("Error fetching video:", error);
          toast.error("Failed to load video");
          navigate("/admin/videos");
        } finally {
          setLoading(false);
        }
      };

      fetchVideo();
    }
  }, [id, isEditing, navigate]);

  // Extract YouTube video ID from various URL formats
  const extractYouTubeId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];

    for (let pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  };

  // Handle video URL change and preview generation
  const handleVideoUrlChange = (url) => {
    setFormData((prev) => ({ ...prev, videoUrl: url }));
    setUrlError("");
    setPreview(null);

    if (url.trim()) {
      const videoId = extractYouTubeId(url);
      if (videoId) {
        setPreview({
          videoId,
          thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        });

        // Try to auto-fetch video info from YouTube API (if available)
        // For now, we'll just clear any previous errors
        setUrlError("");
      } else {
        setUrlError("Please enter a valid YouTube URL");
      }
    }
  };

  const handleTagsChange = (tagsString) => {
    const tags = tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    setFormData((prev) => ({ ...prev, tags }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }

    if (!formData.videoUrl.trim()) {
      toast.error("YouTube URL is required");
      return;
    }

    if (!extractYouTubeId(formData.videoUrl)) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    if (!formData.duration.trim()) {
      toast.error("Duration is required");
      return;
    }

    // Duration format validation
    const durationPattern = /^(\d{1,2}:)?[0-5]?\d:[0-5]\d$/;
    if (!durationPattern.test(formData.duration)) {
      toast.error("Duration must be in format MM:SS or HH:MM:SS");
      return;
    }

    try {
      setSaving(true);

      const videoData = {
        ...formData,
        platform: "youtube", // Always YouTube for this form
      };

      if (isEditing) {
        await apiService.put(`/admin/videos/${id}`, videoData);
        toast.success("Video updated successfully");
      } else {
        await apiService.post("/admin/videos", videoData);
        toast.success("Video created successfully");
      }

      navigate("/admin/videos");
    } catch (error) {
      console.error("Error saving video:", error);
      if (error.response?.data?.errors) {
        // Handle validation errors
        const firstError = error.response.data.errors[0];
        toast.error(firstError.msg || "Validation error");
      } else {
        toast.error(error.response?.data?.message || "Failed to save video");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/videos")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Youtube className="h-6 w-6 text-red-600" />
              {isEditing ? "Edit YouTube Video" : "Add YouTube Video"}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEditing
                ? "Update video information"
                : "Add a new YouTube video to your gallery"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Video Information
              </h2>

              {/* YouTube URL */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  YouTube URL *
                </label>
                <div className="relative">
                  <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 h-4 w-4" />
                  <input
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => handleVideoUrlChange(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      urlError ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                </div>
                {urlError && (
                  <p className="mt-1 text-sm text-red-600">{urlError}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Supported formats: youtube.com/watch?v=, youtu.be/,
                  youtube.com/embed/
                </p>
              </div>

              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter video title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  maxLength={200}
                />
                <p className="mt-1 text-sm text-gray-500">
                  {formData.title.length}/200 characters
                </p>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Enter video description"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  maxLength={1000}
                />
                <p className="mt-1 text-sm text-gray-500">
                  {formData.description.length}/1000 characters
                </p>
              </div>

              {/* Category and Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          duration: e.target.value,
                        }))
                      }
                      placeholder="5:23 or 1:05:30"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      pattern="^(\d{1,2}:)?[0-5]?\d:[0-5]\d$"
                      required
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Format: MM:SS or HH:MM:SS
                  </p>
                </div>
              </div>

              {/* Views */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  View Count
                </label>
                <div className="relative">
                  <Eye className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    value={formData.views}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        views: e.target.value,
                      }))
                    }
                    placeholder="1.2K, 500, etc."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Can use formats like "1.2K", "500", etc.
                </p>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={formData.tags.join(", ")}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="education, campus, students"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Separate tags with commas
                </p>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Settings
              </h2>

              <div className="space-y-4">
                {/* Published Status */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Published
                    </h3>
                    <p className="text-sm text-gray-600">
                      Make this video visible on the website
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          isPublished: e.target.checked,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Featured Status */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      Featured
                    </h3>
                    <p className="text-sm text-gray-600">
                      Show this video prominently in the gallery
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          isFeatured: e.target.checked,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/admin/videos")}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                <Save className="h-4 w-4" />
                {saving
                  ? "Saving..."
                  : isEditing
                  ? "Update Video"
                  : "Create Video"}
              </button>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Preview
            </h2>

            {preview ? (
              <div className="space-y-4">
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={preview.thumbnail}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <Youtube className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  {formData.duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {formData.duration}
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {formData.title || "Video Title"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {formData.description || "Video description"}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="px-2 py-1 bg-gray-100 rounded-full">
                      {formData.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {formData.views} views
                    </div>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex gap-2">
                  {formData.isPublished ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Published
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      Draft
                    </span>
                  )}
                  {formData.isFeatured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Tags */}
                {formData.tags.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Tags:</p>
                    <div className="flex flex-wrap gap-1">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Youtube className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">Enter a YouTube URL to see preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVideoForm;
