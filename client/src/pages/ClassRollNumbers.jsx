import React, { useState, useEffect } from "react";
import {
  Search,
  Download,
  FileText,
  Hash,
  BookOpen,
  Eye,
  AlertCircle,
  Loader,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { apiService } from "../services/apiService";

// Reusable ClassCard component
const ClassCard = ({
  gradientFrom,
  gradientTo,
  borderColor,
  hoverBorderColor,
  textColor,
  hoverTextColor,
  iconColor,
  hoverIconColor,
  title,
  subtitle,
  onClick,
}) => (
  <div
    className={`group bg-gradient-to-r ${gradientFrom} ${gradientTo} border ${borderColor} rounded-lg p-4 hover:shadow-lg ${hoverBorderColor} transition-all duration-300 transform hover:-translate-y-1 cursor-pointer`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <div>
        <h5 className={`font-semibold ${textColor} ${hoverTextColor}`}>
          {title}
        </h5>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      <div
        className={`flex items-center space-x-2 ${iconColor} ${hoverIconColor}`}
      >
        <Eye size={18} />
        <Download size={18} />
      </div>
    </div>
  </div>
);

const ClassRollNumbers = () => {
  const [searchTerm] = useState("");
  const [selectedClass] = useState("all");
  const [selectedSection] = useState("all");
  const [rollNumberData, setRollNumberData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch roll number data from API
  useEffect(() => {
    const fetchRollNumbers = async () => {
      try {
        setLoading(true);
        const response = await apiService.get("/roll-numbers");
        const data = response.data.data || [];
        setRollNumberData(data);

        // Only set error if there's truly no data
        if (data.length === 0) {
          setError(
            "No roll number data available. Please contact the administration to upload class roll number files."
          );
        } else {
          setError(null);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching roll numbers:", error);
        setError(
          "Unable to load roll number data. Please check your internet connection or contact the administration."
        );
        setLoading(false);
      }
    };

    fetchRollNumbers();
  }, []);

  const handleClassDownload = (classData) => {
    if (classData.fileUrl) {
      // Construct full URL with backend server
      const fullFileUrl = `http://localhost:5000${classData.fileUrl}`;
      // Trigger actual file download
      window.open(fullFileUrl, "_blank");
      toast.success(`Downloading ${classData.name} roll numbers`, {
        icon: "📄",
        duration: 3000,
      });
    } else {
      toast(
        "Roll number file not available yet. Please contact administration.",
        {
          icon: "⚠️",
          duration: 3000,
        }
      );
    }
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        gradientFrom: "from-blue-50",
        gradientTo: "to-cyan-50",
        borderColor: "border-cyan-200",
        hoverBorderColor: "hover:border-cyan-400",
        textColor: "text-gray-800",
        hoverTextColor: "group-hover:text-cyan-700",
        iconColor: "text-cyan-600",
        hoverIconColor: "group-hover:text-cyan-700",
      },
      red: {
        gradientFrom: "from-red-50",
        gradientTo: "to-rose-50",
        borderColor: "border-red-200",
        hoverBorderColor: "hover:border-red-400",
        textColor: "text-gray-800",
        hoverTextColor: "group-hover:text-red-700",
        iconColor: "text-red-600",
        hoverIconColor: "group-hover:text-red-700",
      },
      purple: {
        gradientFrom: "from-purple-50",
        gradientTo: "to-indigo-50",
        borderColor: "border-purple-200",
        hoverBorderColor: "hover:border-purple-400",
        textColor: "text-gray-800",
        hoverTextColor: "group-hover:text-purple-700",
        iconColor: "text-purple-600",
        hoverIconColor: "group-hover:text-purple-700",
      },
      green: {
        gradientFrom: "from-green-50",
        gradientTo: "to-emerald-50",
        borderColor: "border-green-200",
        hoverBorderColor: "hover:border-green-400",
        textColor: "text-gray-800",
        hoverTextColor: "group-hover:text-green-700",
        iconColor: "text-green-600",
        hoverIconColor: "group-hover:text-green-700",
      },
      indigo: {
        gradientFrom: "from-indigo-50",
        gradientTo: "to-blue-50",
        borderColor: "border-indigo-200",
        hoverBorderColor: "hover:border-indigo-400",
        textColor: "text-gray-800",
        hoverTextColor: "group-hover:text-indigo-700",
        iconColor: "text-indigo-600",
        hoverIconColor: "group-hover:text-indigo-700",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader
            className="animate-spin mx-auto mb-4 text-blue-600"
            size={48}
          />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Loading Roll Numbers...
          </h2>
          <p className="text-gray-600">
            Please wait while we fetch the latest data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Status Message */}
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertCircle className="text-yellow-600 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">
                  No Roll Number Data
                </h3>
                <p className="text-yellow-700 text-sm">{error}</p>
                <p className="text-yellow-700 text-sm mt-2">
                  Once administrators upload roll number files through the admin
                  panel, they will automatically appear below for download.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Class Lists Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
            <div className="flex items-center">
              <Hash className="mr-2" size={20} />
              <h3 className="text-lg font-semibold">Class Roll Number Lists</h3>
            </div>
            <div className="flex items-center text-blue-100">
              <FileText size={16} className="mr-2" />
              <span className="text-sm">Click to download</span>
            </div>
          </div>

          <div className="p-6">
            <p className="text-gray-600 mb-6 text-center">
              Click on any class below to download the complete roll number
              list. Files will be available once uploaded by administration.
            </p>

            {/* Display dynamic content or empty state */}
            {rollNumberData && rollNumberData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rollNumberData
                  .filter((classItem) => {
                    const matchesSearch = classItem.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());
                    const matchesClass =
                      selectedClass === "all" ||
                      (selectedClass === "hssc" &&
                        !classItem.name.includes("BS")) ||
                      (selectedClass === "bs" && classItem.name.includes("BS"));
                    const matchesSession =
                      selectedSection === "all" ||
                      classItem.session.toLowerCase().includes(selectedSection);
                    return matchesSearch && matchesClass && matchesSession;
                  })
                  .map((classItem, index) => {
                    const colors = getColorClasses(classItem.color || "blue");
                    return (
                      <ClassCard
                        key={index}
                        title={classItem.name}
                        subtitle={classItem.session}
                        gradientFrom={colors.gradientFrom}
                        gradientTo={colors.gradientTo}
                        borderColor={colors.borderColor}
                        hoverBorderColor={colors.hoverBorderColor}
                        textColor={colors.textColor}
                        hoverTextColor={colors.hoverTextColor}
                        iconColor={colors.iconColor}
                        hoverIconColor={colors.hoverIconColor}
                        onClick={() => handleClassDownload(classItem)}
                      />
                    );
                  })}
              </div>
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No Roll Number Files Available
                </h3>
                <p className="text-gray-500 mb-4">
                  Roll number files will appear here once uploaded by the
                  administration.
                </p>
                <p className="text-sm text-gray-400">
                  Contact the admission office if you need immediate assistance.
                </p>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h5 className="font-semibold text-blue-800 mb-2 flex items-center">
                <FileText className="mr-2" size={16} />
                Download Instructions
              </h5>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Click on any class card to download the PDF file</li>
                <li>
                  • Roll number lists are updated regularly by administration
                </li>
                <li>
                  • If you can't find your class, contact the admission office
                </li>
                <li>
                  • For any discrepancies, email us at fgdcbkohat@gmail.com
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <FileText className="text-blue-600 mr-3" size={24} />
            <h3 className="text-2xl font-heading font-bold text-gray-800">
              Important Information
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">
                For Students:
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Your roll number is required for all examinations</li>
                <li>
                  • Keep a note of your admission number for official documents
                </li>
                <li>
                  • Contact the office if you find any discrepancy in your
                  information
                </li>
                <li>
                  • Roll numbers are final and cannot be changed during the
                  session
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">
                Contact Information:
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Office Hours: Monday to Friday, 8:00 AM - 4:00 PM</li>
                <li>• Phone: 051-9292724</li>
                <li>• Email: fgdcbkohat@gmail.com</li>
                <li>• Visit the admission office for any queries</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassRollNumbers;
