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
  Mail,
  Phone,
  Filter,
  Users,
  GraduationCap,
  Award,
} from "lucide-react";
import { toast } from "react-hot-toast";
import apiService from "../../../services/apiService";
import AdminLayout from "../../../components/admin/AdminLayout";

const AdminFacultyList = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const departments = [
    "all",
    "english",
    "mathematics",
    "science",
    "physics",
    "chemistry",
    "biology",
    "computer-science",
    "history",
    "geography",
    "urdu",
    "islamiat",
    "physical-education",
    "arts",
  ];

  const fetchFaculty = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        department: filterDepartment !== "all" ? filterDepartment : undefined,
        status: filterStatus !== "all" ? filterStatus : undefined,
      };

      // Try to fetch from faculty endpoint, fallback to empty if not available
      try {
        const response = await apiService.get("/admin/faculty", { params });
        setFaculty(response.data.data.faculty || []);
        setTotalPages(response.data.data.pagination.pages || 1);
      } catch (error) {
        if (error.response?.status === 404) {
          // Endpoint doesn't exist yet, show empty state
          setFaculty([]);
          setTotalPages(1);
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error("Error fetching faculty:", error);
      toast.error("Failed to load faculty");
      setFaculty([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, filterDepartment, filterStatus]);

  useEffect(() => {
    fetchFaculty();
  }, [fetchFaculty]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await apiService.delete(`/admin/faculty/${id}`);
      toast.success("Faculty member deleted successfully");
      fetchFaculty();
    } catch (error) {
      console.error("Error deleting faculty:", error);
      toast.error("Failed to delete faculty member");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await apiService.patch(`/admin/faculty/${id}`, { status: newStatus });
      toast.success(
        `Faculty member ${
          newStatus === "active" ? "activated" : "deactivated"
        } successfully`
      );
      fetchFaculty();
    } catch (error) {
      console.error("Error updating faculty status:", error);
      toast.error("Failed to update faculty status");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      retired: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          statusClasses[status] || statusClasses.active
        }`}
      >
        {status || "active"}
      </span>
    );
  };

  const getDepartmentName = (dept) => {
    return (
      dept
        ?.split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") || "Not Specified"
    );
  };

  if (loading) {
    return (
      <div className="p-6">
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
      </div>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Faculty Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage faculty members and their profiles
          </p>
        </div>
        <Link
          to="/admin/faculty/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          Add Faculty Member
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
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Department Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-40"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === "all" ? "All Departments" : getDepartmentName(dept)}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="retired">Retired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Faculty List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {faculty.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Users className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No faculty members found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "No faculty members match your search criteria."
                : "Get started by adding your first faculty member."}
            </p>
            <Link
              to="/admin/faculty/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              Add First Faculty Member
            </Link>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-700">
              <div className="col-span-3">Name & Contact</div>
              <div className="col-span-2">Department</div>
              <div className="col-span-2">Position</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Joined</div>
              <div className="col-span-1">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {faculty.map((member) => (
                <div
                  key={member._id}
                  className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="col-span-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {member.photoUrl ? (
                          <img
                            src={member.photoUrl}
                            alt={member.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">
                          {member.name}
                        </p>
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-3 w-3 mr-1" />
                          {member.email}
                        </div>
                        {member.phone && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-3 w-3 mr-1" />
                            {member.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center">
                    <div className="flex items-center">
                      <GraduationCap className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {getDepartmentName(member.department)}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {member.position || "Teacher"}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center">
                    {getStatusBadge(member.status)}
                  </div>

                  <div className="col-span-2 flex items-center">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(member.joiningDate || member.createdAt)}
                    </div>
                  </div>

                  <div className="col-span-1 flex items-center gap-1">
                    <Link
                      to={`/admin/faculty/edit/${member._id}`}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>

                    <button
                      onClick={() =>
                        handleToggleStatus(member._id, member.status)
                      }
                      className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                      title={
                        member.status === "active" ? "Deactivate" : "Activate"
                      }
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(member._id, member.name)}
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
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
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
    </AdminLayout>
  );
};

export default AdminFacultyList;
