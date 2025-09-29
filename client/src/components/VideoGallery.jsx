import React, { useState, useEffect } from "react";
import { Play, X, Youtube, Calendar, Eye, Clock } from "lucide-react";
import apiService from "../services/apiService";

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await apiService.get("/videos", {
          params: {
            isPublished: true,
            limit: 50, // Get more videos for better gallery
          },
        });

        if (response.data.success) {
          setVideos(response.data.data.videos);
          // Set categories from API response, with "All" as first option
          const apiCategories = response.data.data.categories || [];
          setCategories(["All", ...apiCategories]);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("Failed to load videos");
        // Fallback to empty state
        setVideos([]);
        setCategories(["All"]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const getEmbedUrl = (video) => {
    if (video.platform === "youtube") {
      return `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`;
    }
    return video.videoUrl;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Filter videos based on active category
  const filteredVideos =
    activeCategory === "All"
      ? videos
      : videos.filter((video) => video.category === activeCategory);

  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
  };

  if (loading) {
    return (
      <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800">
              Video Gallery
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Loading videos...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
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
      <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
              Video Gallery
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Youtube className="text-red-600 mr-3" size={32} />
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800">
              Video Gallery
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore F.G Degree College For Boys Kohat through our video
            collection showcasing campus life, academic excellence, and student
            achievements
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryFilter(category)}
              className={`px-4 py-2 rounded-full border-2 transition-all duration-300 hover:shadow-md ${
                activeCategory === category
                  ? "bg-primary-600 text-white border-primary-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-primary-500 hover:text-primary-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Video Count */}
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Showing {filteredVideos.length} video
            {filteredVideos.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && ` in ${activeCategory}`}
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Video Thumbnail */}
              <div
                className="relative overflow-hidden cursor-pointer"
                onClick={() => openModal(video)}
              >
                <img
                  src={
                    video.thumbnailUrl ||
                    `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
                  }
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />{" "}
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300">
                  <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Play className="text-white ml-1" size={24} fill="white" />
                  </div>
                </div>
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                  {video.category}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {video.description}
                </p>

                {/* Video Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Eye size={12} className="mr-1" />
                      {video.views}
                    </div>
                    <div className="flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {formatDate(video.uploadDate)}
                    </div>
                  </div>
                  <button
                    onClick={() => openModal(video)}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <Youtube className="inline mr-2" size={18} />
            Visit Our YouTube Channel
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Video Player */}
            <div className="relative pt-[56.25%]">
              {" "}
              {/* 16:9 aspect ratio */}
              <iframe
                className="absolute inset-0 w-full h-full"
                src={getEmbedUrl(selectedVideo)}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Info */}
            <div className="p-6 bg-white">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {selectedVideo.title}
              </h3>
              <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Eye size={14} className="mr-1" />
                  {selectedVideo.views} views
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {formatDate(selectedVideo.uploadDate)}
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {selectedVideo.duration}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
