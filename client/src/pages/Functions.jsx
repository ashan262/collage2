import React, { useState, useCallback } from "react";
import {
  Calendar,
  Users,
  Award,
  Star,
  Clock,
  MapPin,
  Camera,
  Music,
  Heart,
  Gift,
  Trophy,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Functions = () => {
  const [activitySlides, setActivitySlides] = useState({});

  const annualFunctions = React.useMemo(() => [
    {
      id: 1,
      title: "Founder's Day Celebration",
      date: "October 17, 2025",
      description:
        "Annual celebration honoring Sir Syed Ahmed Khan and the college's founding principles",
      venue: "College Main Auditorium",
      duration: "Full Day Event",
      highlights: [
        "Academic achievement awards ceremony",
        "Cultural performances by students",
        "Guest lectures by distinguished alumni",
        "Traditional cake cutting ceremony",
        "Photo exhibition of college history",
      ],
      chiefGuest: "Dr. Muhammad Aslam (Education Secretary)",
      expectedAttendees: "1000+",
      icon: <Award size={32} />,
      color: "blue",
      images: [
        "/api/placeholder/400/250", // Main content slide
        "/api/placeholder/400/250?founder1",
        "/api/placeholder/400/250?founder2",
        "/api/placeholder/400/250?founder3",
        "/api/placeholder/400/250?founder4",
      ],
    },
    {
      id: 2,
      title: "Annual Prize Distribution",
      date: "March 30, 2025",
      description:
        "Grand ceremony to recognize academic excellence and extracurricular achievements",
      venue: "College Sports Ground",
      duration: "4 hours",
      highlights: [
        "Academic merit awards",
        "Sports achievements recognition",
        "Cultural and literary prizes",
        "Best teacher awards",
        "Alumni achievement awards",
      ],
      chiefGuest: "Justice Retired Muhammad Iqbal",
      expectedAttendees: "2000+",
      icon: <Trophy size={32} />,
      color: "gold",
      images: [
        "/api/placeholder/400/250", // Main content slide
        "/api/placeholder/400/250?prize1",
        "/api/placeholder/400/250?prize2",
        "/api/placeholder/400/250?prize3",
        "/api/placeholder/400/250?prize4",
      ],
    },
    {
      id: 3,
      title: "Graduation Ceremony",
      date: "May 15, 2025",
      description:
        "Convocation ceremony for graduating students and degree conferment",
      venue: "College Main Hall",
      duration: "3 hours",
      highlights: [
        "Degree conferment ceremony",
        "Valedictorian speeches",
        "Academic procession",
        "Distinguished alumni address",
        "Group photography session",
      ],
      chiefGuest: "Prof. Dr. Tariq Banuri (Educationist)",
      expectedAttendees: "800+",
      icon: <GraduationCap size={32} />,
      color: "purple",
      images: [
        "/api/placeholder/400/250", // Main content slide
        "/api/placeholder/400/250?graduation1",
        "/api/placeholder/400/250?graduation2",
        "/api/placeholder/400/250?graduation3",
      ],
    },
  ], []);

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
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
        {/* Image Carousel Container */}
        <div className="relative h-48 overflow-hidden">
          {/* Image Slides */}
          <div
            className="flex transition-transform duration-1000 ease-in-out h-full"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              willChange: "transform",
            }}
          >
            {/* First slide: Content slide with activity info */}
            <div
              className={`w-full h-full flex-shrink-0 bg-gradient-to-br from-${activity.color}-500 to-${activity.color}-600 flex items-center justify-center relative`}
            >
              <div className="text-center text-white p-4">
                <div className="mb-3">{activity.icon}</div>
                <h3 className="text-lg font-bold mb-2">{activity.title}</h3>
                <p className="text-white text-opacity-80 text-sm">
                  {activity.date}
                </p>
                {/* Slide counter for debugging */}
                <p className="text-white text-opacity-60 text-xs mt-2">
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
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-full p-2 transition-all duration-200 opacity-70 group-hover:opacity-100 z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={onNextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-full p-2 transition-all duration-200 opacity-70 group-hover:opacity-100 z-10"
          >
            <ChevronRight size={20} />
          </button>

          {/* Slide Indicators - More Prominent */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {activity.images.map((_, index) => (
              <button
                key={index}
                onClick={() => onSlideSelect(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 border-2 border-white ${
                  currentSlide === index
                    ? "bg-white scale-125 shadow-lg"
                    : "bg-white bg-opacity-50 hover:bg-opacity-80"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span
              className={`px-3 py-1 bg-${activity.color}-100 text-${activity.color}-800 text-sm font-medium rounded-full`}
            >
              Function
            </span>
            <div className="text-xs text-gray-400">
              {isFirstSlide
                ? "Info"
                : `Photo ${currentSlide}/${activity.images.length - 1}`}
            </div>
          </div>
          <p className="text-gray-700 mb-4 line-clamp-3">
            {activity.description}
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Venue: </span>
              <span className="text-gray-800">{activity.venue}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Duration: </span>
              <span className="text-gray-800">{activity.duration}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Chief Guest: </span>
              <span className="text-gray-800">{activity.chiefGuest}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Attendees: </span>
              <span className="text-gray-800">
                {activity.expectedAttendees}
              </span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Highlights:</h4>
            <ul className="space-y-1">
              {activity.highlights.slice(0, 3).map((highlight, hIndex) => (
                <li key={hIndex} className="flex items-start">
                  <span
                    className={`w-2 h-2 bg-${activity.color}-600 rounded-full mr-2 mt-2 flex-shrink-0`}
                  ></span>
                  <span className="text-sm text-gray-700">{highlight}</span>
                </li>
              ))}
              {activity.highlights.length > 3 && (
                <li className="text-sm text-gray-500 ml-4">
                  +{activity.highlights.length - 3} more...
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // Initialize carousel states for each activity
  React.useEffect(() => {
    const initialSlides = {};
    annualFunctions.forEach((activity) => {
      initialSlides[activity.id] = 0;
    });
    setActivitySlides(initialSlides);
  }, [annualFunctions]);

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
      annualFunctions.forEach((activity) => {
        nextActivitySlide(activity.id, activity.images.length);
      });
    }, 3000); // Changed to 3 seconds for more obvious effect

    return () => clearInterval(interval);
  }, [nextActivitySlide, annualFunctions]);

  const culturalFunctions = [
    {
      function: "Jashn-e-Baharan (Spring Festival)",
      date: "February 14, 2025",
      type: "Cultural Event",
      activities: [
        "Traditional music performances",
        "Poetry recitation (Mushaira)",
        "Folk dance presentations",
        "Flower exhibition",
        "Cultural food stalls",
      ],
      organizer: "Cultural Society",
      venue: "College Garden Area",
    },
    {
      function: "Eid Milan Party",
      date: "Post Eid celebrations",
      type: "Religious/Cultural",
      activities: [
        "Community Eid prayers",
        "Traditional feast",
        "Gift exchange ceremony",
        "Children's activities",
        "Unity and brotherhood message",
      ],
      organizer: "Islamic Studies Department",
      venue: "College Main Ground",
    },
    {
      function: "Independence Day Ceremony",
      date: "August 14, 2025",
      type: "National Event",
      activities: [
        "Flag hoisting ceremony",
        "National anthem singing",
        "Patriotic speeches",
        "Cultural parade",
        "Freedom fighters tribute",
      ],
      organizer: "Pakistan Studies Department",
      venue: "College Front Lawn",
    },
  ];

  const academicFunctions = [
    {
      event: "Science Exhibition",
      date: "January 20-22, 2025",
      description:
        "Three-day exhibition showcasing student research and scientific projects",
      participants: "All Science Students",
      highlights: [
        "Physics experiments demonstration",
        "Chemistry lab innovations",
        "Biology research presentations",
        "Mathematics modeling projects",
        "Technology showcase",
      ],
    },
    {
      event: "Literary Festival",
      date: "November 25-26, 2024",
      description: "Celebration of literature, poetry, and creative writing",
      participants: "All Students",
      highlights: [
        "Poetry competition (Urdu & English)",
        "Short story writing contest",
        "Debate competitions",
        "Book fair and exhibitions",
        "Meet the author sessions",
      ],
    },
    {
      event: "Career Guidance Seminar",
      date: "December 10, 2024",
      description: "Professional guidance for students' future career planning",
      participants: "Final Year Students",
      highlights: [
        "University admission guidance",
        "Career counseling sessions",
        "Industry expert talks",
        "CV writing workshops",
        "Interview preparation",
      ],
    },
  ];

  const pastEvents = [
    {
      year: "2024",
      events: [
        {
          name: "Silver Jubilee Celebration",
          date: "September 15, 2024",
          description:
            "Grand celebration marking 25 years of educational excellence",
          attendees: "3000+",
          chiefGuest: "Governor Punjab",
        },
        {
          name: "Annual Sports Gala",
          date: "March 20, 2024",
          description:
            "Inter-house sports competitions and athletic achievements",
          attendees: "1500+",
          chiefGuest: "Olympic Medalist Arshad Nadeem",
        },
      ],
    },
    {
      year: "2023",
      events: [
        {
          name: "International Mother Language Day",
          date: "February 21, 2023",
          description:
            "Celebration of linguistic diversity and cultural heritage",
          attendees: "800+",
          chiefGuest: "Renowned Linguist Dr. Fatima Ahmed",
        },
        {
          name: "Teachers Appreciation Day",
          date: "October 5, 2023",
          description: "Honoring educators and their contributions to society",
          attendees: "500+",
          chiefGuest: "Education Minister Punjab",
        },
      ],
    },
  ];

  const eventGallery = [
    {
      event: "Founder's Day 2024",
      images: 45,
      description:
        "Memorable moments from last year's founder's day celebration",
    },
    {
      event: "Cultural Night 2024",
      images: 78,
      description: "Vibrant cultural performances and student talents showcase",
    },
    {
      event: "Graduation Ceremony 2024",
      images: 120,
      description: "Proud moments of our graduating class achievements",
    },
    {
      event: "Sports Day 2024",
      images: 95,
      description: "Athletic competitions and sporting excellence display",
    },
  ];

  const organizingCommittees = [
    {
      committee: "Academic Events Committee",
      head: "Dr. Ali Hassan (Vice Principal)",
      members: 8,
      responsibilities: "Organizes all academic functions and ceremonies",
    },
    {
      committee: "Cultural Activities Committee",
      head: "Ms. Fatima Khan (Cultural Coordinator)",
      members: 12,
      responsibilities: "Plans and executes cultural events and celebrations",
    },
    {
      committee: "Sports Events Committee",
      head: "Mr. Shahid Ali (Sports Coordinator)",
      members: 6,
      responsibilities: "Manages all sports-related functions and competitions",
    },
    {
      committee: "Student Affairs Committee",
      head: "Ms. Ayesha Malik (Student Affairs Officer)",
      members: 10,
      responsibilities: "Oversees student-led events and activities",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            College Functions
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-8">
            Celebrating achievements, culture, and community through memorable
            events
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-lg font-semibold mb-2">
              Building Memories Together
            </p>
            <p className="text-indigo-100">
              Creating lasting bonds through shared celebrations and
              achievements
            </p>
          </div>
        </div>
      </div>

      {/* Annual Functions */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
            Major Annual Functions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Grand celebrations that mark important milestones in our academic
            calendar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {annualFunctions.map((func) => (
            <ActivityCard
              key={func.id}
              activity={func}
              currentSlide={activitySlides[func.id] || 0}
              onNextSlide={() => nextActivitySlide(func.id, func.images.length)}
              onPrevSlide={() => prevActivitySlide(func.id, func.images.length)}
              onSlideSelect={(slideIndex) =>
                selectActivitySlide(func.id, slideIndex)
              }
            />
          ))}
        </div>
      </div>

      {/* Cultural Functions */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
              Cultural & Religious Functions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Celebrating our rich cultural heritage and religious values
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {culturalFunctions.map((func, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Music className="text-purple-600 mr-3" size={20} />
                  <div>
                    <h3 className="text-lg font-heading font-bold text-gray-800">
                      {func.function}
                    </h3>
                    <p className="text-sm text-gray-600">{func.date}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                    {func.type}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Activities:
                    </h4>
                    <ul className="space-y-1">
                      {func.activities.map((activity, aIndex) => (
                        <li
                          key={aIndex}
                          className="text-sm text-gray-600 flex items-start"
                        >
                          <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">
                      Organizer:{" "}
                    </span>
                    <span className="text-gray-600">{func.organizer}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Venue: </span>
                    <span className="text-gray-600">{func.venue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Academic Functions */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
            Academic Functions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Educational events that enhance learning and showcase student
            achievements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {academicFunctions.map((func, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Award className="text-blue-600 mr-3" size={20} />
                <div>
                  <h3 className="text-lg font-heading font-bold text-gray-800">
                    {func.event}
                  </h3>
                  <p className="text-sm text-gray-600">{func.date}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-3 text-sm">{func.description}</p>

              <div className="mb-3">
                <span className="text-sm font-medium text-gray-600">
                  Participants:{" "}
                </span>
                <span className="text-sm text-gray-800">
                  {func.participants}
                </span>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">Highlights:</h4>
                <ul className="space-y-1">
                  {func.highlights.map((highlight, hIndex) => (
                    <li
                      key={hIndex}
                      className="text-sm text-gray-600 flex items-start"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Events */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
              Past Events & Memories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Memorable moments from our previous celebrations and achievements
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {pastEvents.map((yearData, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-heading font-bold text-gray-800 mb-4 text-center">
                  {yearData.year} Events
                </h3>
                <div className="space-y-4">
                  {yearData.events.map((event, eIndex) => (
                    <div
                      key={eIndex}
                      className="bg-white rounded-lg p-4 border-l-4 border-indigo-600"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {event.name}
                        </h4>
                        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                          {event.attendees}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{event.date}</p>
                      <p className="text-sm text-gray-700 mb-2">
                        {event.description}
                      </p>
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">Chief Guest: </span>
                        {event.chiefGuest}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Gallery */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
            Event Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Captured moments from our memorable functions and celebrations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventGallery.map((gallery, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-40 bg-gray-200 flex items-center justify-center">
                <Camera size={32} className="text-gray-400" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-heading font-bold text-gray-800 mb-2">
                  {gallery.event}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {gallery.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    {gallery.images} Photos
                  </span>
                  <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
                    View Gallery
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Organizing Committees */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
              Organizing Committees
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated teams working behind the scenes to make events
              successful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {organizingCommittees.map((committee, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-heading font-bold text-gray-800">
                    {committee.committee}
                  </h3>
                  <span className="bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded">
                    {committee.members} Members
                  </span>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Committee Head:
                    </span>
                    <p className="text-sm text-gray-800">{committee.head}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Responsibilities:
                    </span>
                    <p className="text-sm text-gray-700">
                      {committee.responsibilities}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Be Part of Our Celebrations
          </h3>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join us in creating memorable moments and celebrating achievements
            together as one community
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View Event Calendar
            </button>
            <button className="bg-indigo-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-900 transition-colors">
              Join Planning Committee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Functions;
