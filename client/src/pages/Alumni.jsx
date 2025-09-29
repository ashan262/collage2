import React, { useState } from "react";
import {
  Users,
  Calendar,
  BookOpen,
  UserPlus,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Building2,
  Award,
  Star,
  TrendingUp,
  Heart,
  Globe,
  Briefcase,
  GraduationCap,
  Clock,
  CheckCircle,
} from "lucide-react";
import PageHero from "../components/PageHero";
import TabNavigation from "../components/TabNavigation";

const Alumni = () => {
  const [activeTab, setActiveTab] = useState("directory");

  const tabs = [
    { id: "directory", label: "Directory", icon: Users },
    { id: "events", label: "Events", icon: Calendar },
    { id: "stories", label: "Success Stories", icon: BookOpen },
    { id: "registration", label: "Registration", icon: UserPlus },
    { id: "mentorship", label: "Mentorship", icon: MessageCircle },
  ];

  // Get the current active tab label for breadcrumbs
  const getCurrentTabLabel = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTab);
    return currentTab ? currentTab.label : "Directory";
  };

  // Alumni Directory Data
  const featuredAlumni = [
    {
      name: "Dr. Sarah Ahmed",
      batch: "Class of 2010",
      profession: "Cardiologist",
      company: "Aga Khan University Hospital",
      location: "Karachi, Pakistan",
      image: "/api/placeholder/150/150",
      achievements: "Leading cardiac surgeon, 100+ successful operations",
    },
    {
      name: "Muhammad Ali Khan",
      batch: "Class of 2008",
      profession: "Software Engineer",
      company: "Google",
      location: "California, USA",
      image: "/api/placeholder/150/150",
      achievements: "Senior Software Engineer, AI/ML specialist",
    },
    {
      name: "Fatima Malik",
      batch: "Class of 2012",
      profession: "Civil Engineer",
      company: "National Highway Authority",
      location: "Islamabad, Pakistan",
      image: "/api/placeholder/150/150",
      achievements: "Project Director, Infrastructure Development",
    },
    {
      name: "Ahmad Hassan",
      batch: "Class of 2009",
      profession: "Entrepreneur",
      company: "TechStart Solutions",
      location: "Dubai, UAE",
      image: "/api/placeholder/150/150",
      achievements: "CEO & Founder, Tech startup valued at $10M",
    },
  ];

  // Alumni Events Data
  const upcomingEvents = [
    {
      title: "Annual Alumni Reunion 2025",
      date: "December 15, 2025",
      time: "6:00 PM - 10:00 PM",
      location: "College Main Hall",
      description: "Join us for our biggest alumni gathering of the year",
      type: "Reunion",
      attendees: 150,
    },
    {
      title: "Career Mentorship Workshop",
      date: "November 20, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Conference Room A",
      description: "Alumni sharing career guidance with current students",
      type: "Workshop",
      attendees: 75,
    },
    {
      title: "Alumni Business Network Meet",
      date: "October 30, 2025",
      time: "7:00 PM - 9:00 PM",
      location: "Hotel Marriott",
      description: "Networking event for alumni entrepreneurs",
      type: "Networking",
      attendees: 100,
    },
  ];

  // Success Stories Data
  const successStories = [
    {
      name: "Dr. Ayesha Rauf",
      batch: "Class of 2005",
      title: "From Student to Harvard Professor",
      image: "/api/placeholder/200/200",
      story:
        "Started her journey at F.G Degree College for Boys Kohat with a dream to become a researcher. Today, she's a Professor of Molecular Biology at Harvard Medical School.",
      achievement: "Published 50+ research papers",
      field: "Medical Research",
    },
    {
      name: "Bilal Ahmed",
      batch: "Class of 2007",
      title: "Tech Innovation Leader",
      image: "/api/placeholder/200/200",
      story:
        "Founded three successful tech startups after graduating. His latest company revolutionizes education technology in Pakistan.",
      achievement: "Created 500+ jobs",
      field: "Technology",
    },
    {
      name: "Zara Khan",
      batch: "Class of 2011",
      title: "Social Impact Champion",
      image: "/api/placeholder/200/200",
      story:
        "Established a non-profit organization that has provided education to over 10,000 underprivileged children across Pakistan.",
      achievement: "Impacted 10,000+ lives",
      field: "Social Work",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Alumni Network"
        subtitle="Connecting Generations of F.G Degree College for Boys Kohat Graduates"
        description="Join our global network of successful graduates making a difference in their communities and professions worldwide."
        height="h-64 md:h-72"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Alumni", href: "/alumni" },
          { label: getCurrentTabLabel() },
        ]}
        backgroundImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop"
      />

      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Tab Content */}
      <div className="container mx-auto px-4 pb-16">
        {/* Alumni Directory Tab */}
        {activeTab === "directory" && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                Alumni Directory
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Connect with fellow graduates from F.G Degree College for Boys
                Kohat
              </p>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-heading font-bold text-gray-800 mb-6">
                Find Alumni
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Search by name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Graduation Year
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>All Years</option>
                    <option>2020-2025</option>
                    <option>2015-2019</option>
                    <option>2010-2014</option>
                    <option>2005-2009</option>
                    <option>2000-2004</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profession
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>All Professions</option>
                    <option>Medicine</option>
                    <option>Engineering</option>
                    <option>Technology</option>
                    <option>Business</option>
                    <option>Education</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>All Locations</option>
                    <option>Pakistan</option>
                    <option>USA</option>
                    <option>Canada</option>
                    <option>UAE</option>
                    <option>UK</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Search Alumni
                </button>
              </div>
            </div>

            {/* Featured Alumni */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-heading font-bold text-gray-800 mb-6">
                Featured Alumni
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredAlumni.map((alumni, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative mb-4">
                      <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                        <div className="w-full h-full bg-blue-400 flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {alumni.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">
                      {alumni.name}
                    </h4>
                    <p className="text-sm text-blue-600 mb-1">{alumni.batch}</p>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      {alumni.profession}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      {alumni.company}
                    </p>
                    <div className="flex items-center justify-center text-xs text-gray-500 mb-2">
                      <MapPin size={12} className="mr-1" />
                      {alumni.location}
                    </div>
                    <p className="text-xs text-gray-600">
                      {alumni.achievements}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Alumni Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  15,000+
                </div>
                <p className="text-gray-700 font-medium">Total Alumni</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  50+
                </div>
                <p className="text-gray-700 font-medium">Countries</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  200+
                </div>
                <p className="text-gray-700 font-medium">Companies</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  85%
                </div>
                <p className="text-gray-700 font-medium">Employment Rate</p>
              </div>
            </div>
          </div>
        )}

        {/* Alumni Events Tab */}
        {activeTab === "events" && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                Alumni Events
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Stay connected through our exclusive alumni events and
                gatherings
              </p>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-heading font-bold text-gray-800 mb-6 flex items-center">
                <Calendar className="text-blue-600 mr-3" size={24} />
                Upcoming Events
              </h3>
              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="text-lg font-bold text-gray-800 mr-3">
                            {event.title}
                          </h4>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              event.type === "Reunion"
                                ? "bg-blue-100 text-blue-800"
                                : event.type === "Workshop"
                                ? "bg-green-100 text-green-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {event.type}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            {event.date}
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin size={14} className="mr-1" />
                            {event.location}
                          </div>
                          <div className="flex items-center">
                            <Users size={14} className="mr-1" />
                            {event.attendees} registered
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Register Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Success Stories Tab */}
        {activeTab === "stories" && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Inspiring journeys of our alumni making a difference worldwide
              </p>
            </div>

            {/* Featured Stories */}
            <div className="space-y-8">
              {successStories.map((story, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="h-64 md:h-full bg-blue-400"></div>
                    </div>
                    <div className="md:w-2/3 p-8">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {story.field}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {story.batch}
                        </span>
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-gray-800 mb-2">
                        {story.name}
                      </h3>
                      <h4 className="text-lg text-blue-600 font-semibold mb-4">
                        {story.title}
                      </h4>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {story.story}
                      </p>
                      <div className="flex items-center">
                        <Award className="text-yellow-500 mr-2" size={20} />
                        <span className="font-medium text-gray-800">
                          {story.achievement}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Registration Tab */}
        {activeTab === "registration" && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                Alumni Registration
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join our official alumni network and stay connected
              </p>
            </div>

            {/* Registration Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-heading font-bold text-gray-800 mb-6">
                Register as Alumni
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Graduation Year *
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Select graduation year</option>
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                    <option>2020</option>
                  </select>
                </div>
              </div>
              <div className="mt-8">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mentorship Tab */}
        {activeTab === "mentorship" && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                Mentorship Program
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Connecting experienced alumni with current students for guidance
                and growth
              </p>
            </div>

            {/* Mentor/Mentee Applications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-heading font-bold text-gray-800 mb-6 flex items-center">
                  <MessageCircle className="text-blue-600 mr-3" size={24} />
                  Become a Mentor
                </h3>
                <p className="text-gray-600 mb-6">
                  Share your experience and guide the next generation
                </p>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Apply as Mentor
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-heading font-bold text-gray-800 mb-6 flex items-center">
                  <GraduationCap className="text-green-600 mr-3" size={24} />
                  Find a Mentor
                </h3>
                <p className="text-gray-600 mb-6">
                  Get guidance from experienced alumni
                </p>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                  Find a Mentor
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alumni;
