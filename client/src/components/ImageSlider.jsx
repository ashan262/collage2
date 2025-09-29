import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const ImageSlider = ({
  images,
  alt = "News image",
  className = "",
  showThumbnails = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle case when no images or empty array
  if (!images || images.length === 0) {
    return null;
  }

  // For single image, show simple image without controls
  if (images.length === 1) {
    return (
      <div className={`relative ${className}`}>
        <div
          className="relative overflow-hidden rounded-lg bg-gray-100"
          style={{ aspectRatio: "16/9" }}
        >
          <img
            src={images[0].url || images[0]}
            alt={images[0].alt || alt}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setIsFullscreen(true)}
          />
        </div>

        {/* Fullscreen modal */}
        {isFullscreen && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-screen-lg max-h-screen">
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <X className="h-8 w-8" />
              </button>
              <img
                src={images[0].url || images[0]}
                alt={images[0].alt || alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  const currentImage = images[currentIndex];

  return (
    <div className={`relative ${className}`}>
      {/* Main image */}
      <div
        className="relative overflow-hidden rounded-lg bg-gray-100"
        style={{ aspectRatio: "16/9" }}
      >
        <img
          src={currentImage.url || currentImage}
          alt={currentImage.alt || `${alt} ${currentIndex + 1}`}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => setIsFullscreen(true)}
        />

        {/* Navigation arrows */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
          aria-label="Next image"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Image counter */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm z-10">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-12 h-12 rounded border-2 overflow-hidden transition-all ${
                index === currentIndex
                  ? "border-blue-500 ring-1 ring-blue-200"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <img
                src={image.url || image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-screen-lg max-h-screen">
            {/* Close button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Navigation in fullscreen */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all z-10"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all z-10"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Image counter in fullscreen */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded text-lg z-10">
                  {currentIndex + 1} / {images.length}
                </div>
              </>
            )}

            <img
              src={currentImage.url || currentImage}
              alt={currentImage.alt || `${alt} ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
