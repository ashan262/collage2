import React from "react";
import {
  Quote,
  Award,
  GraduationCap,
  Users,
  BookOpen,
  Target,
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";

const PrincipalMessage = () => {
  const achievements = [
    {
      icon: <GraduationCap className="text-primary-600" size={24} />,
      title: "95% Success Rate",
      description: "Consistent high performance in board examinations",
    },
    {
      icon: <Users className="text-green-600" size={24} />,
      title: "5000+ Alumni",
      description: "Proud graduates serving in various fields worldwide",
    },
    {
      icon: <Award className="text-yellow-600" size={24} />,
      title: "Excellence Awards",
      description:
        "Multiple recognitions for academic and co-curricular achievements",
    },
    {
      icon: <BookOpen className="text-blue-600" size={24} />,
      title: "Modern Curriculum",
      description:
        "Updated syllabus aligned with contemporary educational standards",
    },
  ];

  const visionPoints = [
    "Providing quality education accessible to all students",
    "Fostering critical thinking and problem-solving skills",
    "Preparing students for global challenges and opportunities",
    "Building character and moral values alongside academic excellence",
    "Creating a supportive and inclusive learning environment",
    "Encouraging innovation and creativity in all aspects of learning",
  ];

  const initiatives = [
    {
      title: "Digital Learning Integration",
      description:
        "Incorporating modern technology to enhance the learning experience and prepare students for the digital age.",
      impact: "Enhanced student engagement and improved learning outcomes",
    },
    {
      title: "Career Guidance Program",
      description:
        "Comprehensive counseling services to help students make informed decisions about their future academic and career paths.",
      impact:
        "Better career choices and higher success rates in competitive exams",
    },
    {
      title: "Community Outreach",
      description:
        "Programs that connect our students with the broader community through service learning and social responsibility projects.",
      impact: "Development of civic responsibility and social awareness",
    },
    {
      title: "Faculty Development",
      description:
        "Continuous professional development programs for our teachers to ensure they remain at the forefront of educational excellence.",
      impact: "Improved teaching quality and student satisfaction",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroCarousel
        title="Principal's Message"
        subtitle="A message from our Principal about our vision, mission, and commitment to excellence"
        height="h-64"
        breadcrumbs={[{ label: "Principal's Message" }]}
      />

      {/* Principal Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              <div className="lg:col-span-1">
                <div className="text-center">
                  <div className="w-64 h-64 mx-auto mb-6 rounded-lg overflow-hidden bg-gray-200">
                    <img
                      src="/api/placeholder/400/400"
                      alt="Dr. Muhammad Ahmed Khan - Principal"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=Dr.+Muhammad+Ahmed+Khan&background=3B82F6&color=white&size=400`;
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Dr. Muhammad Ahmed Khan
                  </h3>
                  <p className="text-primary-600 font-medium mb-2">Principal</p>
                  <p className="text-gray-600 text-sm">Ph.D. in Physics</p>
                  <p className="text-gray-600 text-sm">
                    25+ Years in Education
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="relative">
                  <Quote
                    className="absolute -top-4 -left-4 text-primary-200"
                    size={48}
                  />
                  <div className="bg-gray-50 rounded-lg p-8 relative">
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      Welcome to Fauji Government Senior Secondary College (FGDC
                      Kohat), an institution that has been at the forefront of
                      educational excellence for decades. As the Principal of
                      this esteemed institution, I am honored to share our
                      commitment to nurturing young minds and shaping the
                      leaders of tomorrow.
                    </p>

                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      Our college stands as a beacon of quality education, where
                      we believe that every student has the potential to achieve
                      greatness. We are dedicated to providing an environment
                      that fosters intellectual curiosity, critical thinking,
                      and moral development. Our mission goes beyond academic
                      achievement; we strive to develop well-rounded individuals
                      who will contribute positively to society.
                    </p>

                    <p className="text-gray-700 text-lg leading-relaxed">
                      At F.G Degree College for Boys Kohat, we understand that
                      education is not just about memorizing facts, but about
                      developing the skills, knowledge, and character needed to
                      succeed in an ever-changing world. Our experienced
                      faculty, modern facilities, and comprehensive curriculum
                      work together to provide our students with the best
                      possible foundation for their future endeavors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                Our Achievements Under My Leadership
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Together with our dedicated faculty and motivated students, we
                have achieved remarkable milestones that reflect our commitment
                to excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-center mb-4">
                    {achievement.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="text-primary-600" size={32} />
                  <h2 className="text-3xl font-heading font-bold text-gray-800">
                    Our Vision
                  </h2>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  To be recognized as a leading educational institution that
                  empowers students to become confident, capable, and
                  conscientious global citizens who make meaningful
                  contributions to society while upholding the highest standards
                  of academic and moral excellence.
                </p>

                <div className="space-y-3">
                  {visionPoints.map((point, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle
                        className="text-green-500 flex-shrink-0 mt-1"
                        size={16}
                      />
                      <span className="text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Heart className="text-red-600" size={32} />
                  <h2 className="text-3xl font-heading font-bold text-gray-800">
                    Our Mission
                  </h2>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Our mission is to provide comprehensive, high-quality
                    education that:
                  </p>

                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <Star
                        className="text-red-500 flex-shrink-0 mt-1"
                        size={16}
                      />
                      <span>
                        Develops academic excellence through innovative teaching
                        methodologies
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Star
                        className="text-red-500 flex-shrink-0 mt-1"
                        size={16}
                      />
                      <span>
                        Nurtures character, integrity, and moral values
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Star
                        className="text-red-500 flex-shrink-0 mt-1"
                        size={16}
                      />
                      <span>
                        Promotes critical thinking and problem-solving abilities
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Star
                        className="text-red-500 flex-shrink-0 mt-1"
                        size={16}
                      />
                      <span>
                        Encourages creativity and innovation in all endeavors
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Star
                        className="text-red-500 flex-shrink-0 mt-1"
                        size={16}
                      />
                      <span>
                        Prepares students for successful careers and higher
                        education
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Initiatives */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                Key Initiatives & Programs
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Under my leadership, we have introduced several innovative
                programs designed to enhance the educational experience and
                prepare our students for future success.
              </p>
            </div>

            <div className="space-y-8">
              {initiatives.map((initiative, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {initiative.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {initiative.description}
                      </p>
                    </div>
                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                      <h4 className="font-medium text-primary-800 mb-2">
                        Impact:
                      </h4>
                      <p className="text-primary-700 text-sm">
                        {initiative.impact}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personal Message */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="mx-auto mb-6 text-primary-200" size={64} />
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">
              A Personal Message
            </h2>

            <div className="text-lg leading-relaxed space-y-6">
              <p>
                To our students, I want you to know that you are our greatest
                asset and our brightest hope. Each of you has unique talents and
                potential that, when nurtured properly, can lead to
                extraordinary achievements. We are here to guide, support, and
                challenge you to reach your highest potential.
              </p>

              <p>
                To our parents and families, thank you for entrusting us with
                your most precious gifts - your children. We understand the
                responsibility that comes with this trust, and we are committed
                to providing the best possible education and care for every
                student.
              </p>

              <p>
                To our faculty and staff, your dedication, expertise, and
                passion make the difference every single day. Together, we are
                not just teaching subjects; we are shaping minds, building
                character, and creating the foundation for our students' future
                success.
              </p>
            </div>

            <div className="mt-12">
              <p className="text-xl font-medium mb-2">With warm regards,</p>
              <p className="text-2xl font-bold">Dr. Muhammad Ahmed Khan</p>
              <p className="text-primary-200">
                Principal, F.G Degree College for Boys Kohat
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold text-gray-800 mb-4">
              Join Our Educational Community
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              We invite you to be part of our journey towards educational
              excellence. Whether you're a prospective student, parent, or
              educator, we welcome you to experience what makes F.G Degree
              College for Boys Kohat special.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admissions"
                className="inline-flex items-center bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
              >
                Apply for Admission
                <ArrowRight className="ml-2" size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center border border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
              >
                Contact Us
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrincipalMessage;
