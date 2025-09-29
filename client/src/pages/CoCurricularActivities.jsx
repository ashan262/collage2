import React, { useState, useCallback } from "react";
import {
  Music,
  Palette,
  Camera,
  Mic,
  Users,
  Calendar,
  Clock,
  Award,
  Star,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const CoCurricularActivities = () => {
  const [activitySlides, setActivitySlides] = useState({});

  const coCurricularPrograms = React.useMemo(
    () => [
      {
        id: 1,
        title: "Music & Arts Club",
        description:
          "Develop musical talents and artistic skills through various programs",
        icon: <Music size={32} />,
        color: "pink",
        images: [
          "/api/placeholder/400/250", // Main content slide
          "/api/placeholder/400/250?music1",
          "/api/placeholder/400/250?music2",
          "/api/placeholder/400/250?music3",
          "/api/placeholder/400/250?music4",
        ],
        activities: [
          "Vocal music training",
          "Instrumental music classes",
          "Traditional folk music",
          "Qawwali and Naat recitation",
          "Music competitions",
        ],
        schedule: "Every Tuesday & Thursday, 4:00 PM - 6:00 PM",
        coordinator: "Ms. Ayesha Malik",
      },
      {
        id: 2,
        title: "Drama & Theatre Society",
        description:
          "Express creativity through dramatic performances and stage shows",
        icon: <Users size={32} />,
        color: "purple",
        images: [
          "/api/placeholder/400/250", // Main content slide
          "/api/placeholder/400/250?drama1",
          "/api/placeholder/400/250?drama2",
          "/api/placeholder/400/250?drama3",
          "/api/placeholder/400/250?drama4",
        ],
        activities: [
          "Stage play productions",
          "Street theatre performances",
          "Puppet shows",
          "Mime and acting workshops",
          "Annual drama festival",
        ],
        schedule: "Every Wednesday & Friday, 3:30 PM - 5:30 PM",
        coordinator: "Mr. Hassan Ali",
      },
      {
        id: 3,
        title: "Art & Calligraphy Club",
        description: "Explore visual arts and traditional Islamic calligraphy",
        icon: <Palette size={32} />,
        color: "green",
        images: [
          "/api/placeholder/400/250", // Main content slide
          "/api/placeholder/400/250?art1",
          "/api/placeholder/400/250?art2",
          "/api/placeholder/400/250?art3",
          "/api/placeholder/400/250?art4",
        ],
        activities: [
          "Painting and sketching",
          "Islamic calligraphy",
          "Poster designing",
          "Wall painting projects",
          "Art exhibitions",
        ],
        schedule: "Every Monday & Saturday, 2:00 PM - 4:00 PM",
        coordinator: "Ms. Fatima Khan",
      },
      {
        id: 4,
        title: "Photography Club",
        description: "Capture moments and develop photography skills",
        icon: <Camera size={32} />,
        color: "blue",
        images: [
          "/api/placeholder/400/250", // Main content slide
          "/api/placeholder/400/250?photo1",
          "/api/placeholder/400/250?photo2",
          "/api/placeholder/400/250?photo3",
        ],
        activities: [
          "Digital photography",
          "Photo editing workshops",
          "Nature photography",
          "Event documentation",
          "Photography exhibitions",
        ],
        schedule: "Every Friday, 3:00 PM - 5:00 PM",
        coordinator: "Mr. Usman Ahmed",
      },
    ],
    []
  );

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
                  {activity.schedule}
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
              Co-Curricular
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
              Coordinator:
            </span>
            <span className="text-sm text-gray-800">
              {activity.coordinator}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Activities:</h4>
            <ul className="space-y-1">
              {activity.activities.slice(0, 3).map((activityItem, aIndex) => (
                <li key={aIndex} className="flex items-start">
                  <span
                    className={`w-2 h-2 bg-${activity.color}-600 rounded-full mr-2 mt-2 flex-shrink-0`}
                  ></span>
                  <span className="text-sm text-gray-700">{activityItem}</span>
                </li>
              ))}
              {activity.activities.length > 3 && (
                <li className="text-sm text-gray-500 ml-4">
                  +{activity.activities.length - 3} more...
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
    coCurricularPrograms.forEach((activity) => {
      initialSlides[activity.id] = 0;
    });
    setActivitySlides(initialSlides);
  }, [coCurricularPrograms]);

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
      coCurricularPrograms.forEach((activity) => {
        nextActivitySlide(activity.id, activity.images.length);
      });
    }, 3000); // Changed to 3 seconds for more obvious effect

    return () => clearInterval(interval);
  }, [nextActivitySlide, coCurricularPrograms]);

  const culturalEvents = [
    {
      event: "Annual Cultural Day",
      date: "December 15, 2025",
      description:
        "A grand celebration showcasing diverse cultural traditions and talents",
      highlights: [
        "Traditional dance performances",
        "Cultural fashion show",
        "Folk music concerts",
        "Regional food stalls",
        "Art and craft exhibitions",
      ],
      participants: "All Students",
      venue: "College Main Ground",
    },
    {
      event: "Poetry Recitation Competition",
      date: "November 8, 2025",
      description:
        "Celebrating Urdu and English poetry through student performances",
      highlights: [
        "Classical Urdu poetry",
        "Modern English poetry",
        "Original compositions",
        "Ghazal recitation",
        "Hamd and Naat competition",
      ],
      participants: "All Classes",
      venue: "College Auditorium",
    },
    {
      event: "Talent Show",
      date: "October 20, 2025",
      description:
        "Platform for students to showcase their unique talents and skills",
      highlights: [
        "Singing competitions",
        "Stand-up comedy",
        "Magic shows",
        "Musical performances",
        "Creative presentations",
      ],
      participants: "Individual & Group",
      venue: "College Hall",
    },
  ];

  const clubMemberships = [
    {
      club: "Debate & Public Speaking Club",
      members: 45,
      activities: "Weekly debates, speech training, presentation skills",
      achievements: "Inter-college debate champions 2024",
      meetingTime: "Every Thursday, 4:00 PM",
    },
    {
      club: "Environmental Club",
      members: 38,
      activities: "Tree plantation, awareness campaigns, clean-up drives",
      achievements: "Best Environmental Initiative Award 2024",
      meetingTime: "Every Saturday, 10:00 AM",
    },
    {
      club: "Community Service Club",
      members: 52,
      activities: "Social work, charity drives, community outreach",
      achievements: "Outstanding Community Service Recognition",
      meetingTime: "Every Friday, 2:00 PM",
    },
    {
      club: "Islamic Studies Circle",
      members: 67,
      activities: "Quran recitation, Islamic discussions, religious events",
      achievements: "Best Naat competition winners 2024",
      meetingTime: "Every Tuesday, 1:00 PM",
    },
  ];

  const workshopsAndSeminars = [
    {
      title: "Creative Writing Workshop",
      date: "January 25, 2025",
      duration: "3 hours",
      instructor: "Ms. Sara Ahmed (Published Author)",
      topics: [
        "Story writing techniques",
        "Poetry composition",
        "Article writing",
        "Publishing process",
      ],
      fee: "Free for students",
    },
    {
      title: "Public Speaking Seminar",
      date: "February 15, 2025",
      duration: "4 hours",
      instructor: "Mr. Ali Hassan (Communication Expert)",
      topics: [
        "Presentation skills",
        "Confidence building",
        "Voice modulation",
        "Body language",
      ],
      fee: "Free for students",
    },
    {
      title: "Digital Art Workshop",
      date: "March 10, 2025",
      duration: "2 days",
      instructor: "Ms. Zainab Sheikh (Graphic Designer)",
      topics: [
        "Digital illustration",
        "Logo design",
        "Photo editing",
        "Animation basics",
      ],
      fee: "PKR 500 (Materials included)",
    },
  ];

  const studentAchievements = [
    {
      student: "Muhammad Ahmed Khan",
      class: "2nd Year Pre-Medical",
      achievement: "1st Position in Inter-College Urdu Poetry Competition",
      year: "2024",
    },
    {
      student: "Fatima Malik",
      class: "1st Year Pre-Engineering",
      achievement: "Best Actress Award in Annual Drama Festival",
      year: "2024",
    },
    {
      student: "Ali Hassan",
      class: "BS Computer Science",
      achievement: "Winner of Photography Competition - Nature Category",
      year: "2024",
    },
    {
      student: "Ayesha Ahmad",
      class: "2nd Year ICS",
      achievement: "Gold Medal in Calligraphy Competition",
      year: "2024",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Co-Curricular Activities
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-8">
            Nurturing creativity and talent through diverse cultural and
            artistic programs
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-lg font-semibold mb-2">Beyond Academics</p>
            <p className="text-purple-100">
              Developing well-rounded personalities through arts and culture
            </p>
          </div>
        </div>
      </div>

      {/* Co-Curricular Programs */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
            Creative Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore your artistic talents and develop creative skills through
            our diverse programs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {coCurricularPrograms.map((program) => (
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

      {/* Cultural Events */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
              Cultural Events
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Annual cultural celebrations and competitions that bring our
              community together
            </p>
          </div>

          <div className="space-y-8">
            {culturalEvents.map((event, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-gray-800 mb-2">
                      {event.event}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="mr-1" size={14} />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1" size={14} />
                        {event.participants}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      {event.venue}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{event.description}</p>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Event Highlights:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {event.highlights.map((highlight, hIndex) => (
                      <div key={hIndex} className="flex items-center">
                        <Star className="text-yellow-500 mr-2" size={14} />
                        <span className="text-sm text-gray-700">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Clubs */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
            Student Clubs & Societies
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our active student communities and develop leadership skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clubMemberships.map((club, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-heading font-bold text-gray-800">
                  {club.club}
                </h3>
                <span className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded">
                  {club.members} members
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Activities:
                  </span>
                  <p className="text-sm text-gray-700">{club.activities}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Recent Achievement:
                  </span>
                  <p className="text-sm text-green-700 font-medium">
                    {club.achievements}
                  </p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="mr-2" size={14} />
                  <span>Meetings: {club.meetingTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workshops & Seminars */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
              Workshops & Seminars
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Skill development workshops conducted by industry experts
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {workshopsAndSeminars.map((workshop, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-heading font-bold text-gray-800 mb-2">
                  {workshop.title}
                </h3>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="mr-2" size={14} />
                    <span>{workshop.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="mr-2" size={14} />
                    <span>{workshop.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="mr-2" size={14} />
                    <span>{workshop.instructor}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Topics Covered:
                  </h4>
                  <ul className="space-y-1">
                    {workshop.topics.map((topic, tIndex) => (
                      <li
                        key={tIndex}
                        className="text-sm text-gray-600 flex items-start"
                      >
                        <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-sm">
                  <span className="font-medium text-gray-800">Fee: </span>
                  <span className="text-green-600 font-medium">
                    {workshop.fee}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Achievements */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
            Student Achievements
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrating our students' outstanding performances in co-curricular
            activities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studentAchievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-heading font-bold text-gray-800 mb-1">
                    {achievement.student}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {achievement.class}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    {achievement.achievement}
                  </p>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    {achievement.year}
                  </span>
                </div>
                <Award className="text-yellow-500 ml-4" size={24} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Discover Your Creative Potential
          </h3>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Join our co-curricular activities and explore your hidden talents
            while developing valuable life skills
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Join a Club
            </button>
            <button className="bg-purple-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-900 transition-colors">
              View Event Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoCurricularActivities;
