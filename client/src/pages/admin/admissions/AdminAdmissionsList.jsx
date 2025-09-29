import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Filter,
  GraduationCap,
  Users,
} from "lucide-react";
import { toast } from "react-hot-toast";
import AdminLayout from "../../../components/admin/AdminLayout";
import apiService from "../../../services/apiService";

const AdminAdmissionsList = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterProgram, setFilterProgram] = useState("all");
  const [filterPublished, setFilterPublished] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchAdmissions = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        type: filterType !== "all" ? filterType : undefined,
        program: filterProgram !== "all" ? filterProgram : undefined,
        isPublished:
          filterPublished !== "all"
            ? filterPublished === "published"
            : undefined,
      };

      const response = await apiService.get("/admin/admissions", { params });
      setAdmissions(response.data.data.admissions || []);
      setTotalPages(response.data.data.pagination.totalPages || 1);
    } catch (error) {
      console.error("Error fetching admissions:", error);
      toast.error("Failed to load admissions");
      setAdmissions([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, filterType, filterProgram, filterPublished]);

  useEffect(() => {
    fetchAdmissions();
  }, [fetchAdmissions]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await apiService.delete(`/admin/admissions/${id}`);
      toast.success("Admission deleted successfully");
      fetchAdmissions();
    } catch (error) {
      console.error("Error deleting admission:", error);
      toast.error("Failed to delete admission");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTypeBadge = (type) => {
    const typeClasses = {
      application: "bg-blue-100 text-blue-800",
      merit_list: "bg-green-100 text-green-800",
      interview: "bg-purple-100 text-purple-800",
      result: "bg-orange-100 text-orange-800",
      notification: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          typeClasses[type] || typeClasses.notification
        }`}
      >
        {type.replace("_", " ")}
      </span>
    );
  };

  const getProgramBadge = (program) => {
    const programClasses = {
      intermediate: "bg-yellow-100 text-yellow-800",
      bachelor: "bg-blue-100 text-blue-800",
      master: "bg-green-100 text-green-800",
      phd: "bg-purple-100 text-purple-800",
      diploma: "bg-indigo-100 text-indigo-800",
      certificate: "bg-pink-100 text-pink-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          programClasses[program] || programClasses.certificate
        }`}
      >
        {program}
      </span>
    );
  };

  const getStatusBadge = (isPublished, isFeatured) => {
    return (
      <div className="flex flex-col gap-1">
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            isPublished
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {isPublished ? "Published" : "Draft"}
        </span>
        {isFeatured && (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            Featured
          </span>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Admissions Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage admission announcements, merit lists, and policies
            </p>
          </div>
          <Link
            to="/admin/admissions/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            Add Admission
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search admissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Types</option>
                <option value="application">Application</option>
                <option value="merit_list">Merit List</option>
                <option value="interview">Interview</option>
                <option value="result">Result</option>
                <option value="notification">Notification</option>
              </select>
            </div>

            {/* Program Filter */}
            <div className="relative">
              <select
                value={filterProgram}
                onChange={(e) => setFilterProgram(e.target.value)}
                className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Programs</option>
                <option value="intermediate">Intermediate</option>
                <option value="bachelor">Bachelor</option>
                <option value="master">Master</option>
                <option value="phd">PhD</option>
                <option value="diploma">Diploma</option>
                <option value="certificate">Certificate</option>
              </select>
            </div>

            {/* Published Filter */}
            <div className="relative">
              <select
                value={filterPublished}
                onChange={(e) => setFilterPublished(e.target.value)}
                className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Admissions List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {admissions.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <GraduationCap className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No admissions found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? "No admissions match your search criteria."
                  : "Get started by creating your first admission."}
              </p>
              <Link
                to="/admin/admissions/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
              >
                <PlusCircle className="h-4 w-4" />
                Add First Admission
              </Link>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-700">
                <div className="col-span-3">Title</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Program</div>
                <div className="col-span-2">Dates</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Actions</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {admissions.map((admission) => (
                  <div
                    key={admission._id}
                    className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="col-span-3">
                      <h3 className="font-medium text-gray-900 mb-1">
                        {admission.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {admission.academicYear}
                      </p>
                      {admission.seats && (
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Users className="h-3 w-3 mr-1" />
                          {admission.seats} seats
                        </div>
                      )}
                    </div>

                    <div className="col-span-2 flex items-center">
                      {getTypeBadge(admission.type)}
                    </div>

                    <div className="col-span-2 flex items-center">
                      {getProgramBadge(admission.program)}
                    </div>

                    <div className="col-span-2 flex items-center">
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center mb-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          Start: {formatDate(admission.applicationStartDate)}
                        </div>
                        {admission.applicationEndDate && (
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            End: {formatDate(admission.applicationEndDate)}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-span-2 flex items-center">
                      {getStatusBadge(
                        admission.isPublished,
                        admission.isFeatured
                      )}
                    </div>

                    <div className="col-span-1 flex items-center gap-1">
                      <Link
                        to={`/admin/admissions/edit/${admission._id}`}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(admission._id, admission.title)
                        }
                        className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 border-t bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Showing page {currentPage} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAdmissionsList;
