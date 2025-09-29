import React, { useState, useCallback } from "react";
import {
  Trophy,
  Target,
  Users,
  Calendar,
  Clock,
  Award,
  Star,
  Zap,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const SportsActivities = () => {
  const [activitySlides, setActivitySlides] = useState({});

  const sportsPrograms = React.useMemo(
    () => [
      {
        id: 1,
        sport: "Cricket",
        description:
          "The most popular sport with both indoor and outdoor facilities",
        facilities: "Cricket ground, practice nets, equipment room",
        coach: "Mr. Shahid Khan (Former district player)",
        schedule: "Monday, Wednesday, Friday - 4:00 PM to 6:00 PM",
        teams: ["College Team", "Junior Team", "Girls Team"],
        achievements: [
          "Inter-college champions 2024",
          "District tournament runners-up",
        ],
        icon: <Trophy size={32} />,
        color: "green",
        images: [
          "/api/placeholder/400/250", // Main content slide
          "/api/placeholder/400/250?cricket1",
          "/api/placeholder/400/250?cricket2",
          "/api/placeholder/400/250?cricket3",
          "/api/placeholder/400/250?cricket4",
        ],
      },
      {
        id: 2,
        sport: "Football",
        description: "Growing football program with dedicated training sessions",
        facilities: "Football field, goal posts, practice area",
        coach: "Mr. Ali Hassan (Certified coach)",
        schedule: "Tuesday, Thursday, Saturday - 3:30 PM to 5:30 PM",
        teams: ["Varsity Team", "Junior Varsity", "Girls Team"],
        achievements: [
          "Regional championship participants",
          "Best sportsmanship award 2024",
        ],
        icon: <Target size={32} />,
        color: "blue",
        images: [
          "/api/placeholder/400/250", // Main content slide
          "/api/placeholder/400/250?football1",
          "/api/placeholder/400/250?football2",
          "/api/placeholder/400/250?football3",
          "/api/placeholder/400/250?football4",
        ],
      },
      {
        id: 3,
        sport: "Badminton",
        description:
          "Indoor sport program for both recreational and competitive play",
        facilities: "Indoor courts, professional nets, equipment",
        coach: "Ms. Fatima Sheikh (National level player)",
        schedule: "Daily - 2:00 PM to 4:00 PM",
        teams: ["Men's Singles", "Women's Singles", "Mixed Doubles"],
        achievements: [
          "Inter-college doubles champions",
          "Individual medals in district",
        ],
        icon: <Zap size={32} />,
        color: "purple",
        images: [
          "/api/placeholder/400/250", // Main content slide
          "/api/placeholder/400/250?badminton1",
          "/api/placeholder/400/250?badminton2",
          "/api/placeholder/400/250?badminton3",
        ],
      },
      {
        id: 4,
        sport: "Table Tennis",
        description: "Fast-paced indoor sport with regular tournaments",
        facilities: "Multiple tables, professional equipment",
        coach: "Mr. Usman Ahmed (Club champion)",
        schedule: "Daily - 1:00 PM to 3:00 PM",
        teams: ["College Team", "Beginners Group"],
        achievements: [
          "City championship participants",
          "College league winners",
        ],
        icon: <Star size={32} />,
        color: "orange",
        images: [
          "/api/placeholder/400/250", // Main content slide
          "/api/placeholder/400/250?tabletennis1",
          "/api/placeholder/400/250?tabletennis2",
          "/api/placeholder/400/250?tabletennis3",
          "/api/placeholder/400/250?tabletennis4",
        ],
      },
      {
        id: 5,
        sport: "Volleyball",
        description: "Team sport promoting coordination and teamwork",
        facilities: "Outdoor court, nets, practice equipment",
        coach: "Ms. Ayesha Malik (Former college player)",
        schedule: "Monday, Wednesday, Friday - 5:00 PM to 7:00 PM",
        teams: ["Men's Team", "Women's Team"],
        achievements: ["Inter-college semi-finalists", "Best team spirit award"],
        icon: <Users size={32} />,
        color: "red",
        images: [
          "/api/placeholder/400/250", // Main content slide
          "/api/placeholder/400/250?volleyball1",
          "/api/placeholder/400/250?volleyball2",
          "/api/placeholder/400/250?volleyball3",
        ],
      },
      {
        id: 6,
        sport: "Athletics",
        description: "Track and field events for overall fitness and competition",
        facilities: "Running track, field event areas, timing equipment",
        coach: "Mr. Hassan Ali (Athletics coach)",
        schedule: "Tuesday, Thursday, Saturday - 6:00 AM to 8:00 AM",
        teams: ["Track Team", "Field Events Team"],
        achievements: ["Multiple individual medals", "Record holders in college"],
        icon: <Heart size={32} />,
        color: "yellow",
        images: [
          "/api/placeholder/400/250", // Main content slide
          "/api/placeholder/400/250?athletics1",
          "/api/placeholder/400/250?athletics2",
          "/api/placeholder/400/250?athletics3",
          "/api/placeholder/400/250?athletics4",
        ],
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
                <h3 className="text-lg font-bold mb-2">{activity.sport}</h3>
                <p className="text-white text-opacity-80 text-sm">
                  {activity.schedule.split(" - ")[1]}
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
                  alt={`${activity.sport} - Image ${index + 1}`}
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
              Sports
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
            <span className="text-sm font-medium text-gray-600">Coach:</span>
            <span className="text-sm text-gray-800">{activity.coach}</span>
          </div>
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-600">
              Facilities:
            </span>
            <span className="text-sm text-gray-800">{activity.facilities}</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">
              Recent Achievements:
            </h4>
            <ul className="space-y-1">
              {activity.achievements.slice(0, 2).map((achievement, aIndex) => (
                <li key={aIndex} className="flex items-start">
                  <span
                    className={`w-2 h-2 bg-${activity.color}-600 rounded-full mr-2 mt-2 flex-shrink-0`}
                  ></span>
                  <span className="text-sm text-gray-700">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // Initialize carousel states for each activity
  React.useEffect(() => {
    const initialSlides = {};
    sportsPrograms.forEach((activity) => {
      initialSlides[activity.id] = 0;
    });
    setActivitySlides(initialSlides);
  }, [sportsPrograms]);

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
      sportsPrograms.forEach((activity) => {
        nextActivitySlide(activity.id, activity.images.length);
      });
    }, 3000); // Changed to 3 seconds for more obvious effect

    return () => clearInterval(interval);
  }, [nextActivitySlide, sportsPrograms]);

  const upcomingEvents = [
    {
      event: "Annual Sports Day",
      date: "March 22, 2025",
      venue: "College Sports Ground",
      events: [
        "Track & Field",
        "Team Sports",
        "Individual Competitions",
        "Faculty vs Students",
      ],
      participants: "All Students",
      prizes: "Medals, Certificates, and Trophies",
    },
    {
      event: "Inter-College Cricket Tournament",
      date: "April 5-7, 2025",
      venue: "District Sports Complex",
      events: ["Men's Cricket", "Women's Cricket", "Under-19 Category"],
      participants: "College Teams",
      prizes: "Cash prizes and championship trophy",
    },
    {
      event: "Badminton Championship",
      date: "February 28, 2025",
      venue: "College Indoor Hall",
      events: ["Singles", "Doubles", "Mixed Doubles"],
      participants: "Individual Registration",
      prizes: "Medals and sports equipment",
    },
  ];

  const sportsAchievements = [
    {
      year: "2024",
      achievements: [
        "Cricket team won Inter-College Championship",
        "Badminton doubles pair reached nationals",
        "Athletics team won 8 individual medals",
        "Football team runner-up in district league",
      ],
    },
    {
      year: "2023",
      achievements: [
        "Table tennis player ranked in top 10 city-wide",
        "Volleyball team won regional championship",
        "Best Sports College award in district",
        "15 students selected for district teams",
      ],
    },
  ];

  const facilities = [
    {
      facility: "Cricket Ground",
      description: "Full-size cricket ground with pavilion and scoreboard",
      capacity: "500 spectators",
      features: [
        "Practice nets",
        "Equipment storage",
        "Changing rooms",
        "First aid station",
      ],
    },
    {
      facility: "Indoor Sports Hall",
      description: "Multi-purpose hall for indoor sports and events",
      capacity: "200 people",
      features: [
        "Badminton courts",
        "Table tennis tables",
        "Basketball court",
        "Air conditioning",
      ],
    },
    {
      facility: "Football Field",
      description: "Standard football field with proper goal posts",
      capacity: "300 spectators",
      features: ["Grass field", "Floodlights", "Dugouts", "Training area"],
    },
    {
      facility: "Fitness Center",
      description: "Well-equipped gym for strength and conditioning",
      capacity: "30 people",
      features: [
        "Modern equipment",
        "Free weights",
        "Cardio machines",
        "Professional trainer",
      ],
    },
  ];

  const trainingSchedule = [
    {
      time: "6:00 AM - 8:00 AM",
      activity: "Morning Athletics Training",
      days: "Tue, Thu, Sat",
    },
    {
      time: "1:00 PM - 3:00 PM",
      activity: "Table Tennis Practice",
      days: "Daily",
    },
    {
      time: "2:00 PM - 4:00 PM",
      activity: "Badminton Training",
      days: "Daily",
    },
    {
      time: "3:30 PM - 5:30 PM",
      activity: "Football Practice",
      days: "Tue, Thu, Sat",
    },
    {
      time: "4:00 PM - 6:00 PM",
      activity: "Cricket Training",
      days: "Mon, Wed, Fri",
    },
    {
      time: "5:00 PM - 7:00 PM",
      activity: "Volleyball Practice",
      days: "Mon, Wed, Fri",
    },
  ];

  const studentAthletes = [
    {
      name: "Muhammad Ahmed",
      class: "2nd Year Pre-Engineering",
      sport: "Cricket",
      achievement: "District Under-19 Captain",
      photo: "/api/placeholder/80/80",
    },
    {
      name: "Fatima Khan",
      class: "1st Year Pre-Medical",
      sport: "Badminton",
      achievement: "National Junior Championship Semi-finalist",
      photo: "/api/placeholder/80/80",
    },
    {
      name: "Ali Hassan",
      class: "BS Computer Science",
      sport: "Athletics",
      achievement: "College 1500m Record Holder",
      photo: "/api/placeholder/80/80",
    },
    {
      name: "Ayesha Malik",
      class: "2nd Year ICS",
      sport: "Table Tennis",
      achievement: "City Championship Finalist",
      photo: "/api/placeholder/80/80",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Sports Activities
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
            Building champions through sports excellence and teamwork
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-lg font-semibold mb-2">Athletics & Recreation</p>
            <p className="text-green-100">
              Promoting fitness, discipline, and competitive spirit
            </p>
          </div>
        </div>
      </div>

      {/* Sports Programs */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
            Sports Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive sports programs designed to develop athletic skills
            and promote healthy competition
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sportsPrograms.map((program) => (
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

      {/* Upcoming Events */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
              Upcoming Sports Events
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Major sporting events and competitions scheduled for this academic
              year
            </p>
          </div>

          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-gray-800 mb-2">
                      {event.event}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="mr-1" size={14} />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <Target className="mr-1" size={14} />
                        {event.venue}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {event.participants}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Events:
                    </h4>
                    <ul className="space-y-1">
                      {event.events.map((eventItem, eIndex) => (
                        <li
                          key={eIndex}
                          className="flex items-center text-sm text-gray-700"
                        >
                          <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                          {eventItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Prizes:
                    </h4>
                    <p className="text-sm text-gray-700">{event.prizes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sports Facilities */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
            Sports Facilities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Modern sports infrastructure to support athletic development and
            training
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facilities.map((facility, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-heading font-bold text-gray-800">
                  {facility.facility}
                </h3>
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                  {facility.capacity}
                </span>
              </div>

              <p className="text-gray-700 mb-3 text-sm">
                {facility.description}
              </p>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">Features:</h4>
                <div className="grid grid-cols-2 gap-1">
                  {facility.features.map((feature, fIndex) => (
                    <div
                      key={fIndex}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Training Schedule */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
              Training Schedule
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Weekly training schedule for all sports activities
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Days
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {trainingSchedule.map((schedule, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {schedule.time}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {schedule.activity}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {schedule.days}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Student Athletes */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
            Outstanding Student Athletes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrating our students who excel in both academics and athletics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentAthletes.map((athlete, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-heading font-bold text-gray-800 mb-1">
                {athlete.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{athlete.class}</p>
              <div className="mb-3">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {athlete.sport}
                </span>
              </div>
              <p className="text-sm text-gray-700 font-medium">
                {athlete.achievement}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sports Achievements */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
              Sports Achievements
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our proud sporting achievements over the years
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sportsAchievements.map((yearData, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-2xl font-heading font-bold text-gray-800 mb-4 text-center">
                  {yearData.year} Achievements
                </h3>
                <ul className="space-y-3">
                  {yearData.achievements.map((achievement, aIndex) => (
                    <li key={aIndex} className="flex items-start">
                      <Trophy
                        className="text-yellow-500 mr-3 mt-0.5 flex-shrink-0"
                        size={16}
                      />
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-600 to-blue-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Join Our Sports Teams
          </h3>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Discover your athletic potential and be part of our winning
            tradition in sports
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Join a Team
            </button>
            <button className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors">
              View Sports Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsActivities;
