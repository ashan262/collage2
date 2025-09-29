import React, { useState } from "react";
import {
  Download,
  Calendar,
  Users,
  Trophy,
  AlertCircle,
  CheckCircle,
  FileText,
} from "lucide-react";
import HeroCarousel from "../components/Herocarousal";
import TabNavigation from "../components/TabNavigation";

const MeritLists2025 = () => {
  const [activeTab, setActiveTab] = useState("hssc");

  // HSSC Merit Lists Data
  const hsscMeritLists = [
    {
      program: "HSSC Pre-Medical",
      firstList: {
        date: "20th July 2025",
        status: "upcoming",
        seats: 120,
        admitted: 0,
      },
      secondList: {
        date: "30th July 2025",
        status: "upcoming",
        seats: 0,
        admitted: 0,
      },
      thirdList: {
        date: "10th August 2025",
        status: "upcoming",
        seats: 0,
        admitted: 0,
      },
    },
    {
      program: "HSSC Pre-Engineering",
      firstList: {
        date: "20th July 2025",
        status: "upcoming",
        seats: 100,
        admitted: 0,
      },
      secondList: {
        date: "30th July 2025",
        status: "upcoming",
        seats: 0,
        admitted: 0,
      },
      thirdList: {
        date: "10th August 2025",
        status: "upcoming",
        seats: 0,
        admitted: 0,
      },
    },
    {
      program: "HSSC Computer Science",
      firstList: {
        date: "20th July 2025",
        status: "upcoming",
        seats: 80,
        admitted: 0,
      },
      secondList: {
        date: "30th July 2025",
        status: "upcoming",
        seats: 0,
        admitted: 0,
      },
      thirdList: {
        date: "10th August 2025",
        status: "upcoming",
        seats: 0,
        admitted: 0,
      },
    },
    {
      program: "HSSC Commerce",
      firstList: {
        date: "20th July 2025",
        status: "upcoming",
        seats: 60,
        admitted: 0,
      },
      secondList: {
        date: "30th July 2025",
        status: "upcoming",
        seats: 0,
        admitted: 0,
      },
      thirdList: {
        date: "10th August 2025",
        status: "upcoming",
        seats: 0,
        admitted: 0,
      },
    },
  ];

  // BS Merit Lists Data
  const bsMeritLists = [
    {
      program: "BS Computer Science",
      firstList: {
        date: "30th April 2025",
        status: "published",
        seats: 60,
        admitted: 45,
      },
      secondList: {
        date: "15th May 2025",
        status: "published",
        seats: 15,
        admitted: 12,
      },
      thirdList: {
        date: "30th May 2025",
        status: "upcoming",
        seats: 3,
        admitted: 0,
      },
    },
    {
      program: "BS Mathematics",
      firstList: {
        date: "30th April 2025",
        status: "published",
        seats: 40,
        admitted: 32,
      },
      secondList: {
        date: "15th May 2025",
        status: "published",
        seats: 8,
        admitted: 6,
      },
      thirdList: {
        date: "30th May 2025",
        status: "upcoming",
        seats: 2,
        admitted: 0,
      },
    },
    {
      program: "BS Physics",
      firstList: {
        date: "30th April 2025",
        status: "published",
        seats: 40,
        admitted: 30,
      },
      secondList: {
        date: "15th May 2025",
        status: "published",
        seats: 10,
        admitted: 8,
      },
      thirdList: {
        date: "30th May 2025",
        status: "upcoming",
        seats: 2,
        admitted: 0,
      },
    },
    {
      program: "BS Chemistry",
      firstList: {
        date: "30th April 2025",
        status: "published",
        seats: 40,
        admitted: 35,
      },
      secondList: {
        date: "15th May 2025",
        status: "published",
        seats: 5,
        admitted: 4,
      },
      thirdList: {
        date: "30th May 2025",
        status: "upcoming",
        seats: 1,
        admitted: 0,
      },
    },
  ];

  // BBA Merit Lists Data
  const bbaMeritLists = [
    {
      program: "BBA General",
      firstList: {
        date: "1st June 2025",
        status: "upcoming",
        seats: 80,
        admitted: 0,
      },
      secondList: {
        date: "15th June 2025",
        status: "upcoming",
        seats: 0,
        admitted: 0,
      },
      thirdList: {
        date: "30th June 2025",
        status: "upcoming",
        seats: 0,
        admitted: 0,
      },
    },
    {
      program: "BBA Finance",
      firstList: {
        date: "1st June 2025",
        status: "upcoming",
        seats: 60,
        admitted: 0,
      },
      secondList: {
        date: "15th June 2025",
        status: "upcoming",
        seats: 0,
        admitted: 0,
      },
      thirdList: {
        date: "30th June 2025",
        status: "upcoming",
        seats: 0,
        admitted: 0,
      },
    },
    {
      program: "BBA Marketing",
      firstList: {
        date: "1st June 2025",
        status: "upcoming",
        seats: 50,
        admitted: 0,
      },
      secondList: {
        date: "15th June 2025",
        status: "upcoming",
        seats: 0,
        admitted: 0,
      },
      thirdList: {
        date: "30th June 2025",
        status: "upcoming",
        seats: 0,
        admitted: 0,
      },
    },
  ];

  // Get current merit lists based on active tab
  const getCurrentMeritLists = () => {
    switch (activeTab) {
      case "hssc":
        return hsscMeritLists;
      case "bs":
        return bsMeritLists;
      case "bba":
        return bbaMeritLists;
      default:
        return hsscMeritLists;
    }
  };

  // Tab configuration
  const tabs = [
    { id: "hssc", label: "HSSC Programs", icon: "🎓", color: "text-green-600" },
    { id: "bs", label: "BS Programs", icon: "📚", color: "text-blue-600" },
    { id: "bba", label: "BBA Programs", icon: "💼", color: "text-orange-600" },
  ];

  // Get the current active tab label for breadcrumbs
  const getCurrentTabLabel = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTab);
    return currentTab ? currentTab.label : "HSSC Programs";
  };

  const sampleMeritList = [
    {
      rollNo: "BS-CS-001",
      name: "Muhammad Ahmed Khan",
      marks: 1847,
      percentage: 92.35,
      position: 1,
      status: "Selected",
    },
    {
      rollNo: "BS-CS-002",
      name: "Fatima Malik",
      marks: 1821,
      percentage: 91.05,
      position: 2,
      status: "Selected",
    },
    {
      rollNo: "BS-CS-003",
      name: "Ali Hassan",
      marks: 1798,
      percentage: 89.9,
      position: 3,
      status: "Selected",
    },
    {
      rollNo: "BS-CS-004",
      name: "Ayesha Ahmad",
      marks: 1776,
      percentage: 88.8,
      position: 4,
      status: "Selected",
    },
    {
      rollNo: "BS-CS-005",
      name: "Omar Farooq",
      marks: 1754,
      percentage: 87.7,
      position: 5,
      status: "Selected",
    },
    {
      rollNo: "BS-CS-006",
      name: "Zainab Sheikh",
      marks: 1732,
      percentage: 86.6,
      position: 6,
      status: "Selected",
    },
    {
      rollNo: "BS-CS-007",
      name: "Hassan Ali",
      marks: 1710,
      percentage: 85.5,
      position: 7,
      status: "Selected",
    },
    {
      rollNo: "BS-CS-008",
      name: "Maryam Khan",
      marks: 1688,
      percentage: 84.4,
      position: 8,
      status: "Selected",
    },
    {
      rollNo: "BS-CS-009",
      name: "Usman Ahmed",
      marks: 1666,
      percentage: 83.3,
      position: 9,
      status: "Waiting",
    },
    {
      rollNo: "BS-CS-010",
      name: "Saba Hussain",
      marks: 1644,
      percentage: 82.2,
      position: 10,
      status: "Waiting",
    },
  ];

  const instructions = [
    "Merit lists are prepared based on marks obtained in the entry test and academic record",
    "Selected candidates must confirm admission within 7 days of merit list publication",
    "Original documents must be submitted at the time of admission confirmation",
    "Fee must be deposited within the specified deadline to secure admission",
    "Waiting list candidates will be called as per seat availability",
    "All information regarding admission will be updated on college website and notice board",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroCarousel
        title="Merit Lists 2025"
        subtitle="Check your admission status and merit position"
        height="h-64"
        breadcrumbs={[
          { label: "Admissions", href: "/admissions" },
          { label: "Merit Lists 2025", href: "/merit-lists-2025" },
          { label: getCurrentTabLabel() },
        ]}
      />

      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Merit List Status */}
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
            {activeTab === "hssc" && "HSSC Merit Lists"}
            {activeTab === "bs" && "BS Programs Merit Lists"}
            {activeTab === "bba" && "BBA Programs Merit Lists"}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track the publication status of merit lists for{" "}
            {tabs.find((tab) => tab.id === activeTab)?.label}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {getCurrentMeritLists().map((program, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Trophy className="text-purple-600 mr-3" size={24} />
                <h3 className="text-xl font-heading font-bold text-gray-800">
                  {program.program}
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">1st Merit List</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {program.firstList.date}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        program.firstList.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {program.firstList.status === "published"
                        ? "Published"
                        : "Upcoming"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">2nd Merit List</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {program.secondList.date}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        program.secondList.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {program.secondList.status === "published"
                        ? "Published"
                        : "Upcoming"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">3rd Merit List</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {program.thirdList.date}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        program.thirdList.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {program.thirdList.status === "published"
                        ? "Published"
                        : "Upcoming"}
                    </span>
                  </div>
                </div>
              </div>

              {program.firstList.status === "published" && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span>Total Seats: {program.firstList.seats}</span>
                    <span>Admitted: {program.firstList.admitted}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sample Merit List */}
      {activeTab === "bs" && (
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                BS Computer Science - 1st Merit List
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                First merit list for BS Computer Science admission 2025
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
                <h3 className="text-lg font-semibold">Merit List Results</h3>
                <button className="flex items-center bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors">
                  <Download size={16} className="mr-2" />
                  Download PDF
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roll Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Marks
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Percentage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sampleMeritList.map((student, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.rollNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.marks}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.percentage}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              student.status === "Selected"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HSSC Merit Lists Section */}
      {activeTab === "hssc" && (
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                HSSC Merit Lists & Information
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Complete information for HSSC admissions, merit lists, and
                interview instructions
              </p>
            </div>

            {/* HSSC Subcategories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Interview Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="text-blue-600 text-3xl mr-3">📋</div>
                  <h3 className="text-xl font-bold text-blue-800">
                    Interview Instructions
                  </h3>
                </div>
                <div className="text-blue-700 space-y-3">
                  <p className="font-semibold">
                    Important Guidelines for HSSC Interviews:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Bring original documents and photocopies</li>
                    <li>Report 30 minutes before scheduled time</li>
                    <li>Dress code: Formal attire required</li>
                    <li>Mobile phones not allowed in interview hall</li>
                    <li>Interview duration: 15-20 minutes</li>
                  </ul>
                  <div className="mt-4 p-3 bg-blue-100 rounded">
                    <p className="text-sm font-medium">
                      Interview Schedule: July 25-30, 2025
                    </p>
                  </div>
                </div>
              </div>

              {/* HSSC Pre Engineering */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="text-green-600 text-3xl mr-3">⚙️</div>
                  <h3 className="text-xl font-bold text-green-800">
                    HSSC Pre Engineering
                  </h3>
                </div>
                <div className="text-green-700 space-y-3">
                  <p className="font-semibold">Merit List Status:</p>
                  <div className="bg-green-100 p-3 rounded">
                    <p className="text-sm">
                      📅 <strong>Publication Date:</strong> July 22, 2025
                    </p>
                    <p className="text-sm">
                      👥 <strong>Total Seats:</strong> 120
                    </p>
                    <p className="text-sm">
                      📊 <strong>Last Merit:</strong> To be announced
                    </p>
                  </div>
                  <p className="text-sm">
                    <strong>Subjects:</strong> Mathematics, Physics, Chemistry,
                    English, Urdu/Pak Studies
                  </p>
                  <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm">
                    View Merit List
                  </button>
                </div>
              </div>

              {/* HSSC Pre Medical */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="text-red-600 text-3xl mr-3">🏥</div>
                  <h3 className="text-xl font-bold text-red-800">
                    HSSC Pre Medical
                  </h3>
                </div>
                <div className="text-red-700 space-y-3">
                  <p className="font-semibold">Merit List Status:</p>
                  <div className="bg-red-100 p-3 rounded">
                    <p className="text-sm">
                      📅 <strong>Publication Date:</strong> July 22, 2025
                    </p>
                    <p className="text-sm">
                      👥 <strong>Total Seats:</strong> 100
                    </p>
                    <p className="text-sm">
                      📊 <strong>Last Merit:</strong> To be announced
                    </p>
                  </div>
                  <p className="text-sm">
                    <strong>Subjects:</strong> Biology, Chemistry, Physics,
                    English, Urdu/Pak Studies
                  </p>
                  <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm">
                    View Merit List
                  </button>
                </div>
              </div>

              {/* HSSC General Science */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="text-purple-600 text-3xl mr-3">🔬</div>
                  <h3 className="text-xl font-bold text-purple-800">
                    HSSC General Science
                  </h3>
                </div>
                <div className="text-purple-700 space-y-3">
                  <p className="font-semibold">Available Combinations:</p>
                  <div className="space-y-2 text-sm">
                    <div className="bg-purple-100 p-2 rounded">
                      <strong>Math-Physics-Computer:</strong> 80 seats
                    </div>
                    <div className="bg-purple-100 p-2 rounded">
                      <strong>Math-Physics-Chemistry:</strong> 60 seats
                    </div>
                    <div className="bg-purple-100 p-2 rounded">
                      <strong>Physics-Computer-Statistics:</strong> 40 seats
                    </div>
                  </div>
                  <div className="bg-purple-100 p-3 rounded">
                    <p className="text-sm">
                      📅 <strong>Merit Lists:</strong> July 23, 2025
                    </p>
                  </div>
                  <button className="mt-3 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors text-sm">
                    View All Combinations
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Important Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl mb-2">📞</div>
                  <h4 className="font-semibold text-gray-800">Contact</h4>
                  <p className="text-sm text-gray-600">
                    051-1234567
                    <br />
                    admissions@fgckohat.edu.pk
                  </p>
                </div>
                <div>
                  <div className="text-2xl mb-2">📄</div>
                  <h4 className="font-semibold text-gray-800">Documents</h4>
                  <p className="text-sm text-gray-600">
                    Matric Certificate
                    <br />
                    Domicile & CNIC
                  </p>
                </div>
                <div>
                  <div className="text-2xl mb-2">💰</div>
                  <h4 className="font-semibold text-gray-800">Fee Structure</h4>
                  <p className="text-sm text-gray-600">
                    Download fee voucher
                    <br />
                    after admission
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BBA Merit List Preview */}
      {activeTab === "bba" && (
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                BBA Merit Lists Coming Soon
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                BBA merit lists will be published starting June 1, 2025
              </p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
              <div className="text-orange-600 text-4xl mb-4">📋</div>
              <h3 className="text-lg font-semibold text-orange-800 mb-2">
                Applications Under Review
              </h3>
              <p className="text-orange-700">
                BBA applications are currently being reviewed. Merit lists will
                be published according to the admission schedule.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <AlertCircle className="text-purple-600 mr-3" size={24} />
            <h3 className="text-2xl font-heading font-bold text-gray-800">
              Important Instructions
            </h3>
          </div>
          <ul className="space-y-3">
            {instructions.map((instruction, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle
                  className="text-green-600 mr-3 mt-0.5 flex-shrink-0"
                  size={16}
                />
                <span className="text-gray-700">{instruction}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MeritLists2025;
