import React from "react";
import {
  Calendar,
  Clock,
  FileText,
  Users,
  BookOpen,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  Award,
} from "lucide-react";
import HeroCarousel from "../components/HeroCarousel";

// Reusable Program Card Component
const ProgramCard = ({
  program,
  iconColor = "text-green-600",
  bgColorClass = "bg-gray-50",
  icon = GraduationCap,
}) => {
  return (
    <div
      className={`${bgColorClass} rounded-lg p-6 hover:shadow-lg transition-shadow duration-300`}
    >
      <div className="flex items-center mb-4">
        {React.createElement(icon, {
          className: `${iconColor} mr-3`,
          size: 24,
        })}
        <h3 className="text-xl font-heading font-bold text-gray-800">
          {program.name}
        </h3>
      </div>
      <div className="space-y-3">
        {program.duration && (
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Duration:</span>
            <span className="text-sm font-medium text-gray-800">
              {program.duration}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Available Seats:</span>
          <span className="text-sm font-medium text-gray-800">
            {program.seats}
          </span>
        </div>
        {program.subjects && (
          <div>
            <span className="text-sm text-gray-600 block mb-2">Subjects:</span>
            <div className="flex flex-wrap gap-1">
              {program.subjects.map((subject, subIndex) => (
                <span
                  key={subIndex}
                  className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}
        <div>
          <span className="text-sm text-gray-600 block mb-1">Eligibility:</span>
          <p className="text-sm text-gray-800">{program.eligibility}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600 block mb-1">
            {program.duration ? "Career Opportunities:" : "Career Paths:"}
          </span>
          <p className="text-sm text-gray-800">{program.career}</p>
        </div>
      </div>
    </div>
  );
};

// Reusable Requirements Card Component
const RequirementsCard = ({
  title,
  requirements,
  iconColor = "text-green-600",
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <FileText className={`${iconColor} mr-3`} size={24} />
        <h3 className="text-2xl font-heading font-bold text-gray-800">
          {title}
        </h3>
      </div>
      <ul className="space-y-3">
        {requirements.map((requirement, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="text-green-600 mr-3 mt-0.5" size={16} />
            <span className="text-gray-700">{requirement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const HSSCAdmission2025 = () => {
  const importantDates = [
    {
      event: "Application Start Date",
      date: "15th May 2025",
      status: "upcoming",
    },
    {
      event: "Last Date for Applications",
      date: "30th June 2025",
      status: "upcoming",
    },
    {
      event: "Merit List Publication",
      date: "15th July 2025",
      status: "upcoming",
    },
    { event: "1st Merit List", date: "20th July 2025", status: "upcoming" },
    { event: "2nd Merit List", date: "30th July 2025", status: "upcoming" },
    { event: "3rd Merit List", date: "10th August 2025", status: "upcoming" },
    { event: "Classes Commence", date: "15th August 2025", status: "upcoming" },
  ];

  const programs = [
    {
      name: "Pre-Medical",
      subjects: [
        "Physics",
        "Chemistry",
        "Biology",
        "Mathematics",
        "English",
        "Urdu",
        "Islamiyat/Ethics",
        "Pakistan Studies",
      ],
      seats: "120",
      eligibility: "Matric with Science subjects and minimum 60% marks",
      career: "MBBS, BDS, Pharmacy, Physiotherapy, Medical Technology",
    },
    {
      name: "Pre-Engineering",
      subjects: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "English",
        "Urdu",
        "Islamiyat/Ethics",
        "Pakistan Studies",
      ],
      seats: "100",
      eligibility: "Matric with Science subjects and minimum 60% marks",
      career: "Engineering, Architecture, Computer Science, Technology",
    },
    {
      name: "Computer Science (ICS)",
      subjects: [
        "Physics",
        "Mathematics",
        "Computer Science",
        "English",
        "Urdu",
        "Islamiyat/Ethics",
        "Pakistan Studies",
      ],
      seats: "80",
      eligibility: "Matric with Science/General subjects and minimum 50% marks",
      career: "Software Engineering, IT, Computer Science, Programming",
    },
    {
      name: "Commerce (I.Com)",
      subjects: [
        "Accounting",
        "Business Mathematics",
        "Economics",
        "Commercial Geography",
        "English",
        "Urdu",
        "Islamiyat/Ethics",
        "Pakistan Studies",
      ],
      seats: "60",
      eligibility: "Matric with any subjects and minimum 45% marks",
      career: "Business Administration, Banking, Finance, Commerce",
    },
    {
      name: "General Science",
      subjects: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "English",
        "Urdu",
        "Islamiyat/Ethics",
        "Pakistan Studies",
      ],
      seats: "40",
      eligibility: "Matric with Science subjects and minimum 50% marks",
      career: "BSc Programs, Teaching, Research, Laboratory Work",
    },
    {
      name: "Arts (FA)",
      subjects: [
        "English",
        "Urdu",
        "Islamiyat/Ethics",
        "Pakistan Studies",
        "Psychology",
        "Sociology",
        "Economics",
      ],
      seats: "60",
      eligibility: "Matric with any subjects and minimum 45% marks",
      career: "BA Programs, Teaching, Social Sciences, Literature",
    },
  ];

  const requirements = [
    "Original Matric Certificate & Mark Sheet",
    "Character Certificate from previous school",
    "Valid CNIC/B-Form",
    "Migration Certificate (if from other board)",
    "Medical Fitness Certificate",
    "6 Passport size photographs",
    "Fee deposit slip/challan",
    "Domicile Certificate (for quota seats)",
  ];

  const quotaSystem = [
    {
      category: "Open Merit",
      percentage: "70%",
      description: "Based on academic merit",
    },
    {
      category: "District Quota",
      percentage: "15%",
      description: "For local district students",
    },
    {
      category: "Rural Area Quota",
      percentage: "10%",
      description: "For rural area students",
    },
    {
      category: "Special Quota",
      percentage: "5%",
      description: "For minorities and special cases",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroCarousel
        title="HSSC Admission 2025"
        subtitle="Higher Secondary School Certificate - Intermediate Programs"
        height="h-64"
        breadcrumbs={[
          { label: "Admissions", href: "/admissions" },
          { label: "HSSC Admission 2025" },
        ]}
      />

      {/* HSSC Admission Advertisement */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-green-600 to-teal-700 rounded-lg p-8 text-center shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            HSSC Programs Admission 2025-26
          </h3>
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <img
              src="/api/placeholder/900/500"
              alt="HSSC Admission 2025 Advertisement - F.G Degree College for Boys Kohat"
              className="w-full h-auto rounded-lg shadow-md mb-4"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-4">
                Build your foundation for higher education with our Intermediate
                programs at F.G Degree College for Boys Kohat Rawalpindi Cantt
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  Apply Now
                </button>
                <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium">
                  Download Prospectus
                </button>
                <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium">
                  Visit Campus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Dates */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
            Important Dates - HSSC 2025
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the admission schedule for Intermediate programs
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Event
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {importantDates.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {item.event}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.date}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {item.status === "completed" ? (
                          <CheckCircle size={12} className="mr-1" />
                        ) : (
                          <Clock size={12} className="mr-1" />
                        )}
                        {item.status === "completed" ? "Completed" : "Upcoming"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Programs Offered */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
              Intermediate Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your path for higher secondary education
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <ProgramCard
                key={index}
                program={program}
                iconColor="text-green-600"
                bgColorClass="bg-gray-50"
                icon={GraduationCap}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quota System and Requirements */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Quota System */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Users className="text-green-600 mr-3" size={24} />
              <h3 className="text-2xl font-heading font-bold text-gray-800">
                Admission Quota System
              </h3>
            </div>
            <div className="space-y-4">
              {quotaSystem.map((quota, index) => (
                <div key={index} className="border-l-4 border-green-600 pl-4">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold text-gray-800">
                      {quota.category}
                    </h4>
                    <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                      {quota.percentage}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{quota.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          {/* Required Documents */}
          <RequirementsCard
            title="Required Documents"
            requirements={requirements}
            iconColor="text-green-600"
          />
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-teal-700 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Secure Your Spot Today!
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Limited seats available. Apply now for HSSC admission 2025 at F.G
              Sir Syed College
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Download Admission Form
              </button>
              <button className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors">
                Visit Admission Office
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HSSCAdmission2025;
