import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getImageUrl as getImageUrlUtil } from "../utils/imageUtils";
import {
  Calendar,
  User,
  Eye,
  ChevronRight,
  Search,
  Filter,
  Clock,
  Image as ImageIcon,
} from "lucide-react";
import { newsAPI } from "../services/apiService";

const NewsGrid = ({ showFilters = true, limit, category, featured }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(featured || false);

  const categories = [
    { value: "", label: "All Categories" },
    { value: "announcement", label: "Announcements" },
    { value: "event", label: "Events" },
    { value: "news", label: "News" },
    { value: "achievement", label: "Achievements" },
    { value: "admission", label: "Admissions" },
  ];

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page: currentPage,
        limit: limit || 12,
      };

      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      if (selectedCategory) {
        params.category = selectedCategory;
      }

      if (showFeaturedOnly) {
        params.featured = "true";
      }

      const response = await newsAPI.getAll(params);

      if (response.success) {
        setNews(response.data);
        setTotalPages(response.totalPages || 1);
      } else {
        setError("Failed to fetch news");
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to load news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [currentPage, selectedCategory, showFeaturedOnly, searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchNews();
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    setCurrentPage(1);
  };

  const handleFeaturedToggle = () => {
    setShowFeaturedOnly(!showFeaturedOnly);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const getImageUrl = (newsItem) => {
    // Check for images array first (new format)
    if (newsItem.images && newsItem.images.length > 0) {
      const firstImage = newsItem.images[0];
      if (firstImage.url) {
        // If it's a full URL starting with http, use it directly
        if (firstImage.url.startsWith("http")) {
          return firstImage.url;
        }

        // If it's just a filename, construct static URL
        return getImageUrlUtil(firstImage.url);
      }
    }

    // Fallback to single image (backward compatibility)
    if (newsItem.image) {
      // If image.url exists
      if (newsItem.image.url) {
        // If it's a full URL starting with http, use it directly
        if (newsItem.image.url.startsWith("http")) {
          return newsItem.image.url;
        }

        // If it's just a filename, construct static URL
        return getImageUrlUtil(newsItem.image.url);
      }

      // If image is just a string (filename), construct static URL
      if (typeof newsItem.image === "string") {
        return getImageUrlUtil(newsItem.image);
      }

      // If image has filename property (like faculty model), construct static URL
      if (newsItem.image.filename) {
        return getImageUrlUtil(newsItem.image.filename);
      }
    }

    // Fallback image
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      newsItem.title
    )}&background=3B82F6&color=white&size=400x250`;
  };

  if (loading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <ImageIcon size={64} className="mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Error Loading News</h3>
              <p className="text-gray-600 mt-2">{error}</p>
            </div>
            <button
              onClick={fetchNews}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Filters */}
        {showFilters && (
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Search
                </button>
              </form>

              {/* Category Filter */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter size={20} className="text-gray-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Featured Toggle */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFeaturedOnly}
                    onChange={handleFeaturedToggle}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Featured Only</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* News Grid */}
        {news.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No News Found
            </h3>
            <p className="text-gray-600">
              {searchQuery || selectedCategory || showFeaturedOnly
                ? "Try adjusting your filters to see more results."
                : "No news articles are available at the moment."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {news.map((item) => (
                <Link
                  key={item._id}
                  to={`/news/${item._id}`}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  {/* Image */}
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <img
                      src={getImageUrl(item)}
                      alt={item.image?.alt || item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          item.title
                        )}&background=3B82F6&color=white&size=400x250`;
                      }}
                    />
                    {item.featured && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                    {/* Multiple images indicator */}
                    {item.images && item.images.length > 1 && (
                      <div className="absolute top-2 right-2">
                        <span className="bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                          <ImageIcon size={12} />
                          {item.images.length}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Meta Info */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium capitalize">
                        {item.category}
                      </span>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Calendar size={12} />
                        <span>{formatDate(item.publishDate)}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
                      {item.excerpt || truncateText(item.content)}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye size={12} />
                          <span>{item.views}</span>
                        </div>
                        {item.tags && item.tags.length > 0 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {item.tags[0]}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-primary-600 text-sm font-medium group-hover:text-primary-700">
                        <span>Read</span>
                        <ChevronRight
                          size={14}
                          className="ml-1 group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>

                <div className="flex space-x-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 rounded-lg ${
                          currentPage === pageNum
                            ? "bg-primary-600 text-white"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewsGrid;
