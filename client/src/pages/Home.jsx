import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Award,
  Calendar,
  ArrowRight,
  Star,
  Clock,
  MapPin,
  GraduationCap,
  Trophy,
  Heart,
} from "lucide-react";
import HeroCarousel from "../components/HeroCarousel";
import VideoGallery from "../components/VideoGallery";
import { newsAPI } from "../services/apiService";

const Home = () => {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedNews();
  }, []);

  const fetchFeaturedNews = async () => {
    try {
      const response = await newsAPI.getAll({ featured: true, limit: 3 });
      setFeaturedNews(response.data);
    } catch (error) {
      console.error("Error fetching featured news:", error);
      // Fallback to sample news data when API is not available
      setFeaturedNews([
        {
          _id: "1",
          title: "Admission Open for Academic Year 2025-26",
          excerpt:
            "F.G Degree College for Boys Kohat announces admissions for Pre-Medical, Pre-Engineering, ICS, and Commerce groups...",
          publishDate: new Date().toISOString(),
          image: null,
        },
        {
          _id: "2",
          title: "Annual Sports Day 2025",
          excerpt:
            "Join us for the annual sports day featuring athletics, football, cricket, and various indoor games...",
          publishDate: new Date(Date.now() - 86400000).toISOString(),
          image: null,
        },
        {
          _id: "3",
          title: "Science Fair Winners Announced",
          excerpt:
            "Congratulations to all participants and winners of the annual science fair showcasing innovative projects...",
          publishDate: new Date(Date.now() - 172800000).toISOString(),
          image: null,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: Users, label: "Students", value: "2,500+", color: "bg-blue-500" },
    { icon: BookOpen, label: "Courses", value: "50+", color: "bg-green-500" },
    { icon: Award, label: "Awards", value: "25+", color: "bg-yellow-500" },
    {
      icon: GraduationCap,
      label: "Graduates",
      value: "10,000+",
      color: "bg-purple-500",
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Quality Education",
      description:
        "Comprehensive curriculum designed to prepare students for higher education and career success.",
    },
    {
      icon: Users,
      title: "Expert Faculty",
      description:
        "Experienced and dedicated teachers committed to student success and academic excellence.",
    },
    {
      icon: Trophy,
      title: "Modern Facilities",
      description:
        "State-of-the-art laboratories, library, sports facilities, and technology-enhanced classrooms.",
    },
    {
      icon: Heart,
      title: "Character Building",
      description:
        "Focus on moral values, ethics, and personality development alongside academic achievements.",
    },
  ];

  const programs = [
    {
      name: "FSc Pre-Medical",
      description:
        "Science group focusing on Biology, Chemistry, Physics for medical careers",
      subjects: ["Biology", "Chemistry", "Physics", "Mathematics"],
      icon: "🔬",
    },
    {
      name: "FSc Pre-Engineering",
      description:
        "Science group with Mathematics focus for engineering careers",
      subjects: ["Mathematics", "Physics", "Chemistry"],
      icon: "⚙️",
    },
    {
      name: "ICS (Computer Science)",
      description: "Computer Science and Mathematics for IT careers",
      subjects: ["Computer Science", "Mathematics", "Physics"],
      icon: "💻",
    },
    {
      name: "ICom (Commerce)",
      description: "Business and commerce education for business careers",
      subjects: ["Accounting", "Business Studies", "Economics"],
      icon: "📊",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className={`${stat.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <stat.icon className="text-white" size={24} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                About F.G Degree College For Boys Kohat
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                F.G Degree College for Boys Kohat has been a beacon of
                educational excellence, committed to providing quality education
                that develops students intellectually, morally, and physically.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our college continues his legacy of modern education. We nurture
                future leaders through comprehensive education, character
                building, and academic achievement while maintaining the highest
                standards of excellence.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                Learn More
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
            <div className="relative">
              <div className="bg-blue-100 rounded-2xl p-8">
                <img
                  src="/images/building.jpeg"
                  alt="FG College Kohat Campus"
                  className="rounded-lg shadow-lg w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose F.G Degree College For Boys Kohat ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide a comprehensive educational experience that prepares
              students for success in higher education and beyond.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Academic Programs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive range of academic programs designed
              to prepare you for higher education and career success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-4xl mb-4">{program.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {program.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {program.description}
                </p>
                <div className="space-y-1">
                  {program.subjects.map((subject, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded mr-1 mb-1"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/admissions"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              View All Programs
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <VideoGallery />

      {/* Featured News Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Latest News & Events
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest announcements, events, and
              achievements at FGDC for Boys Kohat.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-lg h-64 animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredNews.map((news) => (
                <div
                  key={news._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  {news.image && (
                    <img
                      src={news.image.url}
                      alt={news.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar size={14} className="mr-1" />
                      {new Date(news.publishDate).toLocaleDateString()}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {news.excerpt}
                    </p>
                    <Link
                      to={`/news/${news._id}`}
                      className="inline-flex items-center text-blue-600 font-medium text-sm"
                    >
                      Read More
                      <ArrowRight className="ml-1" size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              to="/news"
              className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              View All News
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Ready to Join FGDC for Boys Kohat ?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Take the first step towards academic excellence and character
            building. Apply now for admission to Federal Government Degree College
            For Boys Kohat.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
