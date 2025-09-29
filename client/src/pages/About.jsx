import React, { useState, useEffect } from "react";
import {
  Target,
  Eye,
  Heart,
  Award,
  Users,
  BookOpen,
  Star,
  Clock,
  MapPin,
  Calendar,
  MessageSquare,
  Shield,
} from "lucide-react";
import PageHero from "../components/PageHero";
import TabNavigation from "../components/TabNavigation";
import { pagesAPI } from "../services/apiService";

const About = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    fetchPageContent();
  }, []);

  const tabs = [
    { id: "about", label: "About Us", icon: Users },
    { id: "principal", label: "Principal's Message", icon: MessageSquare },
    { id: "administration", label: "Administration", icon: Shield },
  ];

  // Get the current active tab label for breadcrumbs
  const getCurrentTabLabel = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTab);
    return currentTab ? currentTab.label : "About Us";
  };

  const fetchPageContent = async () => {
    try {
      const response = await pagesAPI.getPage("about");
      setPageContent(response.data);
    } catch (error) {
      console.error("Error fetching page content:", error);
    } finally {
      setLoading(false);
    }
  };

  const achievements = [
    {
      icon: Award,
      title: "Academic Excellence",
      description: "Consistently achieving top results in board examinations",
      stats: "95% Pass Rate",
    },
    {
      icon: Users,
      title: "Qualified Faculty",
      description: "Highly qualified and experienced teaching staff",
      stats: "50+ Teachers",
    },
    {
      icon: BookOpen,
      title: "Comprehensive Curriculum",
      description: "Well-rounded education covering all major subjects",
      stats: "5 Programs",
    },
    {
      icon: Star,
      title: "Student Success",
      description: "Students excelling in higher education and careers",
      stats: "10,000+ Alumni",
    },
  ];

  const coreValues = [
    {
      icon: Target,
      title: "Excellence",
      description:
        "We strive for the highest standards in education and character development.",
    },
    {
      icon: Heart,
      title: "Integrity",
      description:
        "We maintain honesty, transparency, and ethical conduct in all our actions.",
    },
    {
      icon: Users,
      title: "Inclusivity",
      description:
        "We welcome students from all backgrounds and provide equal opportunities.",
    },
    {
      icon: BookOpen,
      title: "Innovation",
      description:
        "We embrace modern teaching methods and educational technologies.",
    },
  ];

  // Administration data
  const administrationTeam = [
    {
      name: "Dr. Musharaf Khan",
      position: "Principal",
      qualification: "Ph.D. in Botany",
      experience: "",
      image: "/images/image22.jpeg",
    },
    {
      name: "",
      position: "Vice Principal",
      qualification: "",
      experience: "",
    },
    {
      name: "",
      position: "Registrar",
      qualification: "",
      experience: "",
    },
    {
      name: "",
      position: "Dean of Students",
      qualification: "",
      experience: "",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="About F.G Degree College For Boys Kohat"
        subtitle="Excellence in Education Since 2022"
        description="Dedicated to providing quality education and character building for over four decades"
        height="h-64 md:h-72"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: getCurrentTabLabel() },
        ]}
        backgroundImage="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=600&fit=crop"
      />

      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        variant="default"
      />

      {/* Tab Content */}
      <div className="container mx-auto px-4 pb-16">
        {/* About Us Tab */}
        {activeTab === "about" && (
          <div className="space-y-16">
            {/* Introduction Section */}
            <section className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-6">
                    F.G Degree College For Boys Kohat
                  </h2>
                  {loading ? (
                    <div className="space-y-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <p className="text-gray-600 leading-relaxed">
                        {pageContent?.content?.history ||
                          "Established in 2022, F.G Degree College For Boys Kohat has been a cornerstone of quality education in the region. For nearly five decades, we have been committed to academic excellence, character building, and nurturing future leaders."}
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        Our institution stands as a testament to educational
                        excellence, providing comprehensive education that
                        develops students intellectually, morally, and
                        physically. We believe in creating an environment where
                        every student can thrive and reach their full potential.
                      </p>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <div className="bg-primary-100 rounded-2xl p-8">
                    <img
                      src="/images/building2.jpeg"
                      alt="F.G Degree College For Boys Kohat Main Building"
                      className="rounded-lg shadow-lg w-full h-80 object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-6 border">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary-100 p-3 rounded-full">
                        <Calendar className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-800">50+</p>
                        <p className="text-sm text-gray-600">
                          Years of Excellence
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Mission, Vision, Values */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Target className="text-primary-600" size={24} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-center text-gray-800 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {pageContent?.content?.mission ||
                    "To provide comprehensive education that develops intellectual, physical, and moral capabilities of students, preparing them to be responsible citizens and future leaders."}
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Eye className="text-green-600" size={24} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-center text-gray-800 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {pageContent?.content?.vision ||
                    "To be recognized as a premier educational institution that shapes confident, capable, and morally upright individuals who contribute positively to society."}
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Heart className="text-yellow-600" size={24} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-center text-gray-800 mb-4">
                  Our Values
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {pageContent?.content?.values ||
                    "Excellence, Integrity, Innovation, Inclusivity, and Community Service guide everything we do in our educational mission."}
                </p>
              </div>
            </section>

            {/* Core Values */}
            <section className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                  Our Core Values
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  These fundamental principles guide our educational approach
                  and shape the character of our students and institution.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {coreValues.map((value, index) => (
                  <div key={index} className="text-center p-6 rounded-lg">
                    <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="text-primary-600" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Achievements */}
            <section className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                  Our Achievements
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Celebrating decades of educational excellence and student
                  success.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-6 text-center"
                  >
                    <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <achievement.icon
                        className="text-primary-600"
                        size={24}
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {achievement.description}
                    </p>
                    <div className="text-2xl font-bold text-primary-600">
                      {achievement.stats}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Principal's Message Tab */}
        {activeTab === "principal" && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center mb-8">
                <div className="w-32 h-32 flex-shrink-0 mb-6 lg:mb-0 lg:mr-8">
                  <img
                    src="/images/image22.jpeg"
                    alt="Dr. Musharaf Khan- Principal"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                    onError={(e) => {
                      // Fallback to default icon if image fails to load
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center"
                    style={{ display: "none" }}
                  >
                    <MessageSquare className="text-blue-600" size={48} />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-bold text-gray-800 mb-2">
                    Principal's Message
                  </h2>
                  <p className="text-xl text-gray-600">Dr. Musharaf Khan</p>
                  <p className="text-gray-500">
                    Principal, F.G Degree College For Boys Kohat
                  </p>
                </div>
              </div>

              <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
                <p className="text-lg font-medium text-gray-800 italic">
                  "Welcome to F.G Degree College For Boys Kohat, where
                  excellence meets opportunity."
                </p>

                <p>
                  "It gives me great pleasure to welcome you to Federal
                  Government Degree College for Boys, Kohat Cantt. A place where
                  young minds are shaped for a brighter tomorrow." Our college,
                  established in 2022, may be new, but our vision is clear: to
                  provide quality education that builds not only knowledge, but
                  also character, discipline, and leadership. We are proud to
                  serve the youth of Kohat by offering an environment that
                  encourages learning, growth, and excellence.
                </p>

                <p>
                  Education at our college goes beyond classrooms and textbooks.
                  We want our students to become thinkers, problem-solvers, and
                  responsible citizens. Our dedicated faculty is here to support
                  students every step of the way, helping them grow in
                  confidence, values, and purpose.
                </p>

                <p>
                  As the famous quote goes, “Education is the most powerful
                  weapon which you can use to change the world.” We aim to equip
                  our students with this powerful tool, so they can make a
                  positive difference in society.
                </p>
                <p>
                  To our students: take full advantage of the opportunities
                  here. Be disciplined, be consistent, and believe in your
                  potential.
                </p>
                <p>
                  To our parents: thank you for your trust. Your encouragement
                  and prayers are vital to the success of this journey.
                </p>
                <p>
                  <b>
                    رَّبِّ زِدْنِي عِلْمًا “O my Lord, increase me in
                    knowledge.” (Surah Taha 20:114)
                  </b>
                </p>
                <p>
                  May Allah bless our efforts and guide this institution to
                  become a source of pride for our city and for our country.
                  Ameen.
                </p>

                <div className="bg-blue-50 p-6 rounded-lg mt-6">
                  <p className="text-gray-700 italic">
                    "Education is the most powerful weapon which you can use to
                    change the world. At F.G Degree College For Boys Kohat, we
                    are committed to empowering our students with this weapon."
                  </p>
                  <p className="text-right mt-4 font-semibold text-blue-700">
                    - Dr. Musharaf Khan
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Administration Tab */}
        {activeTab === "administration" && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-8 flex items-center">
                <Shield className="text-blue-600 mr-3" size={24} />
                Leadership Team
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {administrationTeam.map((member, index) => (
                  <div
                    key={index}
                    className="text-center bg-blue-50 p-6 rounded-lg"
                  >
                    <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                      {/* <Users className="text-blue-600" size={32} /> */}
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-gray-800 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-2">
                      {member.position}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      {member.qualification}
                    </p>
                    <p className="text-xs text-gray-500">{member.experience}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-6 flex items-center">
                <MapPin className="text-blue-600 mr-3" size={24} />
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Clock className="mx-auto text-blue-600 mb-2" size={24} />
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Office Hours
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Monday - Friday: 8:00 AM - 4:00 PM
                  </p>
                  <p className="text-gray-600 text-sm">
                    Saturday: 8:00 AM - 1:00 PM
                  </p>
                </div>
                <div className="text-center">
                  <MapPin className="mx-auto text-blue-600 mb-2" size={24} />
                  <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
                  <p className="text-gray-600 text-sm">
                    Federal Government Degree College For Boys Dhoda Road Kohat
                  </p>
                  <p className="text-gray-600 text-sm">KPK, Pakistan</p>
                </div>
                <div className="text-center">
                  <Users className="mx-auto text-blue-600 mb-2" size={24} />
                  <h3 className="font-semibold text-gray-800 mb-1">Contact</h3>
                  <p className="text-gray-600 text-sm">
                    Phone: +92-333-6040021
                  </p>
                  <p className="text-gray-600 text-sm">
                    Email: fgdcbkohat@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
