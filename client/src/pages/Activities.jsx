import React, { useState, useCallback, useEffect } from "react";
import {
  Calendar,
  Users,
  Trophy,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Music,
  Dumbbell,
  Award,
  Loader,
  AlertCircle,
} from "lucide-react";
import PageHero from "../components/PageHero";
import TabNavigation from "../components/TabNavigation";
import { apiService } from "../services/apiService";
import { getImageUrl, getThumbnailUrl } from "../utils/imageUtils";
import { toast } from "react-hot-toast";

// ActivityCard component with image carousel
const ActivityCard = ({
  activity,
  currentSlide,
  onNextSlide,
  onPrevSlide,
  onSlideSelect,
}) => {
  const isFirstSlide = currentSlide === 0;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
      {/* Image Carousel Container */}
      <div className="relative h-48 overflow-hidden">
        {/* Image Slides */}
        <div
          className="flex h-full"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            willChange: "transform",
          }}
        >
          {/* First slide: Content slide with activity info */}
          <div className="w-full h-full flex-shrink-0 bg-blue-500 flex items-center justify-center relative">
            <div className="text-center text-white p-4">
              <div className="mb-3">{activity.icon}</div>
              <h3 className="text-lg font-bold mb-2">{activity.title}</h3>
              <p className="text-blue-100 text-sm">{activity.category}</p>
              {/* Slide counter for debugging */}
              <p className="text-blue-200 text-xs mt-2">
                Slide {currentSlide + 1}/{activity.images.length}
              </p>
            </div>
            {/* Content slide indicator */}
            <div className="absolute top-2 left-2 bg-white bg-opacity-20 backdrop-blur-sm rounded px-2 py-1">
              <span className="text-white text-xs font-medium">Info</span>
            </div>
          </div>

          {/* Image slides */}
          {activity.images.slice(1).map((image, index) => (
            <div
              key={index + 1}
              className="w-full h-full flex-shrink-0 relative"
            >
              <img
                src={image}
                alt={`${activity.title} - Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Image slide indicator */}
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 backdrop-blur-sm rounded px-2 py-1">
                <span className="text-white text-xs font-medium">
                  {index + 1}/{activity.images.length - 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - More Visible */}
        <button
          onClick={onPrevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white rounded-full p-2 z-10"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={onNextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white rounded-full p-2 z-10"
        >
          <ChevronRight size={20} />
        </button>

        {/* Slide Indicators - More Prominent */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {activity.images.map((_, index) => (
            <button
              key={index}
              onClick={() => onSlideSelect(index)}
              className={`w-3 h-3 rounded-full border-2 border-white ${
                currentSlide === index ? "bg-white" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {activity.category}
          </span>
          {activity.icon}
        </div>
        <h3 className="text-xl font-heading font-bold text-gray-800 mb-2">
          {activity.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {activity.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-2" />
            {new Date(activity.date).toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-400">
            {isFirstSlide
              ? "Info"
              : `Photo ${currentSlide}/${activity.images.length - 1}`}
          </div>
        </div>
      </div>
    </div>
  );
};

const Activities = () => {
  const [activeTab] = useState("overview");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // State for activity card carousels
  const [activitySlides, setActivitySlides] = useState({});

  // Dynamic data states
  const [activitiesData, setActivitiesData] = useState([]);
  const [photoGallery, setPhotoGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(["All"]);

  // Fetch activities data from API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch activities
        const activitiesResponse = await apiService.get("/activities?limit=50");
        const activities = activitiesResponse.data.data.activities || [];

        // Transform activities data for compatibility with existing UI
        const transformedActivities = activities.map((activity) => ({
          id: activity._id,
          title: activity.title,
          description: activity.description,
          date: activity.eventDetails?.startDate || activity.createdAt,
          category: activity.category,
          images:
            activity.photoGallery?.length > 0
              ? [
                  `/api/placeholder/400/250`,
                  ...activity.photoGallery.map((photo) =>
                    getImageUrl(photo.imageUrl)
                  ),
                ]
              : [`/api/placeholder/400/250`],
          icon: getCategoryIcon(activity.category),
          status: activity.status,
          type: activity.type,
          venue: activity.eventDetails?.venue,
          originalData: activity, // Keep reference to original data
        }));

        setActivitiesData(transformedActivities);

        // Extract photo gallery from activities
        const allPhotos = [];
        activities.forEach((activity) => {
          if (activity.photoGallery && activity.photoGallery.length > 0) {
            activity.photoGallery.forEach((photo, index) => {
              if (photo.isActive) {
                allPhotos.push({
                  id: `${activity._id}-${index}`,
                  src: getImageUrl(photo.imageUrl),
                  thumbnail: photo.thumbnailUrl
                    ? getThumbnailUrl(photo.thumbnailUrl)
                    : getImageUrl(photo.imageUrl),
                  title: photo.caption || activity.title,
                  category: activity.category,
                  description: photo.description || activity.description,
                  activityId: activity._id,
                });
              }
            });
          }
        });

        setPhotoGallery(allPhotos);

        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(activities.map((activity) => activity.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setError("Failed to load activities. Please try again later.");
        toast.error("Failed to load activities");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Helper function to get icon for category
  const getCategoryIcon = (category) => {
    const iconMap = {
      Sports: <Trophy className="text-yellow-500" size={24} />,
      Academic: <BookOpen className="text-blue-500" size={24} />,
      Cultural: <Music className="text-purple-500" size={24} />,
      Social: <Users className="text-green-600" size={24} />,
      Alumni: <Users className="text-indigo-500" size={24} />,
      "Co-Curricular": <Award className="text-pink-500" size={24} />,
    };
    return iconMap[category] || <Users className="text-gray-500" size={24} />;
  };

  const tabs = [{ id: "overview", label: "Activities Overview" }];

  // Get the current active tab label for breadcrumbs
  const getCurrentTabLabel = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTab);
    return currentTab ? currentTab.label : "Activities Overview";
  };

  // Initialize carousel states for each activity
  React.useEffect(() => {
    const initialSlides = {};
    activitiesData.forEach((activity) => {
      initialSlides[activity.id] = 0;
    });
    setActivitySlides(initialSlides);
  }, [activitiesData]);

  // Activity card carousel navigation
  const nextActivitySlide = useCallback((activityId, totalSlides) => {
    setActivitySlides((prev) => ({
      ...prev,
      [activityId]: (prev[activityId] + 1) % totalSlides,
    }));
  }, []);

  const prevActivitySlide = useCallback((activityId, totalSlides) => {
    setActivitySlides((prev) => ({
      ...prev,
      [activityId]:
        prev[activityId] === 0 ? totalSlides - 1 : prev[activityId] - 1,
    }));
  }, []);

  const selectActivitySlide = useCallback((activityId, slideIndex) => {
    setActivitySlides((prev) => ({
      ...prev,
      [activityId]: slideIndex,
    }));
  }, []);

  // Auto-advance slides every 3 seconds (faster for testing)
  React.useEffect(() => {
    const interval = setInterval(() => {
      activitiesData.forEach((activity) => {
        nextActivitySlide(activity.id, activity.images.length);
      });
    }, 3000); // Changed to 3 seconds for more obvious effect

    return () => clearInterval(interval);
  }, [nextActivitySlide, activitiesData]);

  // Filter photos based on selected category
  const filteredPhotos =
    selectedCategory === "All"
      ? photoGallery
      : photoGallery.filter((photo) => photo.category === selectedCategory);

  // Lightbox navigation functions
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === filteredPhotos.length - 1 ? 0 : prev + 1
    );
  }, [filteredPhotos.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? filteredPhotos.length - 1 : prev - 1
    );
  }, [filteredPhotos.length]);

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;

      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen">
        <PageHero
          title="College Activities"
          subtitle="Vibrant Campus Life & Student Experiences"
          description="Discover the diverse activities that shape our students' experiences - from sports and academics to cultural events and community service."
          height="h-64 md:h-72"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Activities", href: "/activities" },
            { label: "Loading..." },
          ]}
          backgroundImage="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=600&fit=crop"
        />
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <Loader
                className="animate-spin mx-auto mb-4 text-blue-600"
                size={48}
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Loading Activities...
              </h2>
              <p className="text-gray-600">
                Please wait while we fetch the latest activities
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen">
        <PageHero
          title="College Activities"
          subtitle="Vibrant Campus Life & Student Experiences"
          description="Discover the diverse activities that shape our students' experiences - from sports and academics to cultural events and community service."
          height="h-64 md:h-72"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Activities", href: "/activities" },
            { label: "Error" },
          ]}
          backgroundImage="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=600&fit=crop"
        />
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Failed to Load Activities
              </h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="College Activities"
        subtitle="Vibrant Campus Life & Student Experiences"
        description="Discover the diverse activities that shape our students' experiences - from sports and academics to cultural events and community service."
        height="h-64 md:h-72"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Activities", href: "/activities" },
          { label: getCurrentTabLabel() },
        ]}
        backgroundImage="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=600&fit=crop"
      />

      {/* Tab Content */}
      <div className="container mx-auto mt-4 px-4 pb-16">
        {/* Activities Overview Tab */}
        {activeTab === "overview" && (
          <div>
            {/* Category Filter */}
            <div className="mb-8">
              {/* Desktop Filter */}
              <div className="hidden sm:flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Mobile Filter */}
              <div className="sm:hidden">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Photo Gallery Section */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Photo Gallery
                </h2>
                <p className="text-gray-600">
                  Capturing moments from our campus activities
                </p>
              </div>

              {/* Photo Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="relative">
                      <img
                        src={photo.thumbnail}
                        alt={photo.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 text-xs bg-white/90 text-gray-700 rounded">
                          {photo.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-800 text-sm mb-1">
                        {photo.title}
                      </h3>
                      <p className="text-gray-500 text-xs">
                        {photo.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results State */}
              {filteredPhotos.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 mb-4">
                    No photos found for "{selectedCategory}"
                  </p>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Show All Photos
                  </button>
                </div>
              )}
            </div>

            {/* Activities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activitiesData.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  currentSlide={activitySlides[activity.id] || 0}
                  onNextSlide={() =>
                    nextActivitySlide(activity.id, activity.images.length)
                  }
                  onPrevSlide={() =>
                    prevActivitySlide(activity.id, activity.images.length)
                  }
                  onSlideSelect={(slideIndex) =>
                    selectActivitySlide(activity.id, slideIndex)
                  }
                />
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-heading font-bold text-gray-800 mb-4">
                  Get Involved!
                </h2>
                <p className="text-gray-600 mb-6">
                  Join our vibrant community and participate in activities that
                  enhance your educational experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-lg">
                    View Event Calendar
                  </button>
                  <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg">
                    Contact Activities Office
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Academic Activities Tab */}
        {activeTab === "academic" && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <BookOpen className="mr-3 text-blue-600" size={32} />
              Academic Activities
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Academic Events
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                    <span>Science Fair and Exhibitions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                    <span>Math Olympiad Competitions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                    <span>Research Paper Presentations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                    <span>Academic Conferences</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Study Programs
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3"></span>
                    <span>Peer Learning Groups</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3"></span>
                    <span>Academic Workshops</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3"></span>
                    <span>Tutoring Sessions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3"></span>
                    <span>Study Skills Development</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Co-Curricular Activities Tab */}
        {activeTab === "cocurricular" && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <Music className="mr-3 text-blue-600" size={32} />
              Co-Curricular Activities
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Music className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Music & Arts</h3>
                <p className="text-gray-600">
                  Choir, Band, Art Club, Drama Society
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-green-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Literary Society</h3>
                <p className="text-gray-600">
                  Debate Club, Writing Society, Reading Circle
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="text-purple-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Leadership</h3>
                <p className="text-gray-600">
                  Student Council, Prefect System, Youth Parliament
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Sports Activities Tab */}
        {activeTab === "sports" && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <Dumbbell className="mr-3 text-blue-600" size={32} />
              Sports Activities
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Indoor Sports
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <h4 className="font-medium">Table Tennis</h4>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <h4 className="font-medium">Badminton</h4>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <h4 className="font-medium">Chess</h4>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <h4 className="font-medium">Carom</h4>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Outdoor Sports
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <h4 className="font-medium">Cricket</h4>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <h4 className="font-medium">Football</h4>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <h4 className="font-medium">Athletics</h4>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <h4 className="font-medium">Volleyball</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Functions Tab */}
        {activeTab === "functions" && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <Award className="mr-3 text-blue-600" size={32} />
              College Functions
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Annual Day
                </h3>
                <p className="text-gray-600">
                  Grand celebration showcasing student talents and achievements
                  throughout the year.
                </p>
              </div>
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Cultural Week
                </h3>
                <p className="text-gray-600">
                  Week-long festivities featuring cultural performances,
                  competitions, and exhibitions.
                </p>
              </div>
              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Sports Gala
                </h3>
                <p className="text-gray-600">
                  Inter-college sports competitions and athletic events for all
                  students.
                </p>
              </div>
              <div className="border-l-4 border-orange-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Graduation Ceremony
                </h3>
                <p className="text-gray-600">
                  Formal ceremony celebrating the achievements of graduating
                  students.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X size={32} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            >
              <ChevronRight size={40} />
            </button>

            {/* Image */}
            <img
              src={filteredPhotos[currentImageIndex]?.src}
              alt={filteredPhotos[currentImageIndex]?.title}
              className="max-w-full max-h-[80vh] object-contain"
            />

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="bg-black bg-opacity-50 rounded-lg p-4">
                <h3 className="text-xl font-bold mb-2">
                  {filteredPhotos[currentImageIndex]?.title}
                </h3>
                <p className="text-gray-200 mb-2">
                  {filteredPhotos[currentImageIndex]?.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="px-2 py-1 bg-blue-600 rounded text-sm">
                    {filteredPhotos[currentImageIndex]?.category}
                  </span>
                  <span className="text-sm text-gray-300">
                    {currentImageIndex + 1} of {filteredPhotos.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Click outside to close */}
          <div className="absolute inset-0 -z-10" onClick={closeLightbox}></div>
        </div>
      )}
    </div>
  );
};

export default Activities;
