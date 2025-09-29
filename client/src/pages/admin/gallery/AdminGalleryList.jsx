import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Image as ImageIcon,
  Filter,
  Grid,
  List,
  Download,
  Upload,
} from "lucide-react";
import { toast } from "react-hot-toast";
import apiService from "../../../services/apiService";
import AdminLayout from "../../../components/admin/AdminLayout";

const AdminGalleryList = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedImages, setSelectedImages] = useState([]);
  const itemsPerPage = 12;

  const categories = [
    "all",
    "campus",
    "events",
    "sports",
    "academics",
    "achievements",
    "facilities",
  ];

  const fetchGallery = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        category: filterCategory !== "all" ? filterCategory : undefined,
      };

      // Try to fetch from gallery endpoint, fallback to empty if not available
      try {
        const response = await apiService.get("/admin/gallery", { params });
        setGallery(response.data.data.gallery || []);
        setTotalPages(response.data.data.pagination.pages || 1);
      } catch (error) {
        if (error.response?.status === 404) {
          // Endpoint doesn't exist yet, show empty state
          setGallery([]);
          setTotalPages(1);
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
      toast.error("Failed to load gallery");
      setGallery([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, filterCategory]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await apiService.delete(`/admin/gallery/${id}`);
      toast.success("Image deleted successfully");
      fetchGallery();
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedImages.length === 0) {
      toast.error("Please select images to delete");
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedImages.length} selected images?`
      )
    ) {
      return;
    }

    try {
      await Promise.all(
        selectedImages.map((id) => apiService.delete(`/admin/gallery/${id}`))
      );
      toast.success(`${selectedImages.length} images deleted successfully`);
      setSelectedImages([]);
      fetchGallery();
    } catch (error) {
      console.error("Error deleting images:", error);
      toast.error("Failed to delete some images");
    }
  };

  const handleSelectImage = (id) => {
    setSelectedImages((prev) =>
      prev.includes(id)
        ? prev.filter((imageId) => imageId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedImages.length === gallery.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(gallery.map((item) => item._id));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
          <h1 className="text-2xl font-bold text-gray-900">
            Gallery Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your website images and photo galleries
          </p>
        </div>
        <div className="flex gap-3">
          {selectedImages.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Delete Selected ({selectedImages.length})
            </button>
          )}
          <Link
            to="/admin/gallery/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            Add Images
          </Link>
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
              placeholder="Search images..."
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
                  {category === "all"
                    ? "All Categories"
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
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
          {gallery.length > 0 && (
            <button
              onClick={handleSelectAll}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {selectedImages.length === gallery.length
                ? "Deselect All"
                : "Select All"}
            </button>
          )}
        </div>
      </div>

      {/* Gallery Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {gallery.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <ImageIcon className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No images found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "No images match your search criteria."
                : "Get started by uploading your first images."}
            </p>
            <Link
              to="/admin/gallery/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              <Upload className="h-4 w-4" />
              Upload Images
            </Link>
          </div>
        ) : (
          <>
            {viewMode === "grid" ? (
              /* Grid View */
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {gallery.map((item) => (
                    <div
                      key={item._id}
                      className="group relative bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Selection Checkbox */}
                      <div className="absolute top-2 left-2 z-10">
                        <input
                          type="checkbox"
                          checked={selectedImages.includes(item._id)}
                          onChange={() => handleSelectImage(item._id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>

                      {/* Image */}
                      <div className="aspect-square bg-gray-200 overflow-hidden">
                        <img
                          src={item.imageUrl || "/api/placeholder/300/300"}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          loading="lazy"
                        />
                      </div>

                      {/* Image Info */}
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="px-2 py-1 bg-gray-100 rounded-full">
                            {item.category || "uncategorized"}
                          </span>
                          <span>{formatDate(item.createdAt)}</span>
                        </div>
                      </div>

                      {/* Action Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          <Link
                            to={`/admin/gallery/edit/${item._id}`}
                            className="p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4 text-gray-700" />
                          </Link>
                          <button
                            onClick={() => window.open(item.imageUrl, "_blank")}
                            className="p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full transition-colors"
                            title="View Full Size"
                          >
                            <Eye className="h-4 w-4 text-gray-700" />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id, item.title)}
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
                      checked={selectedImages.length === gallery.length}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="col-span-2">Image</div>
                  <div className="col-span-3">Title</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-2">Actions</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-200">
                  {gallery.map((item) => (
                    <div
                      key={item._id}
                      className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="col-span-1 flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedImages.includes(item._id)}
                          onChange={() => handleSelectImage(item._id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>

                      <div className="col-span-2 flex items-center">
                        <img
                          src={item.imageUrl || "/api/placeholder/80/80"}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </div>

                      <div className="col-span-3 flex items-center">
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-600 line-clamp-1">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="col-span-2 flex items-center">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          {item.category || "uncategorized"}
                        </span>
                      </div>

                      <div className="col-span-2 flex items-center">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(item.createdAt)}
                        </div>
                      </div>

                      <div className="col-span-2 flex items-center gap-2">
                        <Link
                          to={`/admin/gallery/edit/${item._id}`}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>

                        <button
                          onClick={() => window.open(item.imageUrl, "_blank")}
                          className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(item._id, item.title)}
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

export default AdminGalleryList;
