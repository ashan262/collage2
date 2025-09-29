import React from "react";
import {
  Calendar,
  Clock,
  FileText,
  Users,
  Award,
  CheckCircle,
  AlertCircle,
  GraduationCap,
} from "lucide-react";
import HeroCarousel from "../components/HeroCarousel";

// Reusable Program Card Component
const ProgramCard = ({
  program,
  iconColor = "text-blue-600",
  bgColorClass = "bg-gray-50",
  icon = Award,
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
  icon,
  requirements,
  iconColor = "text-blue-600",
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        {React.createElement(icon, {
          className: `${iconColor} mr-3`,
          size: 24,
        })}
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

const BSAdmission2025 = () => {
  const importantDates = [
    {
      event: "Application Start Date",
      date: "1st January 2025",
      status: "completed",
    },
    {
      event: "Last Date for Applications",
      date: "31st March 2025",
      status: "upcoming",
    },
    { event: "Entry Test Date", date: "15th April 2025", status: "upcoming" },
    {
      event: "Merit List Publication",
      date: "30th April 2025",
      status: "upcoming",
    },
    { event: "1st Merit List", date: "5th May 2025", status: "upcoming" },
    { event: "2nd Merit List", date: "15th May 2025", status: "upcoming" },
    { event: "Classes Commence", date: "1st June 2025", status: "upcoming" },
  ];

  const programs = [
    {
      name: "BS Computer Science",
      duration: "4 Years",
      seats: "60",
      eligibility: "FSc Pre-Engineering/ICS with 60% marks",
      career: "Software Engineer, System Analyst, Database Administrator",
    },
    {
      name: "BS Mathematics",
      duration: "4 Years",
      seats: "40",
      eligibility: "FSc Pre-Engineering/Pre-Medical with 60% marks",
      career: "Mathematician, Statistician, Research Analyst",
    },
    {
      name: "BS Physics",
      duration: "4 Years",
      seats: "40",
      eligibility: "FSc Pre-Engineering/Pre-Medical with 60% marks",
      career: "Physicist, Research Scientist, Lab Technician",
    },
    {
      name: "BS Chemistry",
      duration: "4 Years",
      seats: "40",
      eligibility: "FSc Pre-Engineering/Pre-Medical with 60% marks",
      career: "Chemist, Quality Control Officer, Research Scientist",
    },
    {
      name: "BS English",
      duration: "4 Years",
      seats: "50",
      eligibility: "FA/FSc with 50% marks",
      career: "Teacher, Journalist, Content Writer, Translator",
    },
    {
      name: "BS Economics",
      duration: "4 Years",
      seats: "40",
      eligibility: "FA/FSc with 50% marks",
      career: "Economist, Financial Analyst, Banking Officer",
    },
  ];

  const requirements = [
    "Valid CNIC/B-Form",
    "Original Matric & Intermediate Certificates",
    "Character Certificate from last institution",
    "Medical Fitness Certificate",
    "4 Passport size photographs",
    "Entry Test Fee Challan",
    "Migration Certificate (if applicable)",
  ];

  const feeStructure = [
    { item: "Admission Fee", amount: "PKR 5,000" },
    { item: "Tuition Fee (per semester)", amount: "PKR 25,000" },
    { item: "Laboratory Fee (per semester)", amount: "PKR 3,000" },
    { item: "Library Fee (per semester)", amount: "PKR 1,500" },
    { item: "Sports Fee (per semester)", amount: "PKR 1,000" },
    { item: "Examination Fee (per semester)", amount: "PKR 2,000" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroCarousel
        title="BS Admission 2025"
        subtitle="F.G Degree College for Boys Kohat Rawalpindi Cantt - Bachelor's Degree Programs"
        height="h-64"
        breadcrumbs={[
          { label: "Admissions", href: "/admissions" },
          { label: "BS Admission 2025" },
        ]}
      />

      {/* BS Admission Advertisement */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-lg p-8 text-center shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            BS Programs Admission 2025-26
          </h3>
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <img
              src="/api/placeholder/900/500"
              alt="BS Admission 2025 Advertisement - F.G Degree College for Boys Kohat"
              className="w-full h-auto rounded-lg shadow-md mb-4"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-4">
                Secure your future with our Bachelor's degree programs at F.G
                Sir Syed College Rawalpindi Cantt
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                  Apply Online Now
                </button>
                <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors text-sm font-medium">
                  Download Brochure
                </button>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  Call: 051-1234567
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
            Important Dates
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mark your calendar with these crucial admission dates
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
                            : "bg-yellow-100 text-yellow-800"
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
              Programs Offered
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our diverse range of Bachelor's degree programs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <ProgramCard
                key={index}
                program={program}
                iconColor="text-blue-600"
                bgColorClass="bg-gray-50"
                icon={Award}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Requirements and Fee Structure */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Requirements */}
          <RequirementsCard
            title="Required Documents"
            icon={FileText}
            requirements={requirements}
            iconColor="text-blue-600"
          />

          {/* Fee Structure */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Users className="text-blue-600 mr-3" size={24} />
              <h3 className="text-2xl font-heading font-bold text-gray-800">
                Fee Structure
              </h3>
            </div>
            <div className="space-y-3">
              {feeStructure.map((fee, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                >
                  <span className="text-gray-700">{fee.item}</span>
                  <span className="font-semibold text-gray-800">
                    {fee.amount}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="text-blue-600 mr-2 mt-0.5" size={16} />
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Fee structure is subject to change.
                  Additional charges may apply for certain courses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Ready to Apply?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Don't miss this opportunity to join one of Pakistan's premier
            educational institutions
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Download Application Form
            </button>
            <button className="bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors">
              Contact Admissions Office
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BSAdmission2025;
