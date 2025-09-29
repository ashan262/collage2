import React, { useState, useCallback } from "react";
import {
  BookOpen,
  Award,
  Users,
  Calendar,
  Clock,
  Target,
  Star,
  Trophy,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const AcademicActivities = () => {
  const [activitySlides, setActivitySlides] = useState({});

  const academicPrograms = React.useMemo(() => [
    {
      id: 1,
      title: "Science Fair",
      description:
        "Annual science exhibition showcasing student research projects and innovations",
      date: "March 15-17, 2025",
      participants: "All Science Students",
      icon: <BookOpen size={32} />,
      color: "blue",
      images: [
        "/api/placeholder/400/250", // Main content slide
        "/api/placeholder/400/250?science1",
        "/api/placeholder/400/250?science2",
        "/api/placeholder/400/250?science3",
        "/api/placeholder/400/250?science4",
      ],
      highlights: [
        "Physics demonstrations and experiments",
        "Chemistry lab innovations",
        "Biology research projects",
        "Computer science applications",
        "Mathematics modeling projects",
      ],
    },
    {
      id: 2,
      title: "Academic Olympiads",
      description:
        "Competitive academic contests in various subjects to identify and nurture talent",
      date: "Ongoing throughout the year",
      participants: "Selected Students",
      icon: <Trophy size={32} />,
      color: "yellow",
      images: [
        "/api/placeholder/400/250", // Main content slide
        "/api/placeholder/400/250?olympiad1",
        "/api/placeholder/400/250?olympiad2",
        "/api/placeholder/400/250?olympiad3",
        "/api/placeholder/400/250?olympiad4",
      ],
      highlights: [
        "Mathematics Olympiad",
        "Physics Olympiad",
        "Chemistry Olympiad",
        "Computer Science Olympiad",
        "Biology Olympiad",
      ],
    },
    {
      id: 3,
      title: "Debate Competition",
      description:
        "Inter-class and inter-college debate competitions to enhance communication skills",
      date: "Monthly competitions",
      participants: "All Students",
      icon: <Users size={32} />,
      color: "green",
      images: [
        "/api/placeholder/400/250", // Main content slide
        "/api/placeholder/400/250?debate1",
        "/api/placeholder/400/250?debate2",
        "/api/placeholder/400/250?debate3",
      ],
      highlights: [
        "English debate competitions",
        "Urdu debate sessions",
        "Current affairs discussions",
        "Parliamentary debate style",
        "Public speaking workshops",
      ],
    },
    {
      id: 4,
      title: "Quiz Competitions",
      description:
        "Knowledge-based competitions covering various academic subjects",
      date: "Bi-weekly events",
      participants: "All Classes",
      icon: <Star size={32} />,
      color: "purple",
      images: [
        "/api/placeholder/400/250", // Main content slide
        "/api/placeholder/400/250?quiz1",
        "/api/placeholder/400/250?quiz2",
        "/api/placeholder/400/250?quiz3",
        "/api/placeholder/400/250?quiz4",
      ],
      highlights: [
        "General knowledge quiz",
        "Subject-specific quizzes",
        "Current affairs quiz",
        "Islamic studies quiz",
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
              Academic
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
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-600">
              Participants:
            </span>
            <span className="text-sm text-gray-800">
              {activity.participants}
            </span>
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
    academicPrograms.forEach((activity) => {
      initialSlides[activity.id] = 0;
    });
    setActivitySlides(initialSlides);
  }, [academicPrograms]);

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
      academicPrograms.forEach((activity) => {
        nextActivitySlide(activity.id, activity.images.length);
      });
    }, 3000); // Changed to 3 seconds for more obvious effect

    return () => clearInterval(interval);
  }, [nextActivitySlide, academicPrograms]);

  const academicSocieties = [
    {
      name: "Literary Society",
      purpose: "Promote literature, creative writing, and language skills",
      activities: [
        "Poetry recitation",
        "Story writing",
        "Book clubs",
        "Literary magazines",
      ],
      meetingDay: "Every Friday",
      coordinator: "Ms. Farah Ahmed (English Department)",
    },
    {
      name: "Science Society",
      purpose: "Foster scientific thinking and research methodology",
      activities: [
        "Science projects",
        "Research presentations",
        "Lab experiments",
        "Science seminars",
      ],
      meetingDay: "Every Wednesday",
      coordinator: "Dr. Ali Hassan (Physics Department)",
    },
    {
      name: "Mathematics Club",
      purpose: "Develop problem-solving skills and mathematical thinking",
      activities: [
        "Math puzzles",
        "Problem solving",
        "Math competitions",
        "Peer tutoring",
      ],
      meetingDay: "Every Tuesday",
      coordinator: "Mr. Usman Khan (Mathematics Department)",
    },
    {
      name: "Computer Science Club",
      purpose: "Promote programming skills and technology awareness",
      activities: [
        "Coding competitions",
        "Tech workshops",
        "Software projects",
        "IT seminars",
      ],
      meetingDay: "Every Thursday",
      coordinator: "Ms. Zainab Ali (Computer Science Department)",
    },
  ];

  const academicCompetitions = [
    {
      competition: "Inter-College Science Competition",
      date: "April 20, 2025",
      venue: "College Auditorium",
      categories: ["Physics", "Chemistry", "Biology", "Mathematics"],
      prizes: "Certificates and cash prizes for top 3 positions",
      registrationDeadline: "April 10, 2025",
    },
    {
      competition: "English Essay Writing Contest",
      date: "February 28, 2025",
      venue: "College Library",
      categories: [
        "Creative Writing",
        "Analytical Essays",
        "Descriptive Writing",
      ],
      prizes: "Books and certificates for winners",
      registrationDeadline: "February 20, 2025",
    },
    {
      competition: "Mathematics Problem Solving Challenge",
      date: "January 25, 2025",
      venue: "Mathematics Department",
      categories: ["Algebra", "Geometry", "Calculus", "Statistics"],
      prizes: "Scientific calculators and certificates",
      registrationDeadline: "January 18, 2025",
    },
  ];

  const studyGroups = [
    {
      subject: "Advanced Mathematics",
      time: "4:00 PM - 5:30 PM",
      days: "Monday, Wednesday, Friday",
      instructor: "Mr. Ahmad Raza",
      level: "Pre-Engineering & BS Mathematics",
    },
    {
      subject: "English Language & Literature",
      time: "3:00 PM - 4:30 PM",
      days: "Tuesday, Thursday",
      instructor: "Ms. Sarah Khan",
      level: "All Programs",
    },
    {
      subject: "Computer Programming",
      time: "5:00 PM - 6:30 PM",
      days: "Monday, Thursday",
      instructor: "Mr. Hassan Ali",
      level: "ICS & BS Computer Science",
    },
    {
      subject: "Physics Problem Solving",
      time: "2:00 PM - 3:30 PM",
      days: "Tuesday, Friday",
      instructor: "Dr. Fatima Sheikh",
      level: "Pre-Engineering & Pre-Medical",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Academic Activities
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Enhancing learning through diverse academic programs and
            competitions
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-lg font-semibold mb-2">
              Excellence in Education
            </p>
            <p className="text-blue-100">
              Fostering intellectual growth and academic achievement
            </p>
          </div>
        </div>
      </div>

      {/* Academic Programs */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
            Academic Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive academic activities designed to enhance learning and
            intellectual development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {academicPrograms.map((program) => (
            <ActivityCard
              key={program.id}
              activity={program}
              currentSlide={activitySlides[program.id] || 0}
              onNextSlide={() =>
                nextActivitySlide(program.id, program.images.length)
              }
              onPrevSlide={() =>
                prevActivitySlide(program.id, program.images.length)
              }
              onSlideSelect={(slideIndex) =>
                selectActivitySlide(program.id, slideIndex)
              }
            />
          ))}
        </div>
      </div>

      {/* Academic Societies */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
              Academic Societies
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Student-led societies promoting academic excellence and
              subject-specific interests
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {academicSocieties.map((society, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-3">
                  <Award className="text-indigo-600 mr-3" size={20} />
                  <h3 className="text-lg font-heading font-bold text-gray-800">
                    {society.name}
                  </h3>
                </div>

                <p className="text-gray-700 mb-3 text-sm">{society.purpose}</p>

                <div className="space-y-2 mb-3">
                  <div>
                    <span className="text-xs font-medium text-gray-600">
                      Activities:
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {society.activities.map((activity, aIndex) => (
                        <span
                          key={aIndex}
                          className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <Calendar className="mr-1" size={12} />
                    <span>Meetings: {society.meetingDay}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1" size={12} />
                    <span>Coordinator: {society.coordinator}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Competitions */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
            Upcoming Academic Competitions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Competitive events to showcase academic talents and skills
          </p>
        </div>

        <div className="space-y-6">
          {academicCompetitions.map((competition, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-heading font-bold text-gray-800 mb-2">
                    {competition.competition}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="mr-1" size={14} />
                      {competition.date}
                    </div>
                    <div className="flex items-center">
                      <Target className="mr-1" size={14} />
                      {competition.venue}
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Registration Open
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Categories:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {competition.categories.map((category, cIndex) => (
                      <li key={cIndex} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Prizes:</h4>
                  <p className="text-sm text-gray-600">{competition.prizes}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Registration Deadline:
                  </h4>
                  <p className="text-sm text-red-600 font-medium">
                    {competition.registrationDeadline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study Groups */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
              Academic Study Groups
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Collaborative learning sessions for enhanced academic performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyGroups.map((group, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-600"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-heading font-bold text-gray-800">
                    {group.subject}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {group.level}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="mr-2" size={14} />
                    <span>{group.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="mr-2" size={14} />
                    <span>{group.days}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="mr-2" size={14} />
                    <span>Instructor: {group.instructor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Join Our Academic Activities
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Participate in our diverse academic programs to enhance your
            learning experience and showcase your talents
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View Academic Calendar
            </button>
            <button className="bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors">
              Register for Competitions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicActivities;
