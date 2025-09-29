import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Play,
  Filter,
  Grid,
  List,
  Star,
  StarOff,
  Globe,
  EyeOff,
  Youtube,
  Video,
} from "lucide-react";
import { toast } from "react-hot-toast";
import apiService from "../../../services/apiService";
import AdminLayout from "../../../components/admin/AdminLayout";

const AdminVideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPlatform, setFilterPlatform] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [stats, setStats] = useState({
    totalVideos: 0,
    publishedVideos: 0,
    featuredVideos: 0,
  });
  const itemsPerPage = 12;

  const categories = [
    "all",
    "Campus Life",
    "Academics",
    "Student Life",
    "Sports",
    "Events",
    "Facilities",
    "Announcements",
    "Other",
  ];

  const platforms = ["all", "youtube", "vimeo", "direct", "other"];

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        category: filterCategory !== "all" ? filterCategory : undefined,
        platform: filterPlatform !== "all" ? filterPlatform : undefined,
        isPublished:
          filterStatus === "published"
            ? true
            : filterStatus === "unpublished"
            ? false
            : undefined,
      };

      const response = await apiService.get("/admin/videos", { params });
      setVideos(response.data.data.videos || []);
      setTotalPages(response.data.data.pagination.totalPages || 1);
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast.error("Failed to load videos");
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, filterCategory, filterPlatform, filterStatus]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await apiService.get("/admin/videos/stats");
      setStats(response.data.data.overview || {});
    } catch (error) {
      console.error("Error fetching video stats:", error);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await apiService.delete(`/admin/videos/${id}`);
      toast.success("Video deleted successfully");
      fetchVideos();
      fetchStats();
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error("Failed to delete video");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedVideos.length === 0) {
      toast.error("Please select videos to delete");
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedVideos.length} selected videos?`
      )
    ) {
      return;
    }

    try {
      await apiService.post("/admin/videos/bulk-delete", {
        ids: selectedVideos,
      });
      toast.success(`${selectedVideos.length} videos deleted successfully`);
      setSelectedVideos([]);
      fetchVideos();
      fetchStats();
    } catch (error) {
      console.error("Error deleting videos:", error);
      toast.error("Failed to delete some videos");
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      await apiService.patch(`/admin/videos/${id}/toggle-featured`);
      toast.success("Featured status updated");
      fetchVideos();
      fetchStats();
    } catch (error) {
      console.error("Error updating featured status:", error);
      toast.error("Failed to update featured status");
    }
  };

  const handleTogglePublished = async (id) => {
    try {
      await apiService.patch(`/admin/videos/${id}/toggle-published`);
      toast.success("Published status updated");
      fetchVideos();
      fetchStats();
    } catch (error) {
      console.error("Error updating published status:", error);
      toast.error("Failed to update published status");
    }
  };

  const handleSelectVideo = (id) => {
    setSelectedVideos((prev) =>
      prev.includes(id)
        ? prev.filter((videoId) => videoId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedVideos.length === videos.length) {
      setSelectedVideos([]);
    } else {
      setSelectedVideos(videos.map((video) => video._id));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "youtube":
        return <Youtube className="h-4 w-4 text-red-600" />;
      case "vimeo":
        return <Video className="h-4 w-4 text-blue-600" />;
      default:
        return <Play className="h-4 w-4 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Video Management</h1>
          <p className="text-gray-600 mt-1">
            Manage videos for your website gallery
          </p>
        </div>
        <div className="flex gap-3">
          {selectedVideos.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Delete Selected ({selectedVideos.length})
            </button>
          )}
          <Link
            to="/admin/videos/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            Add Video
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Videos</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalVideos}
              </p>
            </div>
            <Video className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.publishedVideos}
              </p>
            </div>
            <Globe className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Featured</p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.featuredVideos}
              </p>
            </div>
            <Star className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-40"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>

          {/* Platform Filter */}
          <div className="relative">
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-32"
            >
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform === "all"
                    ? "All Platforms"
                    : platform.charAt(0).toUpperCase() + platform.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-32"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } transition-colors`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } transition-colors`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Select All */}
          {videos.length > 0 && (
            <button
              onClick={handleSelectAll}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {selectedVideos.length === videos.length
                ? "Deselect All"
                : "Select All"}
            </button>
          )}
        </div>
      </div>

      {/* Video Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {videos.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Video className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No videos found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "No videos match your search criteria."
                : "Get started by adding your first video."}
            </p>
            <Link
              to="/admin/videos/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              Add Video
            </Link>
          </div>
        ) : (
          <>
            {viewMode === "grid" ? (
              /* Grid View */
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {videos.map((video) => (
                    <div
                      key={video._id}
                      className="group relative bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Selection Checkbox */}
                      <div className="absolute top-2 left-2 z-10">
                        <input
                          type="checkbox"
                          checked={selectedVideos.includes(video._id)}
                          onChange={() => handleSelectVideo(video._id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>

                      {/* Status Indicators */}
                      <div className="absolute top-2 right-2 z-10 flex gap-1">
                        {video.isFeatured && (
                          <div className="bg-yellow-500 text-white p-1 rounded-full">
                            <Star className="h-3 w-3" />
                          </div>
                        )}
                        {!video.isPublished && (
                          <div className="bg-red-500 text-white p-1 rounded-full">
                            <EyeOff className="h-3 w-3" />
                          </div>
                        )}
                      </div>

                      {/* Video Thumbnail */}
                      <div className="aspect-video bg-gray-200 overflow-hidden relative">
                        <img
                          src={
                            video.thumbnailUrl ||
                            `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
                          }
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="h-8 w-8 text-white" fill="white" />
                          </div>
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          {getPlatformIcon(video.platform)}
                          <span className="text-xs text-gray-500 uppercase">
                            {video.platform}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            {video.duration}
                          </span>
                        </div>

                        <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {video.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="px-2 py-1 bg-gray-100 rounded-full">
                            {video.category}
                          </span>
                          <span>{formatDate(video.createdAt)}</span>
                        </div>
                      </div>

                      {/* Action Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          <Link
                            to={`/admin/videos/edit/${video._id}`}
                            className="p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4 text-gray-700" />
                          </Link>

                          <button
                            onClick={() => handleToggleFeatured(video._id)}
                            className="p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full transition-colors"
                            title={video.isFeatured ? "Unfeature" : "Feature"}
                          >
                            {video.isFeatured ? (
                              <StarOff className="h-4 w-4 text-yellow-600" />
                            ) : (
                              <Star className="h-4 w-4 text-gray-700" />
                            )}
                          </button>

                          <button
                            onClick={() => handleTogglePublished(video._id)}
                            className="p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full transition-colors"
                            title={video.isPublished ? "Unpublish" : "Publish"}
                          >
                            {video.isPublished ? (
                              <EyeOff className="h-4 w-4 text-red-600" />
                            ) : (
                              <Eye className="h-4 w-4 text-green-600" />
                            )}
                          </button>

                          <button
                            onClick={() => handleDelete(video._id, video.title)}
                            className="p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* List View */
              <div>
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-700">
                  <div className="col-span-1">
                    <input
                      type="checkbox"
                      checked={selectedVideos.length === videos.length}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="col-span-2">Video</div>
                  <div className="col-span-3">Title</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-1">Platform</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-2">Actions</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-200">
                  {videos.map((video) => (
                    <div
                      key={video._id}
                      className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="col-span-1 flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedVideos.includes(video._id)}
                          onChange={() => handleSelectVideo(video._id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>

                      <div className="col-span-2 flex items-center">
                        <div className="relative">
                          <img
                            src={
                              video.thumbnailUrl ||
                              `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
                            }
                            alt={video.title}
                            className="w-20 h-12 object-cover rounded"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="h-4 w-4 text-white" fill="white" />
                          </div>
                        </div>
                      </div>

                      <div className="col-span-3 flex items-center">
                        <div>
                          <p className="font-medium text-gray-900 line-clamp-1">
                            {video.title}
                          </p>
                          <p className="text-sm text-gray-600 line-clamp-1">
                            {video.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {video.isFeatured && (
                              <Star className="h-3 w-3 text-yellow-500" />
                            )}
                            <span className="text-xs text-gray-500">
                              {video.duration} • {video.views} views
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-2 flex items-center">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          {video.category}
                        </span>
                      </div>

                      <div className="col-span-1 flex items-center">
                        <div className="flex items-center gap-1">
                          {getPlatformIcon(video.platform)}
                          <span className="text-xs text-gray-600 capitalize">
                            {video.platform}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-1 flex items-center">
                        <div className="flex flex-col gap-1">
                          {video.isPublished ? (
                            <span className="text-xs text-green-600 font-medium">
                              Published
                            </span>
                          ) : (
                            <span className="text-xs text-red-600 font-medium">
                              Draft
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            {formatDate(video.createdAt)}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-2 flex items-center gap-2">
                        <Link
                          to={`/admin/videos/edit/${video._id}`}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>

                        <button
                          onClick={() => handleToggleFeatured(video._id)}
                          className={`p-1 rounded transition-colors ${
                            video.isFeatured
                              ? "text-yellow-600 hover:bg-yellow-100"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                          title={video.isFeatured ? "Unfeature" : "Feature"}
                        >
                          <Star className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleTogglePublished(video._id)}
                          className={`p-1 rounded transition-colors ${
                            video.isPublished
                              ? "text-red-600 hover:bg-red-100"
                              : "text-green-600 hover:bg-green-100"
                          }`}
                          title={video.isPublished ? "Unpublish" : "Publish"}
                        >
                          {video.isPublished ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>

                        <button
                          onClick={() => handleDelete(video._id, video.title)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 border-t bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing page {currentPage} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminVideoList;
