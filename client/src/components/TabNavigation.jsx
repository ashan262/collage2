import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";

const TabNavigation = ({
  tabs,
  activeTab,
  onTabChange,
  variant = "default",
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef(null);

  // Check scroll position
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);
      return () => {
        container.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
  }, [tabs]);

  // Get current tab label for mobile dropdown
  const getCurrentTabLabel = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTab);
    return currentTab ? currentTab.label : tabs[0]?.label || "Select Tab";
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const baseButtonClasses =
    "flex items-center space-x-2 px-4 py-3 font-medium transition-all duration-200 whitespace-nowrap";
  const activeClasses =
    variant === "pills"
      ? "bg-blue-600 text-white rounded-lg shadow-md transform scale-105"
      : "bg-blue-600 text-white border-b-2 border-blue-600";
  const inactiveClasses =
    variant === "pills"
      ? "text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50";

  return (
    <div className="container mx-auto px-4 mb-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Mobile Dropdown */}
        <div className="md:hidden">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full flex items-center justify-between px-4 py-3 text-gray-700 border-b border-gray-200"
          >
            <div className="flex items-center space-x-2">
              <Menu size={18} />
              <span className="font-medium">{getCurrentTabLabel()}</span>
            </div>
            <ChevronRight
              size={18}
              className={`transform transition-transform ${
                showDropdown ? "rotate-90" : ""
              }`}
            />
          </button>

          {showDropdown && (
            <div className="border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    setShowDropdown(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab.icon && <tab.icon size={18} />}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block relative">
          {/* Scroll Buttons */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-0 z-10 h-full px-2 bg-gradient-to-r from-white to-transparent flex items-center"
            >
              <ChevronLeft
                size={20}
                className="text-gray-600 hover:text-gray-800"
              />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-0 z-10 h-full px-2 bg-gradient-to-l from-white to-transparent flex items-center"
            >
              <ChevronRight
                size={20}
                className="text-gray-600 hover:text-gray-800"
              />
            </button>
          )}

          {/* Scrollable Tab Container */}
          <div
            ref={scrollContainerRef}
            className={`flex overflow-x-auto scrollbar-hide ${
              variant === "pills" ? "p-2 space-x-2" : "border-b border-gray-200"
            }`}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`${baseButtonClasses} ${
                  activeTab === tab.id ? activeClasses : inactiveClasses
                }`}
              >
                {tab.icon && <tab.icon size={18} />}
                <span className="text-sm lg:text-base">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Count Indicator */}
        <div className="hidden lg:flex justify-center py-2 text-xs text-gray-500">
          <span>
            {tabs.findIndex((tab) => tab.id === activeTab) + 1} of {tabs.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
