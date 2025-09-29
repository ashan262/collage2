import React from "react";
import { ChevronRight } from "lucide-react";

const PageHero = ({
  title,
  subtitle,
  description,
  backgroundImage,
  breadcrumbs = [],
  height = "h-64 md:h-80",
  overlay = "bg-black bg-opacity-50",
}) => {
  return (
    <div className={`relative ${height} bg-blue-600 overflow-hidden`}>
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
      )}

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlay}`} />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <h2 className="text-lg md:text-xl mb-4 text-blue-100 drop-shadow-md">
              {subtitle}
            </h2>
          )}

          {/* Description */}
          {description && (
            <p className="text-sm md:text-base text-gray-200 max-w-2xl mx-auto drop-shadow-md">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Breadcrumbs - Left Bottom */}
      {breadcrumbs.length > 0 && (
        <nav className="absolute bottom-4 left-4 z-20">
          <ol className="flex items-center space-x-1 text-sm text-blue-100 bg-black bg-opacity-30 rounded-lg px-3 py-2 backdrop-blur-sm">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={index} className="flex items-center">
                {breadcrumb.href ? (
                  <a
                    href={breadcrumb.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {breadcrumb.label}
                  </a>
                ) : (
                  <span className="text-white font-medium">
                    {breadcrumb.label}
                  </span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className="ml-1 mr-1 w-3 h-3 text-gray-300" />
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
};

export default PageHero;
