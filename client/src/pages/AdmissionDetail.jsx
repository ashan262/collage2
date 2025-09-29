import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Users,
  BookOpen,
  Target,
  CheckCircle,
  Award,
  Calendar,
  FileText,
  Download,
} from "lucide-react";
import HeroCarousel from "../components/Herocarousal";

const AdmissionDetail = () => {
  const { programId } = useParams();
  const [program, setProgram] = useState(null);


  const programs = useMemo(() => ({
    "fsc-pre-medical": {
      id: "fsc-pre-medical",
      name: "FSc Pre-Medical",
      fullName: "Faculty of Science - Pre-Medical",
      duration: "2 Years",
      subjects: [
        "Physics",
        "Chemistry",
        "Biology",
        "Mathematics",
        "English",
        "Urdu",
        "Islamic Studies",
        "Pakistan Studies",
      ],
      description:
        "The Pre-Medical program is designed for students who aspire to pursue careers in medicine, dentistry, pharmacy, and other health sciences. Our comprehensive curriculum provides a strong foundation in biological and physical sciences.",
      requirements:
        "Minimum 60% in Matriculation with Science subjects (Physics, Chemistry, Biology, Mathematics)",
      careerPaths: [
        "MBBS (Doctor of Medicine)",
        "BDS (Bachelor of Dental Surgery)",
        "Pharmacy",
        "Nursing",
        "Medical Technology",
        "Physiotherapy",
        "Veterinary Sciences",
      ],
      icon: "🔬",
      color: "bg-blue-100 text-blue-600",
      bgColor: "bg-blue-600",
      overview:
        "Our Pre-Medical program has been consistently producing top performers in medical entrance examinations. With state-of-the-art laboratories and experienced faculty, we prepare students for the challenges of medical education.",
      features: [
        "Well-equipped Biology and Chemistry laboratories",
        "Regular practice tests and mock examinations",
        "Career counseling and guidance sessions",
        "Guest lectures by medical professionals",
        "Hospital visits and practical exposure",
        "MDCAT preparation classes",
      ],
      curriculum: {
        year1: {
          title: "First Year",
          subjects: [
            {
              name: "Physics",
              description: "Mechanics, Heat, Sound, Light, and Electricity",
            },
            {
              name: "Chemistry",
              description:
                "Atomic Structure, Chemical Bonding, States of Matter",
            },
            {
              name: "Biology",
              description: "Cell Biology, Diversity of Life, Human Biology",
            },
            {
              name: "Mathematics",
              description: "Algebra, Trigonometry, Vectors",
            },
            { name: "English", description: "Functional English, Literature" },
            { name: "Urdu", description: "Grammar, Literature, Composition" },
          ],
        },
        year2: {
          title: "Second Year",
          subjects: [
            {
              name: "Physics",
              description:
                "Current Electricity, Electromagnetism, Modern Physics",
            },
            {
              name: "Chemistry",
              description: "Chemical Kinetics, Solutions, Electrochemistry",
            },
            {
              name: "Biology",
              description: "Evolution, Genetics, Biotechnology",
            },
            {
              name: "Mathematics",
              description: "Calculus, Statistics, Probability",
            },
            { name: "English", description: "Advanced English, Essay Writing" },
            { name: "Urdu", description: "Advanced Literature, Poetry" },
          ],
        },
      },
      admissionCriteria: [
        "Matriculation certificate with minimum 60% marks",
        "Science subjects (Physics, Chemistry, Biology, Mathematics) are mandatory",
        "Age limit: 15-19 years at the time of admission",
        "Character certificate from previous institution",
        "Medical fitness certificate",
      ],
      feeStructure: {
        admission: "Rs. 5,000",
        monthly: "Rs. 3,500",
        lab: "Rs. 2,500",
        total: "Rs. 47,000 (Annual)",
      },
    },
    "fsc-pre-engineering": {
      id: "fsc-pre-engineering",
      name: "FSc Pre-Engineering",
      fullName: "Faculty of Science - Pre-Engineering",
      duration: "2 Years",
      subjects: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "English",
        "Urdu",
        "Islamic Studies",
        "Pakistan Studies",
      ],
      description:
        "The Pre-Engineering program provides students with a solid foundation in mathematics, physics, and chemistry, preparing them for engineering and technology careers.",
      requirements:
        "Minimum 60% in Matriculation with Science subjects (Physics, Chemistry, Mathematics)",
      careerPaths: [
        "Engineering (All Disciplines)",
        "Architecture",
        "Computer Science",
        "Technology",
        "Applied Sciences",
        "Aeronautics",
      ],
      icon: "⚙️",
      color: "bg-green-100 text-green-600",
      bgColor: "bg-green-600",
      overview:
        "Our Pre-Engineering program has a track record of producing successful engineers and technologists. With emphasis on mathematical problem-solving and scientific thinking, we prepare students for competitive engineering entrance tests.",
      features: [
        "Advanced Physics and Chemistry laboratories",
        "Mathematics problem-solving workshops",
        "Engineering entrance test preparation",
        "Industry visits and exposure",
        "Project-based learning approach",
        "ECAT preparation classes",
      ],
      curriculum: {
        year1: {
          title: "First Year",
          subjects: [
            {
              name: "Physics",
              description: "Measurements, Mechanics, Properties of Matter",
            },
            {
              name: "Chemistry",
              description:
                "Fundamental Concepts, States of Matter, Atomic Structure",
            },
            {
              name: "Mathematics",
              description: "Number Systems, Sets, Functions, Matrices",
            },
            {
              name: "English",
              description: "Grammar, Comprehension, Writing Skills",
            },
            { name: "Urdu", description: "Grammar, Prose, Poetry" },
            {
              name: "Islamic Studies",
              description: "Quran, Hadith, Islamic History",
            },
          ],
        },
        year2: {
          title: "Second Year",
          subjects: [
            {
              name: "Physics",
              description: "Waves, Electricity, Magnetism, Modern Physics",
            },
            {
              name: "Chemistry",
              description: "Chemical Equilibrium, Solutions, Electrochemistry",
            },
            {
              name: "Mathematics",
              description: "Calculus, Analytical Geometry, Statistics",
            },
            {
              name: "English",
              description: "Advanced Grammar, Literature, Essay Writing",
            },
            {
              name: "Urdu",
              description: "Advanced Literature, Creative Writing",
            },
            {
              name: "Pakistan Studies",
              description: "History, Geography, Political System",
            },
          ],
        },
      },
      admissionCriteria: [
        "Matriculation certificate with minimum 60% marks",
        "Science subjects (Physics, Chemistry, Mathematics) are mandatory",
        "Strong mathematical background preferred",
        "Age limit: 15-19 years at the time of admission",
        "Character certificate from previous institution",
      ],
      feeStructure: {
        admission: "Rs. 5,000",
        monthly: "Rs. 3,500",
        lab: "Rs. 2,500",
        total: "Rs. 47,000 (Annual)",
      },
    },
    ics: {
      id: "ics",
      name: "ICS (Computer Science)",
      fullName: "Intermediate in Computer Science",
      duration: "2 Years",
      subjects: [
        "Physics",
        "Mathematics",
        "Computer Science",
        "English",
        "Urdu",
        "Islamic Studies",
        "Pakistan Studies",
      ],
      description:
        "The ICS program focuses on computer science fundamentals, programming, and mathematical concepts, preparing students for careers in information technology and software development.",
      requirements: "Minimum 60% in Matriculation with Mathematics",
      careerPaths: [
        "Software Engineering",
        "Computer Science",
        "Information Technology",
        "Data Science",
        "Cybersecurity",
        "Web Development",
      ],
      icon: "💻",
      color: "bg-purple-100 text-purple-600",
      bgColor: "bg-purple-600",
      overview:
        "Our ICS program is designed to meet the growing demand for IT professionals. With modern computer labs and industry-relevant curriculum, we prepare students for the digital age.",
      features: [
        "State-of-the-art computer laboratories",
        "Programming in multiple languages",
        "Web development and database management",
        "Industry certifications preparation",
        "Internship opportunities",
        "IT entrance test preparation",
      ],
      curriculum: {
        year1: {
          title: "First Year",
          subjects: [
            {
              name: "Physics",
              description: "Measurements, Mechanics, Properties of Matter",
            },
            {
              name: "Mathematics",
              description: "Number Systems, Sets, Functions, Sequences",
            },
            {
              name: "Computer Science",
              description:
                "Introduction to Computing, Programming Fundamentals",
            },
            {
              name: "English",
              description: "Grammar, Comprehension, Communication Skills",
            },
            { name: "Urdu", description: "Grammar, Literature, Composition" },
            {
              name: "Islamic Studies",
              description: "Quran, Hadith, Islamic Teachings",
            },
          ],
        },
        year2: {
          title: "Second Year",
          subjects: [
            {
              name: "Physics",
              description: "Waves, Electricity, Electronics, Modern Physics",
            },
            {
              name: "Mathematics",
              description: "Calculus, Probability, Linear Algebra",
            },
            {
              name: "Computer Science",
              description: "Data Structures, Object-Oriented Programming",
            },
            {
              name: "English",
              description: "Advanced English, Technical Writing",
            },
            {
              name: "Urdu",
              description: "Advanced Literature, Poetry Analysis",
            },
            {
              name: "Pakistan Studies",
              description: "History, Geography, Governance",
            },
          ],
        },
      },
      admissionCriteria: [
        "Matriculation certificate with minimum 60% marks",
        "Mathematics is mandatory",
        "Computer Science or relevant experience preferred",
        "Age limit: 15-19 years at the time of admission",
        "Basic computer literacy test",
      ],
      feeStructure: {
        admission: "Rs. 5,000",
        monthly: "Rs. 3,500",
        lab: "Rs. 3,000",
        total: "Rs. 48,000 (Annual)",
      },
    },
    icom: {
      id: "icom",
      name: "ICom (Commerce)",
      fullName: "Intermediate in Commerce",
      duration: "2 Years",
      subjects: [
        "Accounting",
        "Business Studies",
        "Economics",
        "Statistics",
        "English",
        "Urdu",
        "Islamic Studies",
      ],
      description:
        "The Commerce program provides comprehensive business education, covering accounting, economics, and business management principles for future business leaders.",
      requirements: "Minimum 50% in Matriculation",
      careerPaths: [
        "BBA",
        "Business Administration",
        "Banking",
        "Accounting",
        "Economics",
        "Finance",
        "Commerce",
      ],
      icon: "📊",
      color: "bg-yellow-100 text-yellow-600",
      bgColor: "bg-yellow-600",
      overview:
        "Our Commerce program has been a stepping stone for many successful business professionals. With practical approach to business education and industry exposure, we prepare students for the corporate world.",
      features: [
        "Practical accounting and business training",
        "Industry visits and business exposure",
        "Entrepreneurship development programs",
        "Banking and finance workshops",
        "Communication and presentation skills",
        "Business entrance test preparation",
      ],
      curriculum: {
        year1: {
          title: "First Year",
          subjects: [
            {
              name: "Accounting",
              description: "Basic Accounting Principles, Journal, Ledger",
            },
            {
              name: "Business Studies",
              description: "Introduction to Business, Management Principles",
            },
            {
              name: "Economics",
              description: "Microeconomics, Demand and Supply",
            },
            {
              name: "Statistics",
              description: "Data Collection, Presentation, Measures",
            },
            { name: "English", description: "Business English, Communication" },
            { name: "Urdu", description: "Grammar, Literature, Business Urdu" },
          ],
        },
        year2: {
          title: "Second Year",
          subjects: [
            {
              name: "Accounting",
              description: "Partnership, Company Accounts, Cost Accounting",
            },
            {
              name: "Business Studies",
              description: "Marketing, Finance, Human Resources",
            },
            {
              name: "Economics",
              description: "Macroeconomics, Money and Banking",
            },
            {
              name: "Statistics",
              description: "Probability, Business Statistics, Analysis",
            },
            {
              name: "English",
              description: "Report Writing, Business Correspondence",
            },
            {
              name: "Urdu",
              description: "Commercial Urdu, Business Communication",
            },
          ],
        },
      },
      admissionCriteria: [
        "Matriculation certificate with minimum 50% marks",
        "Mathematics recommended but not mandatory",
        "Interest in business and commerce",
        "Age limit: 15-19 years at the time of admission",
        "Basic English proficiency",
      ],
      feeStructure: {
        admission: "Rs. 4,000",
        monthly: "Rs. 2,500",
        lab: "Rs. 1,000",
        total: "Rs. 35,000 (Annual)",
      },
    },
    fa: {
      id: "fa",
      name: "FA (Arts)",
      fullName: "Faculty of Arts",
      duration: "2 Years",
      subjects: [
        "English",
        "Urdu",
        "Islamic Studies",
        "Pakistan Studies",
        "Psychology",
        "Sociology",
        "Philosophy",
      ],
      description:
        "The Arts program offers a liberal arts education focusing on humanities, social sciences, and cultural studies, developing critical thinking and communication skills.",
      requirements: "Minimum 50% in Matriculation",
      careerPaths: [
        "Bachelor of Arts",
        "Education",
        "Journalism",
        "Social Work",
        "Psychology",
        "Literature",
        "Public Service",
      ],
      icon: "📚",
      color: "bg-red-100 text-red-600",
      bgColor: "bg-red-600",
      overview:
        "Our Arts program nurtures creativity, critical thinking, and cultural awareness. With emphasis on language skills and social understanding, we prepare students for diverse career paths in humanities.",
      features: [
        "Rich library resources and research facilities",
        "Language development and communication skills",
        "Cultural and literary activities",
        "Psychology and sociology workshops",
        "Creative writing and journalism training",
        "Arts entrance test preparation",
      ],
      curriculum: {
        year1: {
          title: "First Year",
          subjects: [
            {
              name: "English",
              description: "Grammar, Literature, Prose and Poetry",
            },
            {
              name: "Urdu",
              description: "Grammar, Classical Literature, Modern Writers",
            },
            {
              name: "Islamic Studies",
              description: "Quran, Hadith, Islamic History",
            },
            {
              name: "Pakistan Studies",
              description: "History, Geography, Culture",
            },
            {
              name: "Psychology",
              description: "Introduction to Psychology, Human Behavior",
            },
            {
              name: "Sociology",
              description: "Society, Culture, Social Institutions",
            },
          ],
        },
        year2: {
          title: "Second Year",
          subjects: [
            {
              name: "English",
              description: "Advanced Literature, Drama, Novel",
            },
            {
              name: "Urdu",
              description: "Poetry Analysis, Literary Criticism",
            },
            {
              name: "Islamic Studies",
              description: "Islamic Philosophy, Contemporary Issues",
            },
            {
              name: "Pakistan Studies",
              description: "Political System, Economic Development",
            },
            {
              name: "Psychology",
              description: "Developmental Psychology, Social Psychology",
            },
            {
              name: "Philosophy",
              description: "Logic, Ethics, History of Philosophy",
            },
          ],
        },
      },
      admissionCriteria: [
        "Matriculation certificate with minimum 50% marks",
        "Good command of English and Urdu languages",
        "Interest in humanities and social sciences",
        "Age limit: 15-19 years at the time of admission",
        "Interview for assessment of communication skills",
      ],
      feeStructure: {
        admission: "Rs. 4,000",
        monthly: "Rs. 2,000",
        lab: "Rs. 500",
        total: "Rs. 28,500 (Annual)",
      },
    },
  }), []);

  useEffect(() => {
    if (programId && programs[programId]) {
      setProgram(programs[programId]);
    }
  }, [programId, programs]);

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Program Not Found
          </h2>
          <Link
            to="/admissions"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Admissions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroCarousel
        title={program.fullName}
        subtitle={program.overview}
        height="h-64"
        breadcrumbs={[
          { label: "Admissions", href: "/admissions" },
          { label: program.name },
        ]}
      />

      {/* Main Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Program Overview */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Program Overview
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {program.description}
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {program.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle
                          className="text-green-500 flex-shrink-0"
                          size={16}
                        />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Curriculum */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Curriculum Structure
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        {program.curriculum.year1.title}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {program.curriculum.year1.subjects.map(
                          (subject, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 rounded-lg p-4"
                            >
                              <h4 className="font-medium text-gray-800 mb-2">
                                {subject.name}
                              </h4>
                              <p className="text-gray-600 text-sm">
                                {subject.description}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        {program.curriculum.year2.title}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {program.curriculum.year2.subjects.map(
                          (subject, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 rounded-lg p-4"
                            >
                              <h4 className="font-medium text-gray-800 mb-2">
                                {subject.name}
                              </h4>
                              <p className="text-gray-600 text-sm">
                                {subject.description}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Career Paths */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Career Opportunities
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Graduates of this program can pursue various career paths
                    including:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {program.careerPaths.map((career, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Award
                          className="text-primary-600 flex-shrink-0"
                          size={16}
                        />
                        <span className="text-gray-700">{career}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Admission Criteria */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FileText className="mr-2 text-primary-600" size={18} />
                    Admission Criteria
                  </h3>
                  <div className="space-y-3">
                    {program.admissionCriteria.map((criteria, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle
                          className="text-green-500 flex-shrink-0 mt-0.5"
                          size={14}
                        />
                        <span className="text-gray-700 text-sm">
                          {criteria}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fee Structure */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Fee Structure
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Admission Fee</span>
                      <span className="font-medium text-gray-800">
                        {program.feeStructure.admission}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Monthly Fee</span>
                      <span className="font-medium text-gray-800">
                        {program.feeStructure.monthly}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Lab Fee</span>
                      <span className="font-medium text-gray-800">
                        {program.feeStructure.lab}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 font-semibold">
                      <span className="text-gray-800">Total (Annual)</span>
                      <span className="text-primary-600">
                        {program.feeStructure.total}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center">
                      <Download className="mr-2" size={16} />
                      Download Prospectus
                    </button>
                    <button className="w-full border border-primary-600 text-primary-600 py-2 px-4 rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center">
                      <FileText className="mr-2" size={16} />
                      Application Form
                    </button>
                    <Link
                      to="/contact"
                      className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
                    >
                      <Users className="mr-2" size={16} />
                      Contact Admissions
                    </Link>
                  </div>
                </div>

                {/* Important Dates */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Calendar className="mr-2 text-primary-600" size={18} />
                    Important Dates
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Application Start</span>
                      <span className="text-primary-600 font-medium">
                        June 1, 2025
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Application Deadline
                      </span>
                      <span className="text-primary-600 font-medium">
                        July 15, 2025
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Entrance Test</span>
                      <span className="text-primary-600 font-medium">
                        July 25, 2025
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Classes Begin</span>
                      <span className="text-primary-600 font-medium">
                        August 15, 2025
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionDetail;
