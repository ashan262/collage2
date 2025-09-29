import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Download,
  FileText,
  Users,
  AlertCircle,
  Search,
  CheckCircle,
  AlertTriangle,
  CreditCard,
  Bell,
} from "lucide-react";
import ClassRollNumbers from "./ClassRollNumbers";
import PageHero from "../components/PageHero";
import TabNavigation from "../components/TabNavigation";
import apiService from "../services/apiService";

const Examination = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const [examinations, setExaminations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExaminations();
  }, []);

  const fetchExaminations = async () => {
    try {
      setLoading(true);
      const response = await apiService.get("/examinations/public");
      setExaminations(response.data.data.examinations || []);
    } catch (error) {
      console.error("Error fetching examinations:", error);
      setExaminations([]);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "results", label: "Results", icon: Search },
    { id: "rules", label: "Rules", icon: FileText },
  ];

  // Get the current active tab label for breadcrumbs
  const getCurrentTabLabel = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTab);
    return currentTab ? currentTab.label : "Schedule";
  };

  // Filter examinations by type
  const getExaminationsByType = (type) => {
    return examinations.filter((exam) => exam.type === type);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (duration) => {
    if (!duration) return "Not specified";
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`.trim();
  };

  // Exam Schedule Data - now from API
  const examSchedule = getExaminationsByType("exam");
  const examResults = getExaminationsByType("result");
  const examNotifications = getExaminationsByType("notification");

  // Fallback exam rules if not available from API
  const examRules = [
    "Students must arrive at the examination hall at least 30 minutes before the exam starts.",
    "Bring your admit card and student ID card to the examination hall.",
    "No electronic devices (mobile phones, calculators, etc.) are allowed in the examination hall.",
    "Use only blue or black ink pens for writing answers.",
    "Do not bring any study material or books to the examination hall.",
    "Maintain complete silence during the examination.",
    "Read all instructions carefully before starting the exam.",
    "Do not leave the examination hall before completing at least one hour.",
    "Raise your hand if you need assistance from the invigilator.",
    "Submit your answer sheet before leaving the examination hall.",
    "Any form of unfair means will result in disqualification.",
    "Follow the seating arrangement as displayed outside the examination hall.",
    "Write your roll number clearly on the answer sheet.",
    "Do not carry any food or drinks into the examination hall.",
    "Smoking is strictly prohibited in and around the examination center.",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Examination Center"
        subtitle="Complete Examination Information & Services"
        description="Access examination schedules, results, roll numbers, admit cards, and all examination-related information for F.G Degree College for Boys Kohat."
        height="h-64 md:h-72"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Examination", href: "/examination" },
          { label: getCurrentTabLabel() },
        ]}
        backgroundImage="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop"
      />

      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Tab Content */}
      <div className="container mx-auto px-4 pb-16">
        {/* Exam Schedule Tab */}
        {activeTab === "schedule" && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                Examination Schedule
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Complete examination timetable for all programs
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-heading font-bold text-gray-800 mb-2">
                    Current Exam Schedule
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Examination Schedule {new Date().getFullYear()}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-2" size={16} />
                    {examSchedule.length > 0
                      ? `${examSchedule.length} examinations scheduled`
                      : "No examinations scheduled"}
                  </div>
                </div>
                <div className="mt-4 lg:mt-0">
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                    <Download className="mr-2" size={16} />
                    Download Schedule
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ) : examSchedule.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-800">
                          Title
                        </th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-800">
                          Date
                        </th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-800">
                          Duration
                        </th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-800">
                          Center
                        </th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-800">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {examSchedule.map((exam, index) => (
                        <tr
                          key={exam._id || index}
                          className="hover:bg-gray-50"
                        >
                          <td className="border border-gray-200 px-4 py-3 font-medium text-gray-800">
                            {exam.title}
                            {exam.subjects && exam.subjects.length > 0 && (
                              <div className="text-sm text-gray-600 mt-1">
                                Subjects: {exam.subjects.join(", ")}
                              </div>
                            )}
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-gray-600">
                            {formatDate(exam.examDate)}
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-gray-600">
                            {formatTime(exam.duration)}
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-gray-600">
                            {exam.examCenter || "Main Campus"}
                          </td>
                          <td className="border border-gray-200 px-4 py-3">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {exam.type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No examinations scheduled
                  </h3>
                  <p className="text-gray-600">
                    Examination schedule will be updated soon.
                  </p>
                </div>
              )}
            </div>

            {/* Important Dates */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-heading font-bold text-gray-800 mb-6 flex items-center">
                <Clock className="text-purple-600 mr-3" size={24} />
                Important Dates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="font-medium text-gray-700">
                    Admit Card Release
                  </span>
                  <span className="text-sm text-gray-600">March 1, 2025</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="font-medium text-gray-700">
                    Exam Start Date
                  </span>
                  <span className="text-sm text-gray-600">March 15, 2025</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="font-medium text-gray-700">
                    Exam End Date
                  </span>
                  <span className="text-sm text-gray-600">March 25, 2025</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-medium text-gray-700">
                    Result Declaration
                  </span>
                  <span className="text-sm text-gray-600">April 10, 2025</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === "results" && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                Examination Results
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Check your results and download certificates
              </p>
            </div>

            {/* Result Search */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-heading font-bold text-gray-800 mb-6 flex items-center">
                <Search className="text-purple-600 mr-3" size={24} />
                Search Your Result
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your roll number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Program
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Select Program</option>
                    <option>HSSC Pre-Medical</option>
                    <option>HSSC Pre-Engineering</option>
                    <option>BS Computer Science</option>
                    <option>BS Mathematics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Select Session</option>
                    <option>Annual 2024</option>
                    <option>Semester Spring 2024</option>
                    <option>Semester Fall 2024</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                  <Search className="mr-2" size={16} />
                  Search Result
                </button>
              </div>
            </div>

            {/* Recent Results */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-heading font-bold text-gray-800 mb-6">
                Recent Results
              </h3>
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ) : examResults.length > 0 ? (
                <div className="space-y-4">
                  {examResults.map((result) => (
                    <div
                      key={result._id}
                      className="p-4 border border-green-200 rounded-lg bg-green-50"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {result.title}
                        </h4>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                          Available
                        </span>
                      </div>
                      {result.description && (
                        <p className="text-sm text-gray-600 mb-3">
                          {result.description}
                        </p>
                      )}
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          {result.resultDate &&
                            `Published: ${formatDate(result.resultDate)}`}
                        </div>
                        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm">
                          View Results
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No results available
                  </h3>
                  <p className="text-gray-600">
                    Examination results will be published here when available.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Roll Numbers Tab */}
        {activeTab === "roll-numbers" && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                Class Roll Numbers
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Download roll number lists for all classes and sections
              </p>
            </div>
            <ClassRollNumbers />
          </div>
        )}

        {/* Exam Rules Tab */}
        {activeTab === "rules" && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                Examination Rules & Regulations
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Important guidelines and regulations for examinations
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-heading font-bold text-gray-800 mb-6 flex items-center">
                <FileText className="text-purple-600 mr-3" size={24} />
                Examination Rules
              </h3>
              <ul className="space-y-3">
                {examRules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle
                      className="text-green-500 mr-3 mt-0.5 flex-shrink-0"
                      size={16}
                    />
                    <span className="text-gray-700">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start">
                <AlertTriangle
                  className="text-yellow-600 mr-3 mt-1 flex-shrink-0"
                  size={24}
                />
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    Important Notice
                  </h4>
                  <p className="text-yellow-700 text-sm">
                    Violation of any examination rule may result in cancellation
                    of the examination and disciplinary action. Students are
                    advised to read and follow all rules carefully.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admit Cards Tab */}
        {activeTab === "admit-cards" && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                Admit Cards
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Download your examination admit cards
              </p>
            </div>

            {/* Download Admit Card */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-heading font-bold text-gray-800 mb-6 flex items-center">
                <CreditCard className="text-purple-600 mr-3" size={24} />
                Download Admit Card
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your roll number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter father's name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                <Download className="mr-2" size={16} />
                Download Admit Card
              </button>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-800 mb-4 flex items-center">
                <Bell className="mr-2" size={20} />
                Important Instructions
              </h4>
              <ul className="space-y-2 text-blue-700 text-sm">
                <li>
                  • Admit cards will be available 7 days before the examination
                </li>
                <li>• Ensure all details on the admit card are correct</li>
                <li>
                  • Contact the examination office immediately if there are any
                  errors
                </li>
                <li>
                  • Admit card is mandatory for entering the examination hall
                </li>
                <li>• Keep a photocopy of your admit card for your records</li>
              </ul>
            </div>

            {/* Available Admit Cards */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-heading font-bold text-gray-800 mb-6">
                Available Admit Cards
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border border-green-200 rounded-lg bg-green-50">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Annual Examination 2025
                    </h4>
                    <p className="text-sm text-gray-600">
                      HSSC and BS Programs
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Available
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Mid-Term Examination
                    </h4>
                    <p className="text-sm text-gray-600">All Programs</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appeals Tab */}
        {activeTab === "appeals" && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                Result Appeals Process
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Submit appeals for result rechecking and re-evaluation
              </p>
            </div>

            {/* Appeal Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-heading font-bold text-gray-800 mb-6">
                Submit Appeal Application
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter student name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter roll number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Program
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Select Program</option>
                    <option>HSSC Pre-Medical</option>
                    <option>HSSC Pre-Engineering</option>
                    <option>BS Computer Science</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appeal Type
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Select Appeal Type</option>
                    <option>Rechecking</option>
                    <option>Re-evaluation</option>
                    <option>Both</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Appeal
                </label>
                <textarea
                  rows="4"
                  placeholder="Explain the reason for your appeal"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                ></textarea>
              </div>
              <div className="mt-6">
                <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                  Submit Appeal
                </button>
              </div>
            </div>

            {/* Appeal Process */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-heading font-bold text-gray-800 mb-6">
                Appeal Process Timeline
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-purple-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Submit Application
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Submit your appeal application with required documents
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-purple-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Application Review
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Examination committee reviews your application (3-5
                      working days)
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Rechecking Process
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Answer sheets are rechecked by qualified examiners (7-10
                      working days)
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-purple-600 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Result Notification
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Updated results are communicated to the student
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fee Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-heading font-bold text-gray-800 mb-4">
                Appeal Fees
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    Rs. 500
                  </div>
                  <p className="text-sm text-gray-600">
                    Per Subject Rechecking
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    Rs. 1000
                  </div>
                  <p className="text-sm text-gray-600">
                    Per Subject Re-evaluation
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    Rs. 1400
                  </div>
                  <p className="text-sm text-gray-600">Both Services</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Examination;
