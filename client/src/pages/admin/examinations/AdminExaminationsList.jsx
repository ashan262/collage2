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
  FileText,
  Clock,
} from "lucide-react";
import { toast } from "react-hot-toast";
import AdminLayout from "../../../components/admin/AdminLayout";
import apiService from "../../../services/apiService";

const AdminExaminationsList = () => {
  const [examinations, setExaminations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterPublished, setFilterPublished] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchExaminations = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        type: filterType !== "all" ? filterType : undefined,
        isPublished:
          filterPublished !== "all"
            ? filterPublished === "published"
            : undefined,
      };

      const response = await apiService.get("/admin/examinations", { params });
      setExaminations(response.data.data.examinations || []);
      setTotalPages(response.data.data.pagination.totalPages || 1);
    } catch (error) {
      console.error("Error fetching examinations:", error);
      toast.error("Failed to load examinations");
      setExaminations([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, filterType, filterPublished]);

  useEffect(() => {
    fetchExaminations();
  }, [fetchExaminations]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await apiService.delete(`/admin/examinations/${id}`);
      toast.success("Examination deleted successfully");
      fetchExaminations();
    } catch (error) {
      console.error("Error deleting examination:", error);
      toast.error("Failed to delete examination");
    }
  };

  const handleTogglePublished = async (id, currentStatus) => {
    try {
      await apiService.patch(`/admin/examinations/${id}/toggle-published`);
      toast.success(
        `Examination ${
          currentStatus ? "unpublished" : "published"
        } successfully`
      );
      fetchExaminations();
    } catch (error) {
      console.error("Error updating examination status:", error);
      toast.error("Failed to update examination status");
    }
  };

  const handleToggleFeatured = async (id, currentStatus) => {
    try {
      await apiService.patch(`/admin/examinations/${id}/toggle-featured`);
      toast.success(
        `Examination ${currentStatus ? "unfeatured" : "featured"} successfully`
      );
      fetchExaminations();
    } catch (error) {
      console.error("Error updating examination featured status:", error);
      toast.error("Failed to update examination featured status");
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
      exam: "bg-blue-100 text-blue-800",
      result: "bg-green-100 text-green-800",
      schedule: "bg-purple-100 text-purple-800",
      notification: "bg-orange-100 text-orange-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          typeClasses[type] || typeClasses.notification
        }`}
      >
        {type}
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
              Examinations Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage examination schedules, results, and announcements
            </p>
          </div>
          <Link
            to="/admin/examinations/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            Add Examination
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
                placeholder="Search examinations..."
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
                <option value="exam">Exam</option>
                <option value="result">Result</option>
                <option value="schedule">Schedule</option>
                <option value="notification">Notification</option>
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

        {/* Examinations List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {examinations.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <FileText className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No examinations found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? "No examinations match your search criteria."
                  : "Get started by creating your first examination."}
              </p>
              <Link
                to="/admin/examinations/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
              >
                <PlusCircle className="h-4 w-4" />
                Add First Examination
              </Link>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-700">
                <div className="col-span-4">Title</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Exam Date</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Author</div>
                <div className="col-span-1">Actions</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {examinations.map((exam) => (
                  <div
                    key={exam._id}
                    className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="col-span-4">
                      <h3 className="font-medium text-gray-900 mb-1">
                        {exam.title}
                      </h3>
                      {exam.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {exam.description}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2 flex items-center">
                      {getTypeBadge(exam.type)}
                    </div>

                    <div className="col-span-2 flex items-center">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(exam.examDate)}
                      </div>
                    </div>

                    <div className="col-span-2 flex items-center">
                      {getStatusBadge(exam.isPublished, exam.isFeatured)}
                    </div>

                    <div className="col-span-1 flex items-center">
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-1" />
                        <span className="truncate">
                          {exam.createdBy?.fullName || "Admin"}
                        </span>
                      </div>
                    </div>

                    <div className="col-span-1 flex items-center gap-1">
                      <Link
                        to={`/admin/examinations/edit/${exam._id}`}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>

                      <button
                        onClick={() =>
                          handleTogglePublished(exam._id, exam.isPublished)
                        }
                        className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                        title={exam.isPublished ? "Unpublish" : "Publish"}
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() =>
                          handleToggleFeatured(exam._id, exam.isFeatured)
                        }
                        className="p-1 text-yellow-600 hover:bg-yellow-100 rounded transition-colors"
                        title={exam.isFeatured ? "Unfeature" : "Feature"}
                      >
                        <Clock className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(exam._id, exam.title)}
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

export default AdminExaminationsList;
