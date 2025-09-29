import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  Calendar,
  User,
  Filter,
  MapPin,
} from "lucide-react";
import { toast } from "react-hot-toast";
import AdminLayout from "../../../components/admin/AdminLayout";
import apiService from "../../../services/apiService";

const AdminActivitiesList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterPublished, setFilterPublished] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchActivities = useCallback(async () => {
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

      const response = await apiService.get("/admin/activities", { params });
      setActivities(response.data.data.activities || []);
      setTotalPages(response.data.data.pagination.totalPages || 1);
    } catch (error) {
      console.error("Error fetching activities:", error);
      toast.error("Failed to load activities");
      setActivities([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, filterType, filterPublished]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await apiService.delete(`/admin/activities/${id}`);
      toast.success("Activity deleted successfully");
      fetchActivities();
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast.error("Failed to delete activity");
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
      sports: "bg-green-100 text-green-800",
      cultural: "bg-purple-100 text-purple-800",
      academic: "bg-blue-100 text-blue-800",
      seminar: "bg-orange-100 text-orange-800",
      workshop: "bg-yellow-100 text-yellow-800",
      competition: "bg-red-100 text-red-800",
      exhibition: "bg-pink-100 text-pink-800",
      celebration: "bg-indigo-100 text-indigo-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          typeClasses[type] || typeClasses.academic
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
              Activities Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage college activities, events, and extracurricular programs
            </p>
          </div>
          <Link
            to="/admin/activities/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            Add Activity
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
                placeholder="Search activities..."
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
                <option value="sports">Sports</option>
                <option value="cultural">Cultural</option>
                <option value="academic">Academic</option>
                <option value="seminar">Seminar</option>
                <option value="workshop">Workshop</option>
                <option value="competition">Competition</option>
                <option value="exhibition">Exhibition</option>
                <option value="celebration">Celebration</option>
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

        {/* Activities List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {activities.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Calendar className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No activities found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? "No activities match your search criteria."
                  : "Get started by creating your first activity."}
              </p>
              <Link
                to="/admin/activities/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
              >
                <PlusCircle className="h-4 w-4" />
                Add First Activity
              </Link>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-700">
                <div className="col-span-4">Title</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Venue</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1">Actions</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {activities.map((activity) => (
                  <div
                    key={activity._id}
                    className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="col-span-4">
                      <h3 className="font-medium text-gray-900 mb-1">
                        {activity.title}
                      </h3>
                      {activity.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {activity.description}
                        </p>
                      )}
                      {activity.organizer && (
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <User className="h-3 w-3 mr-1" />
                          {activity.organizer}
                        </div>
                      )}
                    </div>

                    <div className="col-span-2 flex items-center">
                      {getTypeBadge(activity.type)}
                    </div>

                    <div className="col-span-2 flex items-center">
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(activity.startDate)}
                        </div>
                        {activity.endDate &&
                          activity.startDate !== activity.endDate && (
                            <div className="text-xs text-gray-500">
                              to {formatDate(activity.endDate)}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="col-span-2 flex items-center">
                      {activity.venue && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate">{activity.venue}</span>
                        </div>
                      )}
                    </div>

                    <div className="col-span-1 flex items-center">
                      {getStatusBadge(
                        activity.isPublished,
                        activity.isFeatured
                      )}
                    </div>

                    <div className="col-span-1 flex items-center gap-1">
                      <Link
                        to={`/admin/activities/edit/${activity._id}`}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(activity._id, activity.title)
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

export default AdminActivitiesList;
