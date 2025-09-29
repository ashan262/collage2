import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { galleryAPI } from "../services/apiService";
import { getImageUrl } from "../utils/imageUtils";

// Default slides for fallback
const defaultSlides = [
  {
    id: 1,
    title: "Welcome to F.G Degree College For Boys Kohat",
    subtitle: "Symbol of Excellence",
    description:
      "F.G Degree College For Boys Kohat - Providing quality education and nurturing future leaders in Kohat region.",
    cta: { text: "Learn More", link: "/about" },
    backgroundImage: null,
  },
  {
    id: 2,
    title: "Academic Excellence",
    subtitle: "Comprehensive Education Programs",
    description:
      "Offering FSc, ICS, ICom, and FA programs with experienced faculty and modern facilities.",
    cta: { text: "View Programs", link: "/admissions" },
    backgroundImage: null,
  },
  {
    id: 3,
    title: "Modern Facilities",
    subtitle: "State-of-the-Art Learning Environment",
    description:
      "Well-equipped laboratories, library, sports facilities, and technology-enhanced classrooms.",
    cta: { text: "Explore Campus", link: "/about" },
    backgroundImage: null,
  },
  {
    id: 4,
    title: "Bright Future Ahead",
    subtitle: "Excellence in Education Since Establishment",
    description:
      "Preparing students for success in higher education and professional careers with our comprehensive programs.",
    cta: { text: "Join Us", link: "/admissions" },
    backgroundImage: null,
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState(defaultSlides);

  // Fetch gallery images for carousel
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setLoading(true);

        // Try to fetch from multiple categories for variety
        const categories = ["campus", "events", "facilities", "achievements"];
        let allGalleryImages = [];

        // Fetch from all categories
        const response = await galleryAPI.getAll();
        if (response.success && response.data.length > 0) {
          // Filter by categories if available
          for (const category of categories) {
            const categoryImages = response.data.filter(
              (img) =>
                img.category &&
                img.category.toLowerCase() === category.toLowerCase()
            );
            allGalleryImages = [...allGalleryImages, ...categoryImages]; // 2 from each category
          }

          // If no categorized images, take random images
          if (allGalleryImages.length === 0) {
            allGalleryImages = response.data.slice(0, 8);
          }
        }

        if (allGalleryImages.length > 0) {
          // Create dynamic slides entirely from gallery data
          const gallerySlides = allGalleryImages.map((galleryImage, index) => ({
            id: galleryImage._id || index + 1,
            title:
              galleryImage.title ||
              `${
                galleryImage.category
                  ? galleryImage.category.charAt(0).toUpperCase() +
                    galleryImage.category.slice(1)
                  : "Campus"
              } Gallery`,
            subtitle: galleryImage.category
              ? galleryImage.category.charAt(0).toUpperCase() +
                galleryImage.category.slice(1)
              : "Campus Life",
            description:
              galleryImage.description ||
              "Explore our beautiful campus and vibrant college life",
            cta: { text: "View Gallery", link: "/gallery" },
            backgroundImage: galleryImage.image?.url
              ? getImageUrl(galleryImage.image.url)
              : galleryImage.image?.filename
              ? `http://localhost:5000/uploads/gallery/${galleryImage.image.filename}`
              : null,
            isGalleryImage: true,
            category: galleryImage.category,
          }));

          // Shuffle for variety
          const shuffledSlides = gallerySlides.sort(() => Math.random() - 0.5);
          setSlides(shuffledSlides.slice(0, 6)); // Limit to 6 for performance
        } else {
          // No gallery images found, use default slides
          setSlides(defaultSlides);
        }
      } catch (error) {
        console.error("Error fetching gallery images:", error);
        // Keep default slides on error
        setSlides(defaultSlides);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => setCurrentSlide(index);
  const goToPrevious = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  if (loading) {
    return (
      <div className="relative h-96 md:h-[28rem] bg-blue-600 overflow-hidden flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-96 md:h-[28rem] bg-blue-600 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
          style={{
            backgroundImage: slide.backgroundImage
              ? `url(${slide.backgroundImage})`
              : "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Show text content only for default slides (no gallery images) */}
          {!slide.isGalleryImage && !slide.backgroundImage && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-4xl mx-auto z-10">
                <h1 className="text-2xl md:text-4xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h1>
                <h2 className="text-lg md:text-xl mb-4 text-blue-100 drop-shadow-md">
                  {slide.subtitle}
                </h2>
                <p className="text-sm md:text-base mb-6 text-gray-200 max-w-2xl mx-auto drop-shadow-md">
                  {slide.description}
                </p>
                <a
                  href={slide.cta.link}
                  className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  {slide.cta.text}
                </a>
              </div>
            </div>
          )}

          {/* Optional: Show minimal overlay for gallery images */}
          {slide.isGalleryImage && (
            <div className="absolute bottom-6 left-6 text-white z-10">
              <div className="bg-black bg-opacity-40 rounded-lg px-3 py-2 backdrop-blur-sm">
                <h3 className="text-base font-semibold">{slide.title}</h3>
                {slide.description && (
                  <p className="text-xs text-gray-200 mt-1">
                    {slide.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
