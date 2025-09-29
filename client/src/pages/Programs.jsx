import React from "react";
import {
  Book,
  Calculator,
  Computer,
  BarChart3,
  Clock,
  Users,
  Award,
  CheckCircle,
} from "lucide-react";
import HeroCarousel from "../components/HeroCarousel";

const Programs = () => {
  const programs = [
    {
      title: "FSc Pre-Medical",
      duration: "2 Years",
      description:
        "Science group focusing on Biology, Chemistry, Physics for medical careers",
      subjects: [
        "Biology",
        "Chemistry",
        "Physics",
        "Mathematics",
        "English",
        "Urdu",
        "Islamic Studies",
      ],
      icon: <Book className="text-green-600" size={32} />,
      careerPaths: [
        "MBBS",
        "BDS",
        "Pharmacy",
        "Veterinary",
        "Medical Technology",
      ],
      eligibility: "Minimum 60% marks in Matric with Science subjects",
      color: "green",
    },
    {
      title: "FSc Pre-Engineering",
      duration: "2 Years",
      description:
        "Science group with Mathematics focus for engineering careers",
      subjects: [
        "Mathematics",
        "Physics",
        "Chemistry",
        "English",
        "Urdu",
        "Islamic Studies",
      ],
      icon: <Calculator className="text-blue-600" size={32} />,
      careerPaths: [
        "Engineering",
        "Architecture",
        "Computer Science",
        "Applied Sciences",
      ],
      eligibility: "Minimum 60% marks in Matric with Science subjects",
      color: "blue",
    },
    {
      title: "ICS (Computer Science)",
      duration: "2 Years",
      description: "Computer Science and Mathematics for IT careers",
      subjects: [
        "Computer Science",
        "Mathematics",
        "Physics",
        "English",
        "Urdu",
        "Islamic Studies",
      ],
      icon: <Computer className="text-purple-600" size={32} />,
      careerPaths: [
        "Software Engineering",
        "IT",
        "Data Science",
        "Cybersecurity",
      ],
      eligibility: "Minimum 50% marks in Matric",
      color: "purple",
    },
    {
      title: "ICom (Commerce)",
      duration: "2 Years",
      description: "Business and commerce education for business careers",
      subjects: [
        "Accounting",
        "Business Studies",
        "Economics",
        "English",
        "Urdu",
        "Islamic Studies",
      ],
      icon: <BarChart3 className="text-orange-600" size={32} />,
      careerPaths: [
        "Business Administration",
        "Banking",
        "Commerce",
        "Economics",
      ],
      eligibility: "Minimum 45% marks in Matric",
      color: "orange",
    },
  ];

  const features = [
    {
      icon: <Users size={24} />,
      title: "Expert Faculty",
      description:
        "Qualified and experienced teachers dedicated to student success",
    },
    {
      icon: <Clock size={24} />,
      title: "Flexible Timing",
      description: "Morning and afternoon shifts available for all programs",
    },
    {
      icon: <Award size={24} />,
      title: "High Success Rate",
      description: "95% of our students get admission in top universities",
    },
    {
      icon: <CheckCircle size={24} />,
      title: "Board Affiliation",
      description:
        "Affiliated with Federal Board of Intermediate & Secondary Education",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroCarousel
        title="Academic Programs"
        subtitle="Choose from our comprehensive range of intermediate programs designed for academic excellence"
        height="h-64"
        breadcrumbs={[{ label: "Programs" }]}
      />

      {/* Programs Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`bg-${program.color}-50 p-6 border-b`}>
                <div className="flex items-center mb-4">
                  {program.icon}
                  <div className="ml-4">
                    <h3 className="text-2xl font-heading font-bold text-gray-800">
                      {program.title}
                    </h3>
                    <p className={`text-${program.color}-600 font-medium`}>
                      Duration: {program.duration}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">{program.description}</p>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Core Subjects:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {program.subjects.map((subject, subIndex) => (
                      <span
                        key={subIndex}
                        className={`px-3 py-1 bg-${program.color}-100 text-${program.color}-800 text-sm rounded-full`}
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Career Paths:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {program.careerPaths.map((career, careerIndex) => (
                      <li key={careerIndex} className="text-sm">
                        {career}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600">
                    <strong>Eligibility:</strong> {program.eligibility}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
              Why Choose Our Programs?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive education with modern facilities and
              expert guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-blue-600 flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Admission Process */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-heading font-bold text-gray-800 mb-6 text-center">
            Admission Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Apply</h3>
              <p className="text-sm text-gray-600">
                Submit online application with required documents
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Test</h3>
              <p className="text-sm text-gray-600">
                Appear for admission test (if required)
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Merit</h3>
              <p className="text-sm text-gray-600">
                Check merit list announcement
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                4
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Enroll</h3>
              <p className="text-sm text-gray-600">
                Complete enrollment and fee submission
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programs;
