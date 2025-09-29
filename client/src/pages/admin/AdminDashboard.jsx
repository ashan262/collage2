import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  Users,
  Newspaper,
  Image,
  MessageSquare,
  TrendingUp,
  Eye,
  Calendar,
  BarChart3,
  PlusCircle,
  Edit,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { apiService } from "../../services/apiService";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalNews: 0,
    totalGallery: 0,
    totalContacts: 0,
    recentActivity: [],
  });
  const [recentNews, setRecentNews] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch recent news (limit 5)
      try {
        const newsResponse = await apiService.get("/admin/news?limit=5");
        setRecentNews(newsResponse.data.data.news || []);
      } catch (error) {
        console.log("Recent news not available:", error.response?.status);
        setRecentNews([]);
      }

      // Fetch recent contacts (limit 5)
      try {
        const contactsResponse = await apiService.get(
          "/admin/contacts?limit=5"
        );
        setRecentContacts(contactsResponse.data.data.contacts || []);
      } catch (error) {
        console.log("Recent contacts not available:", error.response?.status);
        setRecentContacts([]);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: IconComponent, color, change }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          <IconComponent className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {change && (
            <div className="flex items-center mt-1">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">{change}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div className="ml-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-sm p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Welcome to F.G Degree College for Boys Kohat Admin Panel
          </h1>
          <p className="text-blue-100">
            Manage your college website content, view analytics, and handle
            administrative tasks.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => (window.location.href = "/admin/news/new")}
              className="flex items-center p-3 text-left border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <PlusCircle className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-sm font-medium text-gray-700">
                Add News
              </span>
            </button>

            <button
              onClick={() => (window.location.href = "/admin/gallery/new")}
              className="flex items-center p-3 text-left border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <PlusCircle className="h-5 w-5 text-green-600 mr-3" />
              <span className="text-sm font-medium text-gray-700">
                Add Gallery
              </span>
            </button>

            <button
              onClick={() => (window.location.href = "/admin/faculty/new")}
              className="flex items-center p-3 text-left border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
            >
              <PlusCircle className="h-5 w-5 text-purple-600 mr-3" />
              <span className="text-sm font-medium text-gray-700">
                Add Faculty
              </span>
            </button>

            <button
              onClick={() => (window.location.href = "/admin/contacts")}
              className="flex items-center p-3 text-left border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors"
            >
              <Eye className="h-5 w-5 text-orange-600 mr-3" />
              <span className="text-sm font-medium text-gray-700">
                View Messages
              </span>
            </button>
          </div>
        </div>

        {/* Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent News */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent News
              </h3>
              <button
                onClick={() => (window.location.href = "/admin/news")}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View all
              </button>
            </div>

            {recentNews.length === 0 ? (
              <p className="text-gray-500 text-sm">No news articles yet.</p>
            ) : (
              <div className="space-y-3">
                {recentNews.map((news) => (
                  <div
                    key={news._id}
                    className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <Newspaper className="h-5 w-5 text-blue-600 mt-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {news.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(news.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          (window.location.href = `/admin/news/edit/${news._id}`)
                        }
                        className="text-gray-400 hover:text-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Contacts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Messages
              </h3>
              <button
                onClick={() => (window.location.href = "/admin/contacts")}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View all
              </button>
            </div>

            {recentContacts.length === 0 ? (
              <p className="text-gray-500 text-sm">No messages yet.</p>
            ) : (
              <div className="space-y-3">
                {recentContacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-green-600 mt-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {contact.name}
                      </p>
                      <p className="text-xs text-gray-500">{contact.email}</p>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {contact.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {!contact.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
