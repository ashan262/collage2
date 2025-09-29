import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  FileText,
  Calendar,
  CheckCircle,
  Download,
  Users,
  Award,
  Clock,
  BookOpen,
  ArrowRight,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import PageHero from "../components/PageHero";
import ClassRollNumbers from "./ClassRollNumbers";
import TabNavigation from "../components/TabNavigation";
import { toast } from "react-hot-toast";
import { apiService } from "../services/apiService";

const Admissions = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch admissions data from API
  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        setLoading(true);
        const response = await apiService.get("/admissions");
        setAdmissions(response.data.data.admissions || []);
      } catch (error) {
        console.error("Error fetching admissions:", error);
        toast.error("Failed to load admissions data");
        setAdmissions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissions();
  }, []);

  // Download functions for different documents
  const handleDownload = (documentType, fileName) => {
    try {
      // Create a temporary download link
      const link = document.createElement("a");

      // Define document URLs - these should be actual file paths in production
      const documentUrls = {
        prospectus:
          "/documents/F.G Degree College for Boys Kohat-Prospectus-2025.pdf",
        applicationForm:
          "/documents/F.G Degree College for Boys Kohat-Application-Form-2025.pdf",
        admissionPolicy:
          "/documents/F.G Degree College for Boys Kohat-Admission-Policy-2025.pdf",
        feeStructure:
          "/documents/F.G Degree College for Boys Kohat-Fee-Structure-2025.pdf",
        bsProspectus:
          "/documents/F.G Degree College for Boys Kohat-BS-Programs-2025.pdf",
        hsscProspectus:
          "/documents/F.G Degree College for Boys Kohat-HSSC-Programs-2025.pdf",
        uniformGuide:
          "/documents/F.G Degree College for Boys Kohat-Uniform-Guidelines-2025.pdf",
        courseCatalog:
          "/documents/F.G Degree College for Boys Kohat-Course-Catalog-2025.pdf",
      };

      const documentUrl = documentUrls[documentType];

      if (documentUrl) {
        link.href = documentUrl;
        link.download =
          fileName ||
          `F.G Degree College for Boys Kohat-${documentType}-2025.pdf`;
        link.target = "_blank";

        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Show success message (you can replace this with a toast notification)
        console.log(`Downloading ${fileName || documentType}...`);
      } else {
        // Fallback: Show alert for unavailable documents
        alert(
          `${
            fileName || documentType
          } is currently not available. Please contact the admission office.`
        );
      }
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Unable to download the document. Please try again later.");
    }
  };

  // Function to download multiple documents as a ZIP (placeholder)
  const handleBulkDownload = () => {
    toast(
      "Bulk download feature will be available soon. Please download documents individually for now."
    );
  };

  const admissionProcess = [
    {
      step: 1,
      title: "Application Submission",
      description: "Submit your application form with required documents",
      icon: FileText,
      details: [
        "Fill online application form",
        "Submit required documents",
        "Pay application fee",
      ],
    },
    {
      step: 2,
      title: "Entrance Test",
      description: "Appear for the entrance examination",
      icon: BookOpen,
      details: [
        "Written test on core subjects",
        "Test duration: 2 hours",
        "Minimum 60% required to pass",
      ],
    },
    {
      step: 3,
      title: "Merit List",
      description: "Check your name in the merit list",
      icon: Award,
      details: [
        "Merit based on test score",
        "List published on website",
        "SMS notification sent",
      ],
    },
    {
      step: 4,
      title: "Document Verification",
      description: "Verify your documents and complete admission",
      icon: CheckCircle,
      details: [
        "Bring original documents",
        "Pay admission fee",
        "Collect admission letter",
      ],
    },
  ];

  const requirements = [
    "Matriculation Certificate (Original + 2 copies)",
    "Character Certificate from previous institution",
    "Migration Certificate (if applicable)",
    "CNIC copy of student and guardian",
    "4 recent passport-size photographs",
    "Medical Certificate",
    "Fee voucher/receipt",
  ];

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "process", label: "Process" },
    { id: "admission-2025", label: "Admission" },
    { id: "merit-lists", label: "Merit Lists" },
    { id: "roll-numbers", label: "Class Roll Numbers" },
    { id: "policies", label: "Policies" },
  ];

  // Get the current active tab label for breadcrumbs
  const getCurrentTabLabel = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTab);
    return currentTab ? currentTab.label : "Overview";
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Admissions"
        subtitle="Join F.G Degree College for Boys Kohat - Your Gateway to Academic Excellence"
        description="Begin your journey towards academic excellence and character development with comprehensive admission information and guidelines."
        height="h-64 md:h-72"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Admissions", href: "/admissions" },
          { label: getCurrentTabLabel() },
        ]}
        backgroundImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop"
      />

      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Tab Content */}
      <div className="py-16">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <section className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                  Admission Overview
                </h2>
                <p className="text-gray-600 text-lg">
                  Join thousands of successful alumni who started their journey
                  at F.G Degree College for Boys Kohat
                </p>
              </div>

              {/* Admission Advertisement remove hard data when dispaly add image */}
              <div className="mb-12">
                <div className="bg-blue-600 rounded-lg p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Admissions Open 2025-26
                  </h3>
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <img
                      src="/api/placeholder/800/400"
                      alt="F.G Degree College for Boys Kohat Admission Advertisement 2025-26"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                      style={{ maxHeight: "400px", objectFit: "cover" }}
                    />
                    <div className="text-center">
                      <p className="text-gray-600 text-sm mb-4">
                        Join F.G Degree College for Boys Kohat for quality
                        education and bright future
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                          onClick={() =>
                            handleDownload(
                              "applicationForm",
                              "F.G Degree College for Boys Kohat-Application-Form-2025.pdf"
                            )
                          }
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Apply Now
                        </button>
                        <button
                          onClick={() =>
                            handleDownload(
                              "prospectus",
                              "F.G Degree College for Boys Kohat-Prospectus-2025.pdf"
                            )
                          }
                          className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
                        >
                          Download Prospectus
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Admission Updates */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <GraduationCap className="mr-2 text-primary-600" size={20} />
                  Latest Admission Updates
                </h3>

                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : admissions.length > 0 ? (
                  <div className="space-y-4">
                    {admissions.slice(0, 5).map((admission) => (
                      <div
                        key={admission._id}
                        className="flex items-start justify-between py-4 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 mb-1">
                            {admission.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {admission.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary-100 text-primary-700">
                              {admission.type
                                ?.replace("-", " ")
                                .replace(/^\w/, (c) => c.toUpperCase())}
                            </span>
                            <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                              {admission.program}
                            </span>
                            <span>
                              {new Date(
                                admission.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        {admission.isFeatured && (
                          <span className="ml-4 inline-flex items-center px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <GraduationCap className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <p>No admission updates available at the moment.</p>
                  </div>
                )}
              </div>

              {/* Download Prospectus */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Download Admission Information
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <button
                    onClick={() =>
                      handleDownload(
                        "prospectus",
                        "F.G Degree College for Boys Kohat-Prospectus-2025.pdf"
                      )
                    }
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="mr-2" size={16} />
                    Download Prospectus
                  </button>
                  <button
                    onClick={() =>
                      handleDownload(
                        "applicationForm",
                        "F.G Degree College for Boys Kohat-Application-Form-2025.pdf"
                      )
                    }
                    className="inline-flex items-center border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <FileText className="mr-2" size={16} />
                    Application Form
                  </button>
                </div>

                {/* Additional Downloads */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  <button
                    onClick={() =>
                      handleDownload(
                        "admissionPolicy",
                        "F.G Degree College for Boys Kohat-Admission-Policy-2025.pdf"
                      )
                    }
                    className="inline-flex items-center justify-center bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <FileText className="mr-2" size={14} />
                    Admission Policy
                  </button>
                  <button
                    onClick={() =>
                      handleDownload(
                        "feeStructure",
                        "F.G Degree College for Boys Kohat-Fee-Structure-2025.pdf"
                      )
                    }
                    className="inline-flex items-center justify-center bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <DollarSign className="mr-2" size={14} />
                    Fee Structure
                  </button>
                  <button
                    onClick={() => handleBulkDownload()}
                    className="inline-flex items-center justify-center bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="mr-2" size={14} />
                    Download All
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
        {/* Process Tab */}
        {activeTab === "process" && (
          <section className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                  Admission Process
                </h2>
                <p className="text-gray-600 text-lg">
                  Follow these simple steps to complete your admission to FGDC Boys
                  Kohat
                </p>
              </div>

              {/* Process Steps */}
              <div className="space-y-8 mb-12">
                {admissionProcess.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <step.icon className="text-primary-600" size={20} />
                          <h3 className="text-xl font-semibold text-gray-800">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 mb-4">{step.description}</p>
                        <ul className="space-y-1">
                          {step.details.map((detail, idx) => (
                            <li
                              key={idx}
                              className="flex items-center space-x-2 text-sm text-gray-600"
                            >
                              <CheckCircle
                                className="text-green-500"
                                size={14}
                              />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {index < admissionProcess.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Required Documents */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <FileText className="mr-2 text-primary-600" size={20} />
                  Required Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle
                        className="text-green-500 flex-shrink-0"
                        size={16}
                      />
                      <span className="text-gray-700 text-sm">
                        {requirement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Combined Admission 2025 Tab */}
        {activeTab === "admission-2025" && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-heading font-bold text-gray-800 mb-8 text-center">
                  Admission 2025
                </h2>

                {/* Dynamic Admissions - All Programs */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                  <h3 className="text-2xl font-bold text-primary-600 mb-6">
                    Latest Admission Updates
                  </h3>

                  {loading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="animate-pulse p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-full"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {admissions.map((admission) => (
                        <div
                          key={admission._id}
                          className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="text-xl font-bold text-gray-800">
                              {admission.title}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                  admission.program === "BS"
                                    ? "bg-blue-100 text-blue-700"
                                    : admission.program === "HSSC"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-purple-100 text-purple-700"
                                }`}
                              >
                                {admission.program}
                              </span>
                              <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                                {admission.type
                                  ?.replace("-", " ")
                                  .replace(/^\w/, (c) => c.toUpperCase())}
                              </span>
                              {admission.isFeatured && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {admission.description}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                              <span>
                                Academic Year: {admission.academicYear}
                              </span>
                            </div>
                            {admission.applicationStartDate && (
                              <div className="flex items-center text-gray-600">
                                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                <span>
                                  Start:{" "}
                                  {new Date(
                                    admission.applicationStartDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                            {admission.applicationEndDate && (
                              <div className="flex items-center text-gray-600">
                                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                <span>
                                  End:{" "}
                                  {new Date(
                                    admission.applicationEndDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>

                          {admission.eligibility && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                              <h5 className="font-semibold text-gray-800 mb-2">
                                Eligibility Criteria:
                              </h5>
                              <p className="text-gray-600 text-sm">
                                {admission.eligibility}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}

                      {admissions.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                          <GraduationCap className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No Admission Updates
                          </h3>
                          <p>
                            Admission updates will appear here when available.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Programs Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* BS Programs */}
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                      <GraduationCap className="mr-2" />
                      BS Programs 2025
                    </h3>

                    <div className="space-y-4 mb-6">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-gray-800 mb-2">
                          BS Computer Science
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">
                          4-year degree program focusing on software
                          development, algorithms, and computer systems.
                        </p>
                        <p className="text-blue-600 font-medium text-sm">
                          Eligibility: FSc Pre-Engineering/ICS with 60% marks
                        </p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-gray-800 mb-2">
                          BS Mathematics
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">
                          Advanced mathematics program preparing students for
                          research and teaching careers.
                        </p>
                        <p className="text-blue-600 font-medium text-sm">
                          Eligibility: FSc Pre-Engineering with 60% marks
                        </p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-gray-800 mb-2">
                          BS Physics
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">
                          Comprehensive physics program with emphasis on
                          theoretical and experimental physics.
                        </p>
                        <p className="text-blue-600 font-medium text-sm">
                          Eligibility: FSc Pre-Engineering with 60% marks
                        </p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-gray-800 mb-2">
                          BS Chemistry
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">
                          In-depth study of chemical principles with extensive
                          laboratory work.
                        </p>
                        <p className="text-blue-600 font-medium text-sm">
                          Eligibility: FSc Pre-Engineering/Pre-Medical with 60%
                          marks
                        </p>
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        onClick={() =>
                          handleDownload(
                            "bsProspectus",
                            "F.G Degree College for Boys Kohat-BS-Programs-2025.pdf"
                          )
                        }
                        className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download className="mr-2" size={16} />
                        BS Programs Brochure
                      </button>
                    </div>
                  </div>

                  {/* HSSC Programs */}
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center">
                      <BookOpen className="mr-2" />
                      HSSC Programs 2025
                    </h3>

                    <div className="space-y-4 mb-6">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-green-600 mb-2">
                          Pre-Medical Group
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">
                          Core subjects: Physics, Chemistry, Biology
                        </p>
                        <p className="text-green-600 font-medium text-sm">
                          Eligibility: Matric with Science, 60% minimum
                        </p>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-blue-600 mb-2">
                          Pre-Engineering Group
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">
                          Core subjects: Physics, Chemistry, Mathematics
                        </p>
                        <p className="text-blue-600 font-medium text-sm">
                          Eligibility: Matric with Science, 60% minimum
                        </p>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-purple-600 mb-2">
                          Computer Science (ICS)
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">
                          Core subjects: Physics, Mathematics, Computer Science
                        </p>
                        <p className="text-purple-600 font-medium text-sm">
                          Eligibility: Matric with 50% minimum
                        </p>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-orange-600 mb-2">
                          Commerce (I.Com)
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">
                          Core subjects: Accounting, Economics, Business Math
                        </p>
                        <p className="text-orange-600 font-medium text-sm">
                          Eligibility: Matric with 45% minimum
                        </p>
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        onClick={() =>
                          handleDownload(
                            "hsscProspectus",
                            "F.G Degree College for Boys Kohat-HSSC-Programs-2025.pdf"
                          )
                        }
                        className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Download className="mr-2" size={16} />
                        HSSC Programs Guide
                      </button>
                    </div>
                  </div>
                </div>

                {/* Important Dates and Downloads */}
                <div className="mt-8 space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-yellow-800 mb-4 flex items-center">
                      <Calendar className="mr-2" />
                      Important Dates 2025
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ul className="text-yellow-700 space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4" /> Application
                          Start: June 1, 2025
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4" /> Application
                          Deadline: July 15, 2025
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4" /> Entry Test:
                          July 25, 2025
                        </li>
                      </ul>
                      <ul className="text-yellow-700 space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4" /> Merit List
                          Display: August 5, 2025
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4" /> Document
                          Verification: August 5-10, 2025
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4" /> Classes
                          Begin: September 1, 2025
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Download Section */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">
                      Download Admission Documents
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={() =>
                          handleDownload(
                            "applicationForm",
                            "F.G Degree College for Boys Kohat-Application-Form-2025.pdf"
                          )
                        }
                        className="inline-flex items-center justify-center bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <FileText className="mr-2" size={16} />
                        Application Form
                      </button>
                      <button
                        onClick={() =>
                          handleDownload(
                            "prospectus",
                            "F.G Degree College for Boys Kohat-Prospectus-2025.pdf"
                          )
                        }
                        className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download className="mr-2" size={16} />
                        Prospectus
                      </button>
                      <button
                        onClick={() =>
                          handleDownload(
                            "feeStructure",
                            "F.G Degree College for Boys Kohat-Fee-Structure-2025.pdf"
                          )
                        }
                        className="inline-flex items-center justify-center bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <DollarSign className="mr-2" size={16} />
                        Fee Structure
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Merit Lists 2025 Tab */}
        {activeTab === "merit-lists" && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-heading font-bold text-gray-800 mb-8 text-center">
                  Merit Lists 2025
                </h2>

                <div className="bg-white rounded-lg shadow-lg p-8">
                  <div className="text-center mb-8">
                    <div className="bg-green-100 border border-green-300 rounded-lg p-6">
                      <CheckCircle
                        className="mx-auto text-green-600 mb-2"
                        size={32}
                      />
                      <p className="text-green-800 font-medium">
                        Merit lists will be displayed here after the admission
                        process.
                      </p>
                      <p className="text-green-600 text-sm mt-2">
                        Expected release date: August 5, 2025
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        HSSC Programs
                      </h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Pre-Medical Merit List</li>
                        <li>• Pre-Engineering Merit List</li>
                        <li>• Computer Science Merit List</li>
                        <li>• Commerce Merit List</li>
                      </ul>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        BS Programs
                      </h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• BS Computer Science</li>
                        <li>• BS Mathematics</li>
                        <li>• BS Physics</li>
                        <li>• BS Chemistry</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      <strong>Note:</strong> Students are advised to regularly
                      check this page for updates. Merit lists are based on
                      academic performance and entry test scores where
                      applicable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Class Roll Numbers Tab */}
        {activeTab === "roll-numbers" && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-heading font-bold text-gray-800 mb-8 text-center">
                  Class Roll Numbers
                </h2>
                <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                  Download roll number lists for all classes and sections
                </p>
                <ClassRollNumbers />
              </div>
            </div>
          </section>
        )}

        {/* Combined Policies Tab */}
        {activeTab === "policies" && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-heading font-bold text-gray-800 mb-8 text-center">
                  College Policies
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Admission Policies */}
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                      <GraduationCap className="mr-2" />
                      Admission Policies
                    </h3>

                    <div className="space-y-6">
                      <div className="border border-gray-200 rounded-lg p-6">
                        <h4 className="text-lg font-bold text-gray-800 mb-4">
                          General Admission Criteria
                        </h4>
                        <ul className="space-y-2 text-gray-600">
                          <li>
                            • Admission based on merit and academic performance
                          </li>
                          <li>
                            • Original documents required for verification
                          </li>
                          <li>
                            • Character certificate from last attended
                            institution
                          </li>
                          <li>• Medical fitness certificate required</li>
                          <li>• Age requirements as per program guidelines</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-6">
                        <h4 className="text-lg font-bold text-gray-800 mb-4">
                          Category-wise Eligibility
                        </h4>
                        <div className="space-y-4">
                          <div className="bg-blue-50 border border-blue-200 rounded p-4">
                            <h5 className="font-bold text-blue-800">
                              Children of Armed Forces Personnel
                            </h5>
                            <p className="text-blue-700 text-sm">
                              Service certificate required from concerned
                              Formation/Unit
                            </p>
                          </div>
                          <div className="bg-green-50 border border-green-200 rounded p-4">
                            <h5 className="font-bold text-green-800">
                              Civilian Residents of Cantonment
                            </h5>
                            <p className="text-green-700 text-sm">
                              Proof of residence in Rawalpindi/Chaklala Cantt
                              required
                            </p>
                          </div>
                          <div className="bg-purple-50 border border-purple-200 rounded p-4">
                            <h5 className="font-bold text-purple-800">
                              FGEI Employees Children
                            </h5>
                            <p className="text-purple-700 text-sm">
                              Certificate from head of office/institution
                              required
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-6">
                        <h4 className="text-lg font-bold text-gray-800 mb-4">
                          Fee Policy
                        </h4>
                        <ul className="space-y-2 text-gray-600">
                          <li>• Admission fee is non-refundable once paid</li>
                          <li>• Monthly fees due by 10th of each month</li>
                          <li>• Late payment charges apply after due date</li>
                          <li>
                            • Fee concessions available for deserving students
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Uniform Policy */}
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center">
                      <Users className="mr-2" />
                      Uniform Policy
                    </h3>

                    <div className="space-y-6">
                      {/* Boys and Girls Uniform in a grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Boys Uniform */}
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="text-lg font-bold text-blue-600 mb-3">
                            Boys Uniform
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <h5 className="font-semibold text-gray-800 text-sm">
                                Summer
                              </h5>
                              <ul className="text-gray-600 text-xs space-y-1 mt-1">
                                <li>• White shirt with college monogram</li>
                                <li>• Grey trousers</li>
                                <li>• Black shoes with black socks</li>
                                <li>• College tie (optional)</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-800 text-sm">
                                Winter
                              </h5>
                              <ul className="text-gray-600 text-xs space-y-1 mt-1">
                                <li>• White shirt with college monogram</li>
                                <li>• Grey trousers</li>
                                <li>• Navy blue sweater/blazer</li>
                                <li>• Black shoes with black socks</li>
                                <li>• College tie</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Girls Uniform */}
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="text-lg font-bold text-pink-600 mb-3">
                            Girls Uniform
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <h5 className="font-semibold text-gray-800 text-sm">
                                Summer
                              </h5>
                              <ul className="text-gray-600 text-xs space-y-1 mt-1">
                                <li>• White shirt with college monogram</li>
                                <li>• Grey skirt/trousers</li>
                                <li>• Black shoes with white socks</li>
                                <li>• White dupatta (optional)</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-800 text-sm">
                                Winter
                              </h5>
                              <ul className="text-gray-600 text-xs space-y-1 mt-1">
                                <li>• White shirt with college monogram</li>
                                <li>• Grey skirt/trousers</li>
                                <li>• Navy blue sweater/blazer</li>
                                <li>• Black shoes with white socks</li>
                                <li>• White dupatta</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-gray-800 mb-3">
                          Uniform Guidelines
                        </h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                          <li>
                            • All students must wear proper college uniform
                            during college hours
                          </li>
                          <li>
                            • Uniform should be clean, pressed, and in good
                            condition
                          </li>
                          <li>
                            • College ID card must be visible at all times
                          </li>
                          <li>• Hair should be neat and well-groomed</li>
                          <li>• No fancy jewelry or accessories allowed</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-gray-800 mb-3">
                          Uniform Shop
                        </h4>
                        <div className="bg-blue-50 border border-blue-200 rounded p-3">
                          <p className="text-blue-800 font-medium text-sm">
                            College Uniform Shop
                          </p>
                          <p className="text-blue-700 text-xs">
                            Location: Main Campus, Ground Floor
                          </p>
                          <p className="text-blue-700 text-xs">
                            Timing: 9:00 AM - 4:00 PM (Monday to Friday)
                          </p>
                          <p className="text-blue-700 text-xs">
                            Contact: 051-9292724 (Ext. 234)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Policies Section */}
                <div className="mt-8 space-y-6">
                  {/* Academic Policies */}
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-purple-600 mb-6 flex items-center">
                      <BookOpen className="mr-2" />
                      Academic Policies
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-gray-800 mb-3">
                          Attendance Policy
                        </h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                          <li>
                            • Minimum 75% attendance required for examinations
                          </li>
                          <li>
                            • Medical leaves with proper documentation accepted
                          </li>
                          <li>
                            • Regular attendance monitoring and parent
                            notification
                          </li>
                          <li>• Makeup classes for extended absences</li>
                        </ul>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-gray-800 mb-3">
                          Examination Policy
                        </h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                          <li>
                            • Regular tests and assessments throughout the year
                          </li>
                          <li>
                            • Mid-term and final examinations as per schedule
                          </li>
                          <li>
                            • Make-up exams for genuine medical emergencies
                          </li>
                          <li>• Plagiarism and cheating strictly prohibited</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Conduct Policies */}
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-orange-600 mb-6 flex items-center">
                      <CheckCircle className="mr-2" />
                      Code of Conduct
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-gray-800 mb-3">
                          Student Behavior
                        </h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                          <li>
                            • Respectful behavior towards faculty and peers
                          </li>
                          <li>
                            • Punctuality in classes and college activities
                          </li>
                          <li>
                            • Proper use of college facilities and resources
                          </li>
                          <li>
                            • No smoking, drugs, or inappropriate behavior
                          </li>
                        </ul>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-gray-800 mb-3">
                          Disciplinary Actions
                        </h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                          <li>• Warning for minor violations</li>
                          <li>• Suspension for serious misconduct</li>
                          <li>• Expulsion for repeated or severe violations</li>
                          <li>
                            • Parent/guardian notification for all actions
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download Section */}
                <div className="mt-8 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    Download Policy Documents
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() =>
                        handleDownload(
                          "admissionPolicy",
                          "F.G Degree College for Boys Kohat-Admission-Policy-2025.pdf"
                        )
                      }
                      className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FileText className="mr-2" size={16} />
                      Admission Policy
                    </button>
                    <button
                      onClick={() =>
                        handleDownload(
                          "uniformGuide",
                          "F.G Degree College for Boys Kohat-Uniform-Guidelines-2025.pdf"
                        )
                      }
                      className="inline-flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Download className="mr-2" size={16} />
                      Uniform Guidelines
                    </button>
                    <button
                      onClick={() =>
                        handleDownload(
                          "studentHandbook",
                          "F.G Degree College for Boys Kohat-Student-Handbook-2025.pdf"
                        )
                      }
                      className="inline-flex items-center justify-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <BookOpen className="mr-2" size={16} />
                      Student Handbook
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Admissions;
